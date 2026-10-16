import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL
type ApiStatus = "loading" | "ok" | "error"

const statusMessages: Record<ApiStatus, string> = {
  loading: "Connecting to API...",
  ok: "API connected",
  error: "API unavailable",
}

const statusColors: Record<ApiStatus, string> = {
  loading: "text-yellow-600",
  ok: "text-green-600",
  error: "text-red-600",
}

function App() {
  const [status, setStatus] = useState<ApiStatus>("loading")

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then(res => {
        if (res.ok) setStatus("ok")
        else setStatus("error")
      })
      .catch(() => {
        setStatus("error")
      })
  }, [])

  return (
    <main className="min-h-screen flex flex-col gap-2 items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold text-blue-600">Job Assistant</h1>
      <p className={`text-xl font-bold ${statusColors[status]}`}>{statusMessages[status]}</p>
    </main>
  )
}

export default App
