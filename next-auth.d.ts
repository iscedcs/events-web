import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    // error?: string;
    user: {
      id: string;
      userType: string;
      email: string;
      image: string;
      // extraInfo: UserProps;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    accessToken?: string;
    // refreshToken?: string;
    userType: string;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      email: string;
      userType: string;
      accessToken?: string;
    }
  }
}
