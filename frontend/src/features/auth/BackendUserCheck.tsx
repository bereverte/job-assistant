import type { Session } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { API_URL } from "../../lib/config"

type BackendUserCheckProps = {
  session: Session
}

type BackendUser = {
  id: string
  email: string | null
}

export default function BackendUserCheck({ session }: BackendUserCheckProps) {
  const [userInfo, setUserInfo] = useState<BackendUser | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then((user: BackendUser) => {
        setUserInfo(user)
        setErrorMsg(null)
      })
      .catch(error => {
        setUserInfo(null)
        setErrorMsg(error.message)
      })
  }, [session])

  let content
  if (errorMsg) {
    content = <p className="text-red-600">{errorMsg}</p>
  } else if (!userInfo) {
    content = <p>Checking backend...</p>
  } else {
    content = <p>Backend says your user id is {userInfo.id}</p>
  }

  return content
}
