import type { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

interface CustomJwtPayload extends JWT {
  sub?: string;
  role: string;
  user_id: string;
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
          user_id: decodedJwt.user_id,
          user_name: decodedJwt.user_name,
        };
      }
      if (user?.access_token) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token);

      if (token.access_token) {
        session.access_token = token.access_token as string;
        session.user.email = token.sub as string;
        session.user.id = token.user_id as string;
        session.user.name = token.user_name as string;
      }

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      console.log(isOnDashboard);
      console.log(isLoggedIn);

      if (!isLoggedIn && !isOnAuth)
        return Response.redirect(new URL("/auth/login", nextUrl));

      if (isLoggedIn && isOnAuth)
        return Response.redirect(new URL("/dashboard", nextUrl));

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
