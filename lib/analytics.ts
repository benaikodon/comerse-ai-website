import { supabaseAdmin } from "./supabase"

export interface AnalyticsEvent {
  userId: string
  eventType: string
  eventData: Record<string, any>
}

export async function trackEvent({ userId, eventType, eventData }: AnalyticsEvent) {
  try {
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
    })

    if (error) throw error
  } catch (error) {
    console.error("Analytics tracking error:", error)
  }
}

export async function getAnalytics(userId: string, timeRange = "30d") {
  try {
    const startDate = new Date()
    const days = Number.parseInt(timeRange.replace("d", ""))
    startDate.setDate(startDate.getDate() - days)

    // Get query volume
    const { data: queryData } = await supabaseAdmin
      .from("analytics_events")
      .select("created_at, event_data")
      .eq("user_id", userId)
      .eq("event_type", "chat_query")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true })

    // Get resolution data
    const { data: resolutionData } = await supabaseAdmin
      .from("analytics_events")
      .select("event_data")
      .eq("user_id", userId)
      .eq("event_type", "query_resolved")
      .gte("created_at", startDate.toISOString())

    // Get satisfaction data
    const { data: satisfactionData } = await supabaseAdmin
      .from("analytics_events")
      .select("event_data")
      .eq("user_id", userId)
      .eq("event_type", "satisfaction_rating")
      .gte("created_at", startDate.toISOString())

    // Process data
    const totalQueries = queryData?.length || 0
    const resolvedQueries = resolutionData?.length || 0
    const resolutionRate = totalQueries > 0 ? (resolvedQueries / totalQueries) * 100 : 0

    const avgSatisfaction =
      satisfactionData?.length > 0
        ? satisfactionData.reduce((sum, item) => sum + (item.event_data.rating || 0), 0) / satisfactionData.length
        : 0

    // Group queries by date
    const queryVolume =
      queryData?.reduce(
        (acc, item) => {
          const date = item.created_at.split("T")[0]
          acc[date] = (acc[date] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {}

    return {
      overview: {
        totalQueries,
        resolutionRate: Math.round(resolutionRate * 10) / 10,
        avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
        avgResponseTime: 1.3, // This would come from actual timing data
      },
      queryVolume: Object.entries(queryVolume).map(([date, count]) => ({
        date,
        queries: count,
      })),
      satisfactionData,
    }
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return null
  }
}
