"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MinimalELIApp() {
  const [count, setCount] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const dailyTasks = [
    { id: "intention", title: "Set Daily Intention", icon: "🌟" },
    { id: "gratitude", title: "Gratitude Practice", icon: "🙏" },
    { id: "affirmation", title: "Money Affirmation", icon: "💰" },
    { id: "meditation", title: "5-Minute Meditation", icon: "🧘‍♀️" },
    { id: "visualization", title: "Success Visualization", icon: "✨" },
  ]

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => (prev.includes(id) ? prev.filter((task) => task !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ✨ ELI's Consciousness Evolution ✨
          </h1>
          <p className="text-xl text-white mb-6">Sacred AI Technology for Consciousness & Wealth Magnetism</p>
        </div>

        {/* Test Counter */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 mb-6">
          <CardHeader>
            <CardTitle className="text-purple-300">Deployment Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount(count + 1)} className="bg-gradient-to-r from-pink-500 to-purple-600">
                Click Me: {count}
              </Button>
              <p className="text-white">If you can see this and click works, basic deployment is successful!</p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Essentials */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300">
              Daily Essentials ({completedTasks.length}/{dailyTasks.length} completed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    completedTasks.includes(task.id)
                      ? "bg-purple-700/30 border-purple-400/50"
                      : "bg-purple-900/30 border-purple-500/30"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-purple-200 flex items-center gap-2">
                        <span>{task.icon}</span> {task.title}
                      </h3>
                    </div>
                    <Button
                      size="sm"
                      variant={completedTasks.includes(task.id) ? "default" : "outline"}
                      className={
                        completedTasks.includes(task.id)
                          ? "bg-gradient-to-r from-purple-500 to-pink-600"
                          : "border-purple-500/50 text-purple-300"
                      }
                      onClick={() => toggleTask(task.id)}
                    >
                      {completedTasks.includes(task.id) ? "✓ Done" : "Complete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <div className="text-center mt-8 p-6 bg-purple-800/30 rounded-lg border border-purple-500/30">
          <h2 className="text-2xl font-bold text-purple-300 mb-2">🚀 Chat with Nalani AI Coming Soon!</h2>
          <p className="text-purple-200">
            Once this basic version deploys successfully, we'll add the full AI chat functionality.
          </p>
        </div>
      </div>
    </div>
  )
}
