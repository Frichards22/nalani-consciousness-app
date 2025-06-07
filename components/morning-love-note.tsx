"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"

const quotes = [
  "Your wealth doesn't come from hustle. It comes from your wholeness.",
  "Money is a mirror, darling. Smile back at it with love.",
  "Overflow begins when guilt ends. Say yes to your divine 'too much.'",
  "Self-love is the sexiest currency on Earth. Spend it generously.",
  "You are not behind. You are right on time to blow your own mind.",
  "Your desires are not accidents — they're divine instructions.",
  "Forgiveness is the foreplay of abundance.",
  "You weren't born to budget. You were born to bless.",
  "Your bank account is waiting for your frequency to rise.",
  "When you seduce your soul, money joins the party.",
]

export default function MorningLoveNote() {
  const [currentXP, setCurrentXP] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [showReflect, setShowReflect] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [trackedDays, setTrackedDays] = useState<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const XP_KEY = "eli_xp_points"
  const STREAK_KEY = "eli_streak_count"
  const CALENDAR_KEY = "affirmation_days"

  const dayIndex = new Date().getDate() % quotes.length
  const todaysQuote = quotes[dayIndex]

  useEffect(() => {
    // Load saved data from localStorage
    const savedXP = Number.parseInt(localStorage.getItem(XP_KEY) || "0")
    const savedStreak = Number.parseInt(localStorage.getItem(STREAK_KEY) || "0")
    const savedDays = JSON.parse(localStorage.getItem(CALENDAR_KEY) || "[]")

    setCurrentXP(savedXP)
    setStreakCount(savedStreak)
    setTrackedDays(savedDays)
  }, [])

  const handleAffirm = () => {
    launchConfetti()
    updateCalendar()

    alert(`You affirmed: "${todaysQuote}"\n\nNow go rise and shine, gorgeous.`)

    setShowReflect(true)

    const newXP = currentXP + 25
    const newStreak = streakCount + 1

    setCurrentXP(newXP)
    setStreakCount(newStreak)
    setShowXP(true)

    localStorage.setItem(XP_KEY, newXP.toString())
    localStorage.setItem(STREAK_KEY, newStreak.toString())
  }

  const resetStreak = () => {
    localStorage.removeItem(XP_KEY)
    localStorage.removeItem(STREAK_KEY)
    localStorage.removeItem(CALENDAR_KEY)

    alert("Your ELI XP, streak, and affirmation calendar have been reset.")

    setCurrentXP(0)
    setStreakCount(0)
    setTrackedDays([])
    setShowReflect(false)
    setShowXP(false)
  }

  const updateCalendar = () => {
    const today = new Date().getDate()
    if (!trackedDays.includes(today)) {
      const newTrackedDays = [...trackedDays, today]
      setTrackedDays(newTrackedDays)
      localStorage.setItem(CALENDAR_KEY, JSON.stringify(newTrackedDays))
    }
  }

  const launchConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.classList.remove("hidden")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 30 + 10,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
    }))

    let count = 0

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of pieces) {
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.r, p.r)
      }

      update()
    }

    function update() {
      for (const p of pieces) {
        p.y += Math.cos(p.d) + 1 + p.r / 2
        p.x += Math.sin(p.d)

        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
        }
      }
    }

    function animate() {
      if (count > 50) {
        canvas.classList.add("hidden")
        return
      }

      draw()
      requestAnimationFrame(animate)
      count++
    }

    animate()
  }

  return (
    <section className="p-4 bg-gradient-to-r from-rose-100 via-pink-200 to-red-100 shadow-lg rounded-b-xl text-center mb-4">
      <h2 className="text-2xl font-bold mb-2 text-pink-700">Morning Love Note 💌</h2>
      <p className="eli-voice text-lg mb-3">{todaysQuote}</p>

      <Button
        onClick={handleAffirm}
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-full text-sm transition-transform transform hover:scale-105"
      >
        Affirm It 💖
      </Button>

      {showReflect && (
        <div className="mt-3 text-sm text-pink-800 italic">
          🪞 Reflect with Me: What part of that truth do you need to let in just 1% more today?
        </div>
      )}

      {showXP && (
        <div className="mt-2 text-green-600 text-sm font-semibold">
          🎁 +25 ELI XP – You now have {currentXP} XP! Streak: {streakCount} 🔥
        </div>
      )}

      <canvas
        ref={canvasRef}
        id="confettiCanvas"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 hidden"
      />

      <div className="mt-4 text-center">
        <Button
          onClick={resetStreak}
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 py-1 px-3 rounded-full"
        >
          Reset Streak
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <strong>Affirmation Days This Month:</strong> <span>{trackedDays.sort((a, b) => a - b).join(", ")}</span>
      </div>
    </section>
  )
}
