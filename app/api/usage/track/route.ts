import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { z } from "zod"

const trackingSchema = z.object({
  userId: z.string().uuid(),
  queryType: z.string(),
  tokensUsed: z.number().default(1),
  responseTimeMs: z.number().optional(),
  resolved: z.boolean().default(true),
  satisfactionScore: z.number().min(1).max(5).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, queryType, tokensUsed, responseTimeMs, resolved, satisfactionScore } = trackingSchema.parse(body)

    // Track usage using database function
    const { error } = await supabaseAdmin.rpc("track_query_usage", {
      p_user_id: userId,
      p_query_type: queryType,
      p_tokens_used: tokensUsed,
      p_response_time_ms: responseTimeMs,
      p_resolved: resolved,
      p_satisfaction_score: satisfactionScore,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Usage tracking error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid tracking data" }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to track usage" }, { status: 500 })
  }
}
