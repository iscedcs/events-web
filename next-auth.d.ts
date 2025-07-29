import { UserProps } from "@/lib/types";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    error?: string;
    user: {
      id: string;
      userType: string;
      email: string;
      extraInfo: UserProps;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    userType: string;
  }
}
