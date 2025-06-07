import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const SYSTEM_PROMPTS = {
  eli: `You are ELI, a revolutionary spiritual wealth consciousness coach. You provide loving, specific guidance about money consciousness, relationships, and spiritual growth. Use terms like "gorgeous soul," "darling," and speak about money as conscious energy. Always be warm, empowering, and practical.`,
  general: `You are a helpful, knowledgeable AI assistant. Provide accurate, helpful responses to any questions or tasks. Be conversational, clear, and comprehensive.`,
  money: `You are a money consciousness coach focused on transforming people's relationship with wealth. Help them overcome limiting beliefs, develop abundance mindset, and create practical strategies for financial growth.`,
  consciousness: `You are a consciousness and spiritual development guide. Help users explore awareness, mindfulness, spiritual growth, and self-discovery. Provide deep insights while remaining practical.`,
}

export async function POST(req: Request) {
  try {
    const { message, mode = "eli", conversationHistory = [] } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if OpenAI API key exists
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    // Prepare messages for AI SDK
    const messages = [
      {
        role: "system" as const,
        content: SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.eli,
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ]

    // Use AI SDK with proper error handling
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      messages,
      temperature: 0.7,
      maxTokens: 800,
    })

    return Response.json({
      response: text,
      success: true,
      timestamp: new Date().toISOString(),
      mode,
    })
  } catch (error: any) {
    console.error("Chat API error:", error)

    // Detailed error handling
    let errorMessage = "Chat API error occurred"
    const statusCode = 500

    if (error.message?.includes("API key")) {
      errorMessage = "Invalid OpenAI API key. Please check your environment variables."
    } else if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      errorMessage = "OpenAI API quota exceeded or rate limited. Please check your OpenAI account."
    } else if (error.message?.includes("network") || error.message?.includes("timeout")) {
      errorMessage = "Network error or timeout. Please try again."
    } else if (error.message?.includes("model")) {
      errorMessage = "Model not available. Your account may not have access to this model."
    }

    return Response.json(
      {
        error: errorMessage,
        details: error.message,
      },
      { status: statusCode },
    )
  }
}
