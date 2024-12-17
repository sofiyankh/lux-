import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authToken = request.cookies.get("auth-token")
  const userRole = request.cookies.get("user-role")

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!authToken || !userRole) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (userRole.value !== "admin") {
      return NextResponse.redirect(new URL("/account", request.url))
    }
  }

  // Client account routes protection
  if (pathname.startsWith("/account")) {
    if (!authToken || !userRole) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (userRole.value === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Checkout protection (clients only)
  if (pathname.startsWith("/checkout")) {
    if (!authToken || !userRole) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (userRole.value === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
}
