import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getAnalytics } from "@/lib/analytics"
import { z } from "zod"

const analyticsSchema = z.object({
  timeRange: z.string().optional().default("30d"),
})

export async function GET(req: NextRequest) {
  try {
    // Get user from session
    const accessToken = req.cookies.get("sb-access-token")?.value
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken)
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const { timeRange } = analyticsSchema.parse({
      timeRange: searchParams.get("timeRange"),
    })

    const analytics = await getAnalytics(user.id, timeRange)

    if (!analytics) {
      return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
    }

    return NextResponse.json({ error: "Analytics fetch failed" }, { status: 500 })
  }
}
