import { hashPassword } from "@/helpers/security/hash";
import {
  signInWithCredentialsEmail,
  signInWithProvider,
} from "@/lib/api/user/auth/routes";
import { getProfileServer } from "@/lib/api/user/profile/routes";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Max age 30 days
  },
  secret: `${process.env.NEXT_AUTH_SECRET}`,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        phoneNumber: {
          label: "Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
        },
        stayConnected: {
          label: "Stay Connected",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error(`Invalid credentials!`);

        // Hash the password
        const pwHash: string = await hashPassword(
          (credentials.password as string | null) ?? ""
        );

        // Sign in to the backend
        var resData = null;
        try {
          resData = await signInWithCredentialsEmail({
            email: (credentials?.email as string | null) ?? "",
            password: pwHash,
            stayConnected:
              ((credentials?.stayConnected as string | null)?.toLowerCase() ??
                "") === "true"
                ? true
                : false,
          });
          return {
            ...resData?.data,
          };
        } catch (error: any) {
          return {
            ...{
              code: error?.code,
              error: "my custom error",
              ok: false,
              status: error?.status,
              response: error?.response,
            },
          };
        }

        return {
          ...resData?.data,
        };
      },
    }),
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook({
      clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") {
        const resData = user as any;
        const activateToken = resData?.activateAccountToken as string | null;
        const accessToken = resData?.accessToken as string | null;
        if ((accessToken ?? "").length < 1) {
          if ((activateToken ?? "").length > 0) {
            return `/auth/activate?token=${activateToken}`;
          } else {
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        let newToken = user?.accessToken ?? "";
        let newTokenExpires = user?.expires ?? "";
        if (account?.provider === "google") {
          try {
            const respData = await signInWithProvider(
              account?.provider ?? "",
              account?.id_token ?? ""
            );
            newToken = respData?.data?.accessToken ?? "";
            newTokenExpires = respData?.data?.expires ?? "";
          } catch (error) {
            throw new Error(`Error when trying to check token with backend!`);
          }
        }
        if (newToken.length < 1 || newTokenExpires.length < 1)
          throw new Error(`No access token provided!`);

        try {
          const respData = await getProfileServer(newToken);

          const userName: string = respData?.data?.info?.username ?? "";
          const firstName: String = respData?.data?.info?.firstName ?? "";
          const lastName: string = respData?.data?.info?.lastName ?? "";

          const usernameTrunc = userName.substring(0, 2);
          const fullNameTrunc =
            firstName.substring(0, 1) + "" + lastName.substring(0, 1);

          token.loginMethod = respData?.data?.loginMethod;
          token.provider = respData?.data?.provider;
          token.role = respData?.data?.role?.name;
          token.feature = respData?.data?.role?.feature;
          token.nameTrunc =
            fullNameTrunc.length > 1 ? fullNameTrunc : usernameTrunc;
          token.firstName = firstName.length > 0 ? firstName : userName;
          token.image = respData?.data?.info?.image;
        } catch (error) {
          throw new Error(`Error when getting profile information!`);
        }

        token.accessToken = newToken;
        token.accessTokenExpires = newTokenExpires;
        return {
          ...token,
        };
      }

      if (!((token.exp ?? 0) < 1)) {
        return {
          ...token,
        };
      }
      return null;
    },
    async session({ session, token }) {
      session.user.loginMethod = token.loginMethod as string | null | undefined;
      session.user.provider = token.provider as string | null | undefined;
      session.user.role = token.role as string | null | undefined;
      session.user.feature = token.feature as string | null | undefined;
      session.user.nameTrunc = token.nameTrunc as string | null | undefined;
      session.user.firstName = token.firstName as string | null | undefined;
      session.user.image = token.image as string | null | undefined;
      return session;
    },
  },
  debug: false,
});
