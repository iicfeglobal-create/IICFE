import { ShieldAlert, LogOut, ArrowLeft, Bot, BookOpen, Award, KeyRound } from 'lucide-react'
import { sessions } from '../data/sessions'
import { liftTermination } from '../store'
import { useProgress } from '../useProgress'
import ChatbotSection from './ChatbotSection'
import SessionModules from './SessionModules'
import CertificateSection from './CertificateSection'

function TerminatedScreen({ reason, onLogout }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="max-w-[480px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={30} className="text-rose-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-ink mb-3">Access terminated</h1>
        <p className="text-[14.5px] text-slate-500 leading-relaxed mb-2">
          Our proctoring system detected a violation during an assessment:
        </p>
        <p className="text-[13.5px] font-semibold text-rose-600 mb-6">{reason || 'Tab switch detected during a proctored quiz.'}</p>
        <p className="text-[13.5px] text-slate-500 leading-relaxed mb-8">
          Your Founders Lab access for this session has been permanently revoked and this attempt will not
          count toward certification. Contact your program coordinator if you believe this is an error.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-ink text-white text-[13.5px] font-bold rounded-xl hover:bg-slate-700 transition-colors"
          >
            Sign out
          </button>
          <button
            onClick={liftTermination}
            className="px-6 py-3 border-2 border-slate-200 text-slate-600 text-[13.5px] font-bold rounded-xl hover:border-lime hover:text-lime transition-colors flex items-center gap-2"
            title="Demo-only: in production this action is restricted to program coordinators"
          >
            <KeyRound size={15} /> Restore access (demo override)
          </button>
        </div>
        <p className="mt-4 text-[11.5px] text-slate-400">
          Restoring keeps your completed work but voids the terminated quiz attempt — you must retake it.
        </p>
      </div>
    </div>
  )
}

export default function Dashboard({ session, onLogout }) {
  const progress = useProgress()

  if (progress.terminated) {
    return <TerminatedScreen reason={progress.terminatedReason} onLogout={onLogout} />
  }

  const completedModules = sessions.filter((s) => {
    const quiz = progress.quizzes[s.id]
    return progress.activities[s.id]?.done && quiz && !quiz.terminated && quiz.score >= Math.ceil(quiz.total * 0.7)
  }).length

  return (
    <div>
      {/* Portal header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1180px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#/" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400 hover:text-lime transition-colors">
              <ArrowLeft size={14} /> IICFE
            </a>
            <div className="w-px h-5 bg-slate-200" />
            <div className="font-heading text-[16px] font-bold text-ink">The Founders Lab</div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-teal-50 text-lime text-[11px] font-bold tracking-wide uppercase">
              Student Entrepreneur
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[12.5px] text-slate-400">{session.email}</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1180px] mx-auto px-6 py-12">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-lime mb-2">Welcome back, founder</div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-3">Your startup journey</h1>
          <p className="text-[14.5px] text-slate-500 max-w-2xl leading-relaxed">
            Work through each session in order — watch the lesson, complete the activity to unlock the quiz,
            and pass all 11 proctored quizzes to earn your certificate.
          </p>
          <div className="mt-7 max-w-md">
            <div className="flex justify-between text-[12px] font-semibold text-slate-500 mb-2">
              <span>Program progress</span>
              <span>{completedModules} / {sessions.length} modules</span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-lime rounded-full transition-all duration-500"
                style={{ width: `${(completedModules / sessions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1180px] mx-auto px-6 pb-24">
        {/* Chatbots */}
        <section className="pt-14" id="coaches">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center"><Bot size={17} className="text-lime" /></div>
            <h2 className="font-heading text-2xl font-bold text-ink">AI Startup Coaches</h2>
          </div>
          <p className="text-[13.5px] text-slate-500 mb-8 ml-12">Six specialist bots that guide you from problem discovery to launch marketing.</p>
          <ChatbotSection />
        </section>

        {/* Sessions */}
        <section className="pt-16" id="sessions">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center"><BookOpen size={17} className="text-lime" /></div>
            <h2 className="font-heading text-2xl font-bold text-ink">Program Sessions</h2>
          </div>
          <p className="text-[13.5px] text-slate-500 mb-8 ml-12">
            Each session has three parts: <strong className="text-slate-700">Learn → Activities → Quiz</strong>.
            Complete the activity to unlock its quiz. Quizzes are proctored.
          </p>
          <SessionModules />
        </section>

        {/* Certificate */}
        <section className="pt-16" id="certificate">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center"><Award size={17} className="text-lime" /></div>
            <h2 className="font-heading text-2xl font-bold text-ink">Certificate of Completion</h2>
          </div>
          <p className="text-[13.5px] text-slate-500 mb-8 ml-12">Unlocks when every activity is complete and all 11 quizzes are passed (≥ 7/10) with a clean proctoring record.</p>
          <CertificateSection completedModules={completedModules} />
        </section>
      </main>
    </div>
  )
}
