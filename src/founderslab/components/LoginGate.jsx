import { useState } from 'react'
import { Lock, ShieldCheck, Rocket, GraduationCap, ArrowLeft } from 'lucide-react'
import { login, getLockoutRemaining } from '../auth'
import { resetDemoData } from '../store'

export default function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    const result = await login(email, password)
    setBusy(false)
    if (result.ok) onLogin(result.session)
    else setError(result.error)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="lg:w-[44%] bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between p-8 lg:p-14">
        <a href="#/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-lime transition-colors">
          <ArrowLeft size={15} /> Back to IICFE
        </a>
        <div className="py-12">
          <div className="w-14 h-14 rounded-2xl bg-lime flex items-center justify-center mb-6">
            <Rocket size={26} className="text-white" />
          </div>
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-lime mb-3">Student Entrepreneur Program</div>
          <h1 className="font-heading text-4xl lg:text-[44px] font-bold text-ink leading-tight mb-4">The Founders Lab</h1>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-md">
            11 guided sessions, 6 AI startup coaches, hands-on activities and proctored assessments —
            from your first idea to a Shark Tank-ready pitch.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {[
              [GraduationCap, '11 sessions · Learn, Activities & Quiz in every module'],
              [ShieldCheck, 'Proctored quizzes — leaving the tab terminates your attempt'],
              [Rocket, 'Certificate of Completion on finishing every module'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 text-[13.5px] text-slate-600">
                <Icon size={16} className="text-lime flex-shrink-0" /> {text}
              </div>
            ))}
          </div>
        </div>
        <div className="text-[12px] text-slate-400">© {new Date().getFullYear()} IICFE · The Founders Lab</div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-14 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
            <Lock size={18} className="text-ink" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-ink mb-1.5">Restricted access</h2>
          <p className="text-[13.5px] text-slate-500 mb-8">
            This portal is limited to enrolled Founders Lab students. Sign in with your program credentials.
          </p>

          <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
            <div>
              <label htmlFor="fl-email" className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                id="fl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@iicfe.org"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-[14px] text-ink placeholder:text-slate-400 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="fl-pass" className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                id="fl-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-[14px] text-ink placeholder:text-slate-400 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-400/30 text-[13px] text-rose-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy || getLockoutRemaining() > 0}
              className="mt-2 w-full py-3.5 bg-ink hover:bg-lime disabled:opacity-50 text-white text-[14px] font-bold rounded-xl transition-colors duration-200"
            >
              {busy ? 'Verifying…' : 'Sign in to the Lab'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[12px] text-slate-400">Demo environment</span>
            <button
              onClick={() => { resetDemoData(); setError(''); }}
              className="text-[12px] font-semibold text-slate-400 hover:text-lime transition-colors"
              title="Clears all demo progress, including terminated attempts"
            >
              Reset demo data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
