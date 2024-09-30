import { auth } from "@/auth";

import { NextRequest, NextResponse } from "next/server";

export default auth(async function middleware(req: NextRequest, res) {});

// See "Matching Paths" below to learn more
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
