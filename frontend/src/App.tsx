import type { Session } from "@supabase/supabase-js"
import LoginForm from "./features/auth/LoginForm"
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

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
  const [session, setSession] = useState<Session | null>(null)
  const [isLoadingSession, setIsLoadingSession] = useState(true)

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsLoadingSession(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoadingSession(false)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  let content
  if (isLoadingSession) {
    content = <p>Loading...</p>
  } else if (!session) {
    content = <LoginForm />
  } else {
    content = (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col gap-2 items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold text-blue-600">Job Assistant</h1>
      <p className={`text-xl font-bold ${statusColors[status]}`}>{statusMessages[status]}</p>
      {content}
    </main>
  )
}

export default App
