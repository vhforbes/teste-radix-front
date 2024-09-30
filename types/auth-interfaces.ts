import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    access_token?: string;
    access_tokenExpires?: number;
  }

  interface Session {
    access_token?: string;
    access_tokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    access_tokenExpires?: number;
    role?: string;
  }
}
