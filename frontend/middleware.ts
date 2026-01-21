import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token && req.nextUrl.pathname.startsWith("/auth/products")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
