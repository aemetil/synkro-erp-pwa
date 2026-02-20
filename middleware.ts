// middleware.ts
import { decode } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET

  // NextAuth v5 utilise __Secure- seulement en HTTPS (prod réelle)
  // En localhost même avec npm run start, le cookie n'a pas le préfixe __Secure-
  const secureCookie = req.cookies.get("__Secure-authjs.session-token")
  const regularCookie = req.cookies.get("authjs.session-token")
  const cookieName = secureCookie
    ? "__Secure-authjs.session-token"
    : "authjs.session-token"
  const sessionToken = secureCookie?.value || regularCookie?.value

  let isAuth = false
  if (sessionToken && secret) {
    try {
      const decoded = await decode({ token: sessionToken, secret, salt: cookieName })
      isAuth = !!decoded
    } catch {
      isAuth = false
    }
  }

  const { pathname } = req.nextUrl
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/register"

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
  }

  if (!isAuth) {
    const from = pathname + (req.nextUrl.search || "")
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/finance/:path*",
    "/sales/:path*",
    "/customers/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/commerce/:path*",
    "/sante/:path*",
    "/login",
    "/register",
    "/signup",
  ],
}
