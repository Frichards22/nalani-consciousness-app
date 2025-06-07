import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { message, conversationHistory = [], mode, systemPrompt } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    // Build conversation context with mode-specific system prompt
    const messages = [
      {
        role: "system" as const,
        content: systemPrompt || "You are a helpful AI assistant.",
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

    // Generate response with GPT-4
    const { text } = await generateText({
      model: openai("gpt-4o"), // Using GPT-4 Omni for best results
      messages,
      temperature: mode === "general" ? 0.7 : 0.8, // Slightly more creative for coaching modes
      maxTokens: 1000, // Increased for more detailed responses
    })

    if (!text) {
      throw new Error("No response generated")
    }

    return Response.json({
      response: text,
      success: true,
      timestamp: new Date().toISOString(),
      mode,
      model: "gpt-4o",
    })
  } catch (error: any) {
    console.error("Enhanced chat API error:", error)

    if (error.message?.includes("API key")) {
      return Response.json({ error: "Invalid OpenAI API key" }, { status: 401 })
    }

    if (error.message?.includes("quota")) {
      return Response.json({ error: "OpenAI quota exceeded" }, { status: 429 })
    }

    return Response.json({ error: "AI service temporarily unavailable" }, { status: 500 })
  }
}
