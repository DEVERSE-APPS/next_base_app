"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const checkBackendStatus = async () => {
    setLoading(true)
    try {
      const res = await api.get("/api/hello/")
      setMessage(res.data.message || "System Operational")
    } catch (err) {
      setMessage("System Unavailable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Welcome to Deverse
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        Build, Ship, and Scale with Confidence.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={checkBackendStatus}
          disabled={loading}
          className="text-lg px-6 py-4"
        >
          {loading ? "Checking status..." : "Check Connection"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Let's build something amazing.")}
          className="text-lg px-6 py-4"
        >
          Start Building
        </Button>
      </div>

      <div className="mt-10 text-gray-700 text-xl min-h-[40px]">
        {message ? message : <span className="animate-pulse">Waiting for action...</span>}
      </div>

      <footer className="absolute bottom-5 text-sm text-gray-400">
        Powered by Next.js + Bun + Axios + Shadcn
      </footer>
    </main>
  )
}
