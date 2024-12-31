import { User } from "@/lib/api/user/response";
// import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      loginMethod?: string | null;
      provider?: string | null;
      role?: string | null;
      feature?: string | null;
      nameTrunc?: string | null;
      firstName?: string | null;
      image?: string | null;
    };
    token: {
      role?: string | null;
      feature?: string | null;
      nameTrunc?: string | null;
      firstName?: string | null;
      image?: string | null;
    };
  }
  interface User {
    accessToken?: string | null;
    expires?: string | null;
    activateAccountToken?: string | null;
  }
}
