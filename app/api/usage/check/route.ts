import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check usage limits using database function
    const { data: usageCheck, error } = await supabaseAdmin.rpc("check_usage_limit", {
      p_user_id: userId,
    })

    if (error) throw error

    const result = usageCheck[0]

    return NextResponse.json({
      allowed: result.allowed,
      currentUsage: result.current_usage,
      monthlyLimit: result.monthly_limit,
      planName: result.plan_name,
      usagePercentage: result.monthly_limit > 0 ? Math.round((result.current_usage / result.monthly_limit) * 100) : 0,
    })
  } catch (error) {
    console.error("Usage check error:", error)
    return NextResponse.json({ error: "Failed to check usage limits" }, { status: 500 })
  }
}
