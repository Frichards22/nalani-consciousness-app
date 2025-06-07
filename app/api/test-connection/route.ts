import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET() {
  try {
    // Check if API key exists
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json(
        {
          connected: false,
          error: "OPENAI_API_KEY is not defined in environment variables",
          instructions: "Please set your OpenAI API key in Vercel environment variables",
        },
        { status: 500 },
      )
    }

    // Check if API key is still placeholder
    if (apiKey.includes("your_openai_api_key_here") || apiKey.includes("your-actual-key-here")) {
      return Response.json(
        {
          connected: false,
          error: "OPENAI_API_KEY is still set to placeholder value",
          instructions: "Please replace with your real OpenAI API key from https://platform.openai.com/api-keys",
        },
        { status: 500 },
      )
    }

    // Check if API key has correct format
    if (!apiKey.startsWith("sk-")) {
      return Response.json(
        {
          connected: false,
          error: "OPENAI_API_KEY appears to be invalid (should start with 'sk-')",
          instructions: "Please check your API key format",
        },
        { status: 500 },
      )
    }

    console.log("Testing OpenAI connection with AI SDK...")
    console.log("API key format:", apiKey.substring(0, 7) + "..." + apiKey.substring(apiKey.length - 4))

    // Test with AI SDK
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      messages: [{ role: "user", content: "Say 'Connected successfully'" }],
      maxTokens: 10,
    })

    console.log("Connection test successful:", text)

    return Response.json({
      connected: true,
      message: text || "Connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("OpenAI connection test failed:", error)

    const errorMessage = error.message
    let instructions = ""

    if (error.message.includes("Incorrect API key")) {
      instructions = "Please check your OpenAI API key at https://platform.openai.com/api-keys"
    } else if (error.message.includes("quota")) {
      instructions = "Please check your OpenAI account billing and usage limits"
    } else if (error.message.includes("rate limit")) {
      instructions = "Please wait a moment and try again (rate limited)"
    }

    return Response.json(
      {
        connected: false,
        error: errorMessage,
        instructions,
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
