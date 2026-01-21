import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protect auth routes
  if (!token && pathname.startsWith("/auth/products")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Prevent logged-in user from visiting login/register
  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/auth/products", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
