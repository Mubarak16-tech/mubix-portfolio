import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !request.auth) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};