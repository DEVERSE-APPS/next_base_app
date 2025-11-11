"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const flirtWithBackend = async () => {
    setLoading(true)
    try {
      const res = await api.get("/api/hello/")
      setMessage(res.data.message || "Backend winked at me 😉")
    } catch (err) {
      setMessage("😢 Backend is playing hard to get...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Frontend’s here — dressed to impress 💅
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        Waiting for backend to notice me...
      </p>

      <div className="flex gap-3">
        <Button
          onClick={flirtWithBackend}
          disabled={loading}
          className="text-lg px-6 py-4"
        >
          {loading ? "💌 Sending ping..." : "💌 Ping Backend"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Let’s build something spicy together! 🔥")}
          className="text-lg px-6 py-4"
        >
          😜 Let’s Flirt
        </Button>
      </div>

      <div className="mt-10 text-gray-700 text-xl min-h-[40px]">
        {message ? message : <span className="animate-pulse">Connecting... 💭</span>}
      </div>

      <footer className="absolute bottom-5 text-sm text-gray-400">
        ❤️ Powered by Next.js + Bun + Axios + Shadcn
      </footer>
    </main>
  )
}
