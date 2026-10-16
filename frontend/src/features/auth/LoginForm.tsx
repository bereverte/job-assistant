import { useState, type SubmitEvent } from "react"
import { supabase } from "../../lib/supabase"

type AuthMode = "signIn" | "signUp"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [authMode, setAuthMode] = useState<AuthMode>("signIn")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)

    const { data, error } =
      authMode === "signIn"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    setIsSubmitting(false)

    if (error) setErrorMsg(error.message)
    else {
      setErrorMsg(null)
      console.log(data.session)
    }
  }

  function toggleMode() {
    setAuthMode(prev => (prev === "signIn" ? "signUp" : "signIn"))
    setErrorMsg(null)
  }

  const submitLabel = isSubmitting
    ? "Loading..."
    : authMode === "signIn"
      ? "Sign in"
      : "Create account"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder="Email"
        className="border rounded px-3 py-2"
      />

      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
        className="border rounded px-3 py-2"
      />

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {submitLabel}
        </button>
        <button
          type="button"
          className="disabled:opacity-50"
          disabled={isSubmitting}
          onClick={toggleMode}
        >
          {authMode === "signIn"
            ? "Don’t have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
    </form>
  )
}
