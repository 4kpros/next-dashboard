import {
  SignInEmailRequest,
  SignInProviderRequest,
} from "@/types/auth/request";
import { SignInResponse } from "@/types/auth/response";
import { ProfileLoggedResponse } from "@/types/profile/response";
import { GET, POST } from "@/utils/http/http";
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
          resData = await signInWithCredentials(
            "email",
            (credentials?.email as string | null) ?? "",
            pwHash
            // (credentials?.stayConnected as boolean | null) ?? false
          );
        } catch (error: any) {
          throw new Error(`Invalid credentials`);
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
          const respData = await getProfileLogged(newToken);
          const usernameTrunc = (respData?.data?.username ?? "").substring(
            0,
            2
          );
          const fullNameTrunc =
            (respData?.data?.lastName ?? "").substring(0, 1) +
            "" +
            (respData?.data?.firstName ?? "").substring(0, 1);
          token.loginMethod = respData?.data?.loginMethod;
          token.provider = respData?.data?.provider;
          token.role = respData?.data?.role;
          token.feature = respData?.data?.feature;
          token.nameTrunc =
            usernameTrunc.length >= 2 ? usernameTrunc : fullNameTrunc;
          token.image = respData?.data?.image;
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
      session.user.image = token.image as string | null | undefined;
      return session;
    },
  },
  debug: false,
});

const hashPassword = async (password: string): Promise<string> => {
  const newPassword = password;
  return newPassword;
};

const signInWithProvider = async (provider: string, token: string) => {
  return POST<SignInResponse, SignInProviderRequest>("/auth/login/provider", {
    provider: provider,
    token: token,
  });
};

const getProfileLogged = async (token: string) => {
  return GET<ProfileLoggedResponse, {}>("/profile/logged", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const signInWithCredentials = async (
  type: "email" | "phone",
  email: string,
  password: string,
  stayConnected?: boolean
) => {
  return POST<SignInResponse, SignInEmailRequest>("/auth/login/" + type, {
    email: email,
    password: password,
    stayConnected: stayConnected,
  });
};
