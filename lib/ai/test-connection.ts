// Test file to verify AI connection is working
export async function testAIConnection() {
  try {
    const response = await fetch("/api/consciousness-assessment/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "analyzeResponse",
        data: {
          question: {
            id: "test",
            category: "consciousness",
            dimension: "Awareness",
            question: "How are you feeling right now?",
            type: "text",
          },
          response: "I feel excited about testing this AI consciousness app!",
        },
      }),
    })

    const data = await response.json()

    if (data.fallback) {
      return {
        working: false,
        message: "Using fallback responses - API key not working",
      }
    } else {
      return {
        working: true,
        message: "AI is connected and working perfectly!",
      }
    }
  } catch (error) {
    return {
      working: false,
      message: "Connection failed: " + error.message,
    }
  }
}
