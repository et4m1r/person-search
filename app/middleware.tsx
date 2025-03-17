// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    // Check if it's an auth route
    if (token) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if logged in
    }
  }

  return NextResponse.next(); // Continue to the requested route
}

export const config = {
  matcher: ["/auth/:path*"], // Apply middleware to auth routes
};
