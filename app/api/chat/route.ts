import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"
import { supabase, supabaseAdmin } from "@/lib/supabase"
import { searchDocuments } from "@/lib/vector-store"
import { trackEvent } from "@/lib/analytics"
import { validateApiKey } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json()

    let userId: string | null = null

    // Check for API key authentication (for widget)
    if (apiKey) {
      const keyData = await validateApiKey(apiKey)
      if (!keyData) {
        return new Response("Invalid API key", { status: 401 })
      }
      userId = keyData.user_id
    } else {
      // Check for session authentication (for dashboard)
      const accessToken = req.cookies.get("sb-access-token")?.value
      if (!accessToken) {
        return new Response("Unauthorized", { status: 401 })
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(accessToken)
      if (error || !user) {
        return new Response("Unauthorized", { status: 401 })
      }
      userId = user.id
    }

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Get user data for context
    const { data: userData } = await supabaseAdmin.from("users").select("*").eq("id", userId).single()

    if (!userData) {
      return new Response("User not found", { status: 404 })
    }

    // Get the latest user message
    const lastMessage = messages[messages.length - 1]

    // Search for relevant documents
    const relevantDocs = await searchDocuments(userId, lastMessage.content, 5)

    // Build context from relevant documents
    let context = ""
    if (relevantDocs.length > 0) {
      context = `\n\nRelevant information from your knowledge base:\n${relevantDocs
        .map((doc) => doc.pageContent)
        .join("\n\n")}`
    }

    // Build system prompt with user's business context
    const systemPrompt = `You are an AI customer support assistant for ${userData.company}. You specialize in helping customers with:

1. Product information and recommendations
2. Sizing and fit questions
3. Shipping and delivery inquiries
4. Return and exchange policies
5. Order status and tracking
6. Technical product specifications
7. Care instructions and maintenance

Company Information:
- Company: ${userData.company}
- Industry: ${userData.industry}

Be helpful, friendly, and knowledgeable. Always try to provide specific product recommendations when appropriate. If you don't have specific information about a product, acknowledge this and offer to help the customer contact a human agent for more details.

Keep responses concise but informative. Use bullet points for lists when helpful.${context}`

    // Track the query
    await trackEvent({
      userId,
      eventType: "chat_query",
      eventData: {
        message: lastMessage.content,
        timestamp: new Date().toISOString(),
      },
    })

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
      onFinish: async (result) => {
        // Track query resolution
        await trackEvent({
          userId,
          eventType: "query_resolved",
          eventData: {
            query: lastMessage.content,
            response: result.text,
            timestamp: new Date().toISOString(),
          },
        })

        // Store chat session
        await supabaseAdmin.from("chat_sessions").upsert({
          user_id: userId,
          session_id: req.headers.get("x-session-id") || "default",
          messages: [...messages, { role: "assistant", content: result.text }],
        })
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
