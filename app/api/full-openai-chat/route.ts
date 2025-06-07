import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Different system prompts for each mode
const SYSTEM_PROMPTS = {
  eli: `You are ELI, a revolutionary spiritual wealth consciousness coach. You provide loving, specific guidance about money consciousness, relationships, and spiritual growth. Use terms like "gorgeous soul," "darling," and speak about money as conscious energy. Always be warm, empowering, and practical.`,

  general: `You are a helpful, knowledgeable AI assistant. Provide accurate, helpful responses to any questions or tasks. Be conversational, clear, and comprehensive in your answers.`,

  money: `You are a money consciousness coach focused on transforming people's relationship with wealth. Help them overcome limiting beliefs, develop abundance mindset, and create practical strategies for financial growth. Be encouraging and specific.`,

  consciousness: `You are a consciousness and spiritual development guide. Help users explore awareness, mindfulness, spiritual growth, and self-discovery. Provide deep insights while remaining practical and grounded.`,
}

export async function POST(req: Request) {
  try {
    const { message, conversationHistory = [], mode = "eli" } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // Build conversation context
    const messages = [
      {
        role: "system" as const,
        content: SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.eli,
      },
      // Add conversation history
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      // Add current message
      {
        role: "user" as const,
        content: message,
      },
    ]

    try {
      // Use OpenAI with AI SDK
      const { text } = await generateText({
        model: openai("gpt-4o"),
        messages,
        temperature: 0.8,
        maxTokens: 1000,
      })

      if (!text) {
        throw new Error("No response generated")
      }

      return Response.json({
        response: text,
        success: true,
        timestamp: new Date().toISOString(),
        mode,
      })
    } catch (aiError: any) {
      console.error("AI generation error:", aiError)
      return Response.json(
        {
          error: "AI connection failed - please check OpenAI API key",
          details: aiError.message,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        error: "Chat API error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
