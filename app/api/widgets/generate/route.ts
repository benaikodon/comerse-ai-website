import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { userId, settings } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // TODO: Get user's API key from database
    const apiKey = `ck_live_${userId}_${Math.random().toString(36).substring(2, 15)}`

    // Generate widget code with user's settings
    const widgetCode = generateWidgetCode(apiKey, settings)

    // TODO: Store widget configuration in database
    const widgetConfig = {
      id: `widget_${Date.now()}`,
      userId,
      apiKey,
      settings,
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    return NextResponse.json({
      success: true,
      widgetCode,
      widgetId: widgetConfig.id,
      apiKey,
    })
  } catch (error) {
    console.error("Widget generation error:", error)
    return NextResponse.json({ error: "Widget generation failed" }, { status: 500 })
  }
}

function generateWidgetCode(apiKey: string, settings: any) {
  return `<!-- Comerse.ai Chat Widget -->
<script>
  window.ComerseConfig = {
    apiKey: "${apiKey}",
    position: "${settings.position || "bottom-right"}",
    primaryColor: "${settings.primaryColor || "#3B82F6"}",
    greeting: "${settings.greeting || "Hi! How can I help you today?"}",
    voiceEnabled: ${settings.voiceEnabled || false},
    autoOpen: ${settings.autoOpen || false},
    showOnPages: "${settings.showOnPages || "all"}",
    language: "${settings.language || "en"}",
    theme: "${settings.theme || "light"}"
  };
</script>
<script src="https://cdn.comerse.ai/widget.js" async></script>
<noscript>
  <div>Please enable JavaScript to use the Comerse.ai chat widget.</div>
</noscript>`
}
