import { User } from "@/models/admin/user.types";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role?: string | null;
      feature?: string | null;
      nameTrunc?: string | null;
      image?: string | null;
    };
    token: {
      role?: string | null;
      feature?: string | null;
      nameTrunc?: string | null;
      image?: string | null;
    };
  }
  interface User {
    accessToken?: string | null;
    expires?: string | null;
    activateAccountToken?: string | null;
  }
}
