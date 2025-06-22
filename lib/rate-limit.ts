import { Redis } from "@upstash/redis"
import { env } from "./env"

let redis: Redis | null = null

// Only initialize Redis if environment variables are available
if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  })
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
  limit: number
}

export async function rateLimit(
  identifier: string,
  limit = 100,
  window = 3600, // 1 hour in seconds
): Promise<RateLimitResult> {
  // If Redis is not configured, allow all requests (demo mode)
  if (!redis) {
    return {
      success: true,
      remaining: limit,
      reset: Date.now() + window * 1000,
      limit,
    }
  }

  const key = `rate_limit:${identifier}`

  try {
    const pipeline = redis.pipeline()
    pipeline.incr(key)
    pipeline.expire(key, window)

    const results = await pipeline.exec()
    const current = results[0] as number

    const remaining = Math.max(0, limit - current)
    const reset = Date.now() + window * 1000

    return {
      success: current <= limit,
      remaining,
      reset,
      limit,
    }
  } catch (error) {
    console.error("Rate limit error:", error)
    // Fail open - allow request if Redis is down
    return {
      success: true,
      remaining: limit,
      reset: Date.now() + window * 1000,
      limit,
    }
  }
}

// Different rate limits for different endpoints
export const RATE_LIMITS = {
  api: { limit: 1000, window: 3600 }, // 1000 requests per hour
  auth: { limit: 5, window: 900 }, // 5 attempts per 15 minutes
  chat: { limit: 100, window: 3600 }, // 100 chat messages per hour
  upload: { limit: 10, window: 3600 }, // 10 uploads per hour
}
