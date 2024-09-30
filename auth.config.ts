import type { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

interface CustomJwtPayload extends JWT {
  sub?: string;
  role: string;
}

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.access_token) {
        const decodedJwt: CustomJwtPayload = jwtDecode(user.access_token);
        return {
          ...token,
          access_token: user.access_token,
          access_tokenExpires: decodedJwt.exp ?? 0,
          role: decodedJwt.role ?? "",
          sub: decodedJwt.sub,
        };
      }
      if (user?.access_token) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.access_token) {
        session.access_token = token.access_token as string;
        session.role = token.role as string;
        session.user.email = token.sub as string;
      }

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      } else if (!isLoggedIn && !isOnAuth) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
