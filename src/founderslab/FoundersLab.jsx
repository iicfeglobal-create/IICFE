import { useState } from 'react'
import { getSession, logout } from './auth'
import LoginGate from './components/LoginGate'
import Dashboard from './components/Dashboard'

// The Founders Lab — Student Entrepreneur portal.
// Light, professional tutoring theme (white background) — intentionally
// distinct from the dark marketing site.
export default function FoundersLab() {
  const [session, setSession] = useState(getSession)

  const handleLogout = () => {
    logout()
    setSession(null)
  }

  return (
    <div className="min-h-screen bg-white font-body text-slate-800">
      {session ? (
        <Dashboard session={session} onLogout={handleLogout} />
      ) : (
        <LoginGate onLogin={setSession} />
      )}
    </div>
  )
}
