import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { redis } from "@upstash/redis"
import { env } from "@/lib/env"

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    version: process.env.npm_package_version || "1.0.0",
    environment: env.NODE_ENV,
    checks: {
      database: false,
      redis: false,
      openai: false,
    },
  }

  try {
    // Check database connection
    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)
    checks.checks.database = !error

    // Check Redis connection
    try {
      await redis.ping()
      checks.checks.redis = true
    } catch {
      checks.checks.redis = false
    }

    // Check OpenAI API
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
      })
      checks.checks.openai = response.ok
    } catch {
      checks.checks.openai = false
    }

    const allHealthy = Object.values(checks.checks).every(Boolean)
    checks.status = allHealthy ? "healthy" : "degraded"

    return NextResponse.json(checks, {
      status: allHealthy ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ...checks,
        status: "unhealthy",
        error: error.message,
      },
      { status: 503 },
    )
  }
}
