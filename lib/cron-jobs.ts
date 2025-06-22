import { supabaseAdmin } from "./supabase"
import { sendEmail, emailTemplates } from "./email"

export async function runDailyCleanup() {
  try {
    console.log("Running daily cleanup...")

    // Clean up old data
    await supabaseAdmin.rpc("cleanup_old_data")

    console.log("Daily cleanup completed")
  } catch (error) {
    console.error("Daily cleanup failed:", error)
  }
}

export async function checkTrialExpirations() {
  try {
    console.log("Checking trial expirations...")

    // Get users whose trials expire in 3 days
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

    const { data: expiringUsers } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("subscription_tier", "trial")
      .lt("created_at", threeDaysFromNow.toISOString())
      .gte("created_at", new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString()) // 27 days ago

    if (expiringUsers) {
      for (const user of expiringUsers) {
        const daysLeft = Math.ceil(
          (30 * 24 * 60 * 60 * 1000 - (Date.now() - new Date(user.created_at).getTime())) / (24 * 60 * 60 * 1000),
        )

        if (daysLeft > 0 && daysLeft <= 3) {
          await sendEmail({
            to: user.email,
            ...emailTemplates.trialExpiring(`${user.first_name} ${user.last_name}`, daysLeft),
          })
        }
      }
    }

    console.log(`Processed ${expiringUsers?.length || 0} expiring trials`)
  } catch (error) {
    console.error("Trial expiration check failed:", error)
  }
}

export async function generateUsageReports() {
  try {
    console.log("Generating usage reports...")

    // Get all active users
    const { data: activeUsers } = await supabaseAdmin.from("users").select("*").eq("subscription_status", "active")

    if (activeUsers) {
      for (const user of activeUsers) {
        // Get usage stats
        const { data: usageStats } = await supabaseAdmin.rpc("get_user_usage_stats", {
          user_uuid: user.id,
          days_back: 30,
        })

        if (usageStats && usageStats[0]) {
          const stats = usageStats[0]

          // Store monthly report
          await supabaseAdmin.from("analytics_events").insert({
            user_id: user.id,
            event_type: "monthly_report",
            event_data: {
              month: new Date().toISOString().slice(0, 7), // YYYY-MM
              total_queries: stats.total_queries,
              resolution_rate: stats.resolution_rate,
              avg_satisfaction: stats.avg_satisfaction,
            },
          })
        }
      }
    }

    console.log(`Generated reports for ${activeUsers?.length || 0} users`)
  } catch (error) {
    console.error("Usage report generation failed:", error)
  }
}

// Vercel Cron API routes
export async function GET() {
  const authHeader = process.env.CRON_SECRET

  if (!authHeader) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    await Promise.all([runDailyCleanup(), checkTrialExpirations(), generateUsageReports()])

    return new Response("Cron jobs completed", { status: 200 })
  } catch (error) {
    console.error("Cron job error:", error)
    return new Response("Cron job failed", { status: 500 })
  }
}
