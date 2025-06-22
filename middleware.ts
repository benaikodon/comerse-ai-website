import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit"
import { captureError } from "@/lib/monitoring"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    // Security headers
    res.headers.set("X-Frame-Options", "DENY")
    res.headers.set("X-Content-Type-Options", "nosniff")
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

    if (process.env.NODE_ENV === "production") {
      res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    }

    // Rate limiting for API routes
    if (req.nextUrl.pathname.startsWith("/api/")) {
      const ip = req.ip || req.headers.get("x-forwarded-for") || "anonymous"
      const rateLimitKey = `${ip}:${req.nextUrl.pathname}`

      let rateConfig = RATE_LIMITS.api
      if (req.nextUrl.pathname.includes("/auth/")) {
        rateConfig = RATE_LIMITS.auth
      } else if (req.nextUrl.pathname.includes("/chat")) {
        rateConfig = RATE_LIMITS.chat
      } else if (req.nextUrl.pathname.includes("/upload")) {
        rateConfig = RATE_LIMITS.upload
      }

      const rateLimitResult = await rateLimit(rateLimitKey, rateConfig.limit, rateConfig.window)

      if (!rateLimitResult.success) {
        return new NextResponse("Too Many Requests", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        })
      }

      // Add rate limit headers
      res.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString())
      res.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
      res.headers.set("X-RateLimit-Reset", rateLimitResult.reset.toString())
    }

    // Authentication for protected routes
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const supabase = createMiddlewareClient({ req, res })
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
    }

    // Redirect authenticated users away from auth pages
    if (req.nextUrl.pathname.startsWith("/auth/")) {
      const supabase = createMiddlewareClient({ req, res })
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return res
  } catch (error) {
    captureError(error as Error, { path: req.nextUrl.pathname })
    return res
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/api/:path*"],
}
