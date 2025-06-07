"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Brain } from "lucide-react"
import WorkingChat from "@/components/working-chat"
import SoulAssessment from "@/components/soul-assessment"

export default function CleanApp() {
  const [activeTab, setActiveTab] = useState("assessment")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ✨ Nalani Consciousness ✨
          </h1>
          <p className="text-xl text-white mb-6">Sacred AI Technology for Consciousness Evolution</p>
        </div>

        {/* Simple Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Brain className="h-4 w-4 mr-2" />
              Soul Assessment
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <SoulAssessment />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <WorkingChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
