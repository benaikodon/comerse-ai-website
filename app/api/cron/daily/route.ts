import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { sendEmail, emailTemplates } from "@/lib/email"
import { captureMessage } from "@/lib/monitoring"
import { env } from "@/lib/env"

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await runDailyTasks()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Daily cron job failed:", error)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}

async function runDailyTasks() {
  captureMessage("Starting daily cron tasks", "info")

  // Clean up old chat sessions (older than 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  await supabaseAdmin.from("chat_sessions").delete().lt("created_at", thirtyDaysAgo.toISOString())

  // Clean up old analytics events (older than 90 days)
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  await supabaseAdmin.from("analytics_events").delete().lt("created_at", ninetyDaysAgo.toISOString())

  // Send trial expiration warnings
  const sevenDaysFromNow = new Date()
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

  const { data: expiringUsers } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("subscription_tier", "trial")
    .lt("created_at", sevenDaysFromNow.toISOString())

  for (const user of expiringUsers || []) {
    const createdAt = new Date(user.created_at)
    const daysLeft = Math.ceil((sevenDaysFromNow.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))

    if (daysLeft <= 7 && daysLeft > 0) {
      await sendEmail({
        to: user.email,
        ...emailTemplates.trialExpiring(`${user.first_name} ${user.last_name}`, daysLeft),
      })
    }
  }

  captureMessage("Daily cron tasks completed", "info")
}
