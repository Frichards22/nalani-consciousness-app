"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { testAIConnection } from "@/lib/ai/test-connection"

export default function AITestPanel() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{ working: boolean; message: string } | null>(null)

  const runTest = async () => {
    setTesting(true)
    setResult(null)

    const testResult = await testAIConnection()
    setResult(testResult)
    setTesting(false)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">🤖 AI Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-white text-sm">Test if your OpenAI API key is working correctly</p>

        <Button onClick={runTest} disabled={testing} className="bg-blue-600 hover:bg-blue-700">
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            "Test AI Connection"
          )}
        </Button>

        {result && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              result.working ? "bg-green-900/30 border border-green-500/30" : "bg-red-900/30 border border-red-500/30"
            }`}
          >
            {result.working ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400" />
            )}
            <span className={result.working ? "text-green-300" : "text-red-300"}>{result.message}</span>
          </div>
        )}

        {result && !result.working && (
          <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 text-sm font-medium">
              💡 <strong>Fix:</strong> Make sure you've added your OpenAI API key to the .env.local file and restarted
              the development server.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
