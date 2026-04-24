import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔒 Protect ALL /phuket routes (including nested ones)
  if (pathname.startsWith("/phuket")) {
    const authCookie = request.cookies.get("guest-auth");

    if (!authCookie || authCookie.value !== "true") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// ✅ Apply only to relevant routes
export const config = {
  matcher: ["/phuket/:path*"],
};