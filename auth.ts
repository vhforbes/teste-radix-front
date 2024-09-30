import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

interface AuthenticationResponse {
  access_token: string;
}

export class UnauthorizedError extends CredentialsSignin {
  code = "InvalidCredentials";
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = signInSchema.parse(credentials);
          const { email, password } = parsedCredentials;

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            if (res.status === 401) {
              throw new UnauthorizedError("Invalid credentials provided.");
            }
            throw new Error(`Authentication failed with status: ${res.status}`);
          }

          const data: AuthenticationResponse = await res.json();

          if (isAuthenticationResponse(data)) {
            return {
              access_token: data.access_token,
            };
          }
          return null;
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            throw error;
          }
          if (error instanceof ZodError) {
            throw error;
          }
          return null;
        }
      },
    }),
  ],
});

function isAuthenticationResponse(data: any): data is AuthenticationResponse {
  return typeof data === "object" && "access_token" in data;
}
