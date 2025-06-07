"use client"

import { useEffect, useState } from "react"

export default function NaughtyNightyNight() {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Show 3 times a week - Monday, Wednesday, Friday
    const today = new Date().getDay()
    // 1 = Monday, 3 = Wednesday, 5 = Friday
    setShouldShow([1, 3, 5].includes(today))
  }, [])

  if (!shouldShow) return null

  return (
    <section className="p-4 bg-gradient-to-tr from-rose-200 to-pink-300 mt-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-3">Naughty Nighty Night 🌙</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="eli-voice">
          "You did enough today, love. Now strip the guilt, slip into pleasure, and rest like you're the main character
          in a dream designed by the Divine."
        </p>
        <p className="mt-2 text-sm text-gray-700">
          This feature appears <strong>3 nights a week</strong> — when the stars align just right to bless your pillow
          with purpose and play. 😘
        </p>
        <p className="mt-2 text-sm text-gray-700 italic">
          Tomorrow will rise. But tonight? Tonight, you melt into magic. Goodnight, gorgeous soul. 💋
        </p>
      </div>
    </section>
  )
}
