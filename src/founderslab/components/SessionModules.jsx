import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Play, Volume2, Lock, CheckCircle2, ShieldAlert, XCircle, PlayCircle, BadgeCheck, ClipboardList, Lightbulb } from 'lucide-react'
import { sessions } from '../data/sessions'
import { useProgress } from '../useProgress'
import { markActivityDone, recordQuizResult, terminateQuiz } from '../store'
import ActivityPlayer from './ActivityEngines'

const PASS_MARK = 7

/* --------------------------------- Learn tab --------------------------------- */

function MockPlayer({ kind, title }) {
  const [playing, setPlaying] = useState(false)
  const Icon = kind === 'video' ? Play : Volume2
  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200 ${kind === 'video' ? '' : 'bg-white'}`}>
      {kind === 'video' ? (
        <div className="relative aspect-video bg-gradient-to-br from-ink via-ink-soft to-ink-muted flex items-center justify-center">
          <button
            onClick={() => setPlaying(!playing)}
            className="w-16 h-16 rounded-full bg-white/15 hover:bg-lime backdrop-blur flex items-center justify-center transition-colors group"
            aria-label="Play video"
          >
            <Icon size={24} className="text-white ml-1" />
          </button>
          <div className="absolute bottom-0 inset-x-0 p-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className={`h-full bg-lime rounded-full transition-all ${playing ? 'w-1/3 duration-[8000ms]' : 'w-0'}`} />
            </div>
            <div className="flex justify-between text-[10.5px] text-white/50 mt-1.5 font-medium">
              <span>{playing ? 'Playing (demo)…' : '0:00'}</span><span>12:40</span>
            </div>
          </div>
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/40 text-[10px] font-bold text-white/70 uppercase tracking-wide">Demo placeholder</span>
        </div>
      ) : (
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={() => setPlaying(!playing)}
            className="w-11 h-11 rounded-full bg-teal-50 hover:bg-lime flex items-center justify-center transition-colors group flex-shrink-0"
            aria-label="Play audio"
          >
            <Icon size={17} className="text-lime group-hover:text-white transition-colors" />
          </button>
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold text-ink mb-1.5">{title}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full bg-lime rounded-full transition-all ${playing ? 'w-1/4 duration-[8000ms]' : 'w-0'}`} />
            </div>
          </div>
          <span className="text-[10.5px] text-slate-300 font-semibold">08:15</span>
        </div>
      )}
    </div>
  )
}

function LearnTab({ session }) {
  return (
    <div className="grid lg:grid-cols-[1.5fr,1fr] gap-5">
      <div>
        <div className="text-[12px] font-bold uppercase tracking-wide text-slate-400 mb-2.5">Video lesson</div>
        <MockPlayer kind="video" />
        <div className="mt-3 font-heading text-[15px] font-bold text-ink">Session {session.num}: {session.title}</div>
        <p className="text-[13px] text-slate-500 leading-relaxed mt-1">{session.blurb}</p>
      </div>
      <div>
        <div className="text-[12px] font-bold uppercase tracking-wide text-slate-400 mb-2.5">Audio recap</div>
        <MockPlayer kind="audio" title={`${session.title} — 8-minute recap`} />
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-[12px] font-bold text-ink mb-1.5">Up next in this session</div>
          <div className="text-[12.5px] text-slate-500 leading-relaxed">
            Activity: <strong className="text-slate-700">{session.activityName}</strong> ({session.mechanic}) — complete it to unlock the 10-question proctored quiz.
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- Activity tab -------------------------------- */

function ActivityTab({ session }) {
  const progress = useProgress()
  const done = !!progress.activities[session.id]?.done
  const [pct, setPct] = useState(done ? 1 : 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="font-heading text-[15px] font-bold text-ink">{session.activityName}</div>
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{session.mechanic}</span>
      </div>
      {/* Activity progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-[11.5px] font-semibold text-slate-400 mb-1.5">
          <span>Activity progress</span>
          <span>{Math.round((done ? 1 : pct) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-lime rounded-full transition-all duration-500" style={{ width: `${(done ? 1 : pct) * 100}%` }} />
        </div>
      </div>

      {done && (
        <div className="mb-5 p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2.5 text-[13px] font-semibold text-lime">
          <CheckCircle2 size={16} /> Completed — you can replay it anytime; your completion is saved.
        </div>
      )}

      {/* What to do + a worked example */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-ink mb-2">
            <ClipboardList size={14} className="text-lime" /> Your task
          </div>
          <p className="text-[13px] text-slate-600 leading-relaxed">{session.activity.goal}</p>
        </div>
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-amber-900 mb-2">
            <Lightbulb size={14} className="text-amber-600" /> Example
          </div>
          <p className="text-[13px] text-amber-900/80 leading-relaxed">{session.activity.sample}</p>
        </div>
      </div>

      <ActivityPlayer
        activity={session.activity}
        done={done}
        onProgress={(p) => setPct((prev) => Math.max(prev, p))}
        onComplete={() => markActivityDone(session.id)}
      />
    </div>
  )
}

/* ---------------------------------- Quiz tab ---------------------------------- */

function QuizRunner({ session, onFinish }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const finishedRef = useRef(false)

  // Proctoring: leaving the tab (or window) during an active quiz permanently
  // terminates lab access. Listeners detach the moment the quiz is submitted.
  useEffect(() => {
    const violate = (why) => {
      if (finishedRef.current) return
      finishedRef.current = true
      terminateQuiz(session.id, why)
    }
    const onVisibility = () => { if (document.hidden) violate(`Tab switch detected during the Session ${session.num} quiz.`) }
    const onBlur = () => violate(`Window focus lost during the Session ${session.num} quiz.`)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
    }
  }, [session])

  const select = (optIdx) => {
    const next = [...answers, optIdx]
    if (next.length >= session.quiz.length) {
      finishedRef.current = true
      const score = next.reduce((s, a, i) => s + (a === session.quiz[i].a ? 1 : 0), 0)
      recordQuizResult(session.id, score, session.quiz.length)
      onFinish()
      return
    }
    setAnswers(next)
    setIndex(index + 1)
  }

  const q = session.quiz[index]
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-400/20 text-[11.5px] font-bold text-rose-600">
          <ShieldAlert size={13} /> PROCTORED — do not leave this tab
        </div>
        <span className="text-[12px] font-semibold text-slate-400">Question {index + 1} / {session.quiz.length}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-lime rounded-full transition-all duration-300" style={{ width: `${(index / session.quiz.length) * 100}%` }} />
      </div>
      <div className="text-[15.5px] font-semibold text-ink mb-5 leading-relaxed">{q.q}</div>
      <div className="flex flex-col gap-2.5">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => select(i)}
            className="text-left px-4 py-3.5 rounded-xl border-2 border-slate-200 hover:border-lime hover:bg-teal-50 text-[13.5px] font-medium text-slate-700 transition-all"
          >
            <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuizTab({ session }) {
  const progress = useProgress()
  const [running, setRunning] = useState(false)
  const activityDone = !!progress.activities[session.id]?.done
  const result = progress.quizzes[session.id] || null

  if (!activityDone) {
    return (
      <div className="py-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Lock size={22} className="text-slate-400" />
        </div>
        <div className="font-heading text-[16px] font-bold text-ink mb-1.5">Quiz locked</div>
        <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
          Complete the <strong>{session.activityName}</strong> activity first. The quiz unlocks automatically once your activity progress reaches 100%.
        </p>
      </div>
    )
  }

  if (result?.terminated) {
    return (
      <div className="py-10 text-center">
        <XCircle size={36} className="text-rose-600 mx-auto mb-3" />
        <div className="font-heading text-[16px] font-bold text-rose-600">Attempt terminated</div>
        <p className="text-[13px] text-slate-500 mt-1.5">{result.reason}</p>
      </div>
    )
  }

  if (running) {
    return <QuizRunner session={session} onFinish={() => setRunning(false)} />
  }

  if (result) {
    const passed = result.score >= PASS_MARK
    return (
      <div className="py-8 text-center">
        {passed ? <BadgeCheck size={38} className="text-lime mx-auto mb-3" /> : <XCircle size={38} className="text-amber-500 mx-auto mb-3" />}
        <div className="font-heading text-2xl font-bold text-ink mb-1">{result.score} / {result.total}</div>
        <div className={`text-[13.5px] font-semibold ${passed ? 'text-lime' : 'text-amber-600'}`}>
          {passed ? 'Passed — this module counts toward your certificate.' : `Not passed yet — you need ${PASS_MARK}/${result.total}.`}
        </div>
        {!passed && (
          <button onClick={() => setRunning(true)} className="mt-5 px-6 py-3 rounded-xl bg-ink hover:bg-lime text-white text-[13px] font-bold transition-colors">
            Retake quiz
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="py-6 max-w-lg mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
        <PlayCircle size={24} className="text-lime" />
      </div>
      <div className="font-heading text-[17px] font-bold text-ink mb-2">Ready for the Session {session.num} quiz?</div>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
        10 multiple-choice questions · pass mark {PASS_MARK}/10.
      </p>
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-400/20 text-left mb-6">
        <div className="flex items-center gap-2 text-[12.5px] font-bold text-rose-600 mb-1.5">
          <ShieldAlert size={14} /> Proctoring is active during the quiz
        </div>
        <p className="text-[12.5px] text-slate-600 leading-relaxed">
          Switching tabs, minimising the window, or clicking outside the browser is treated as a violation and will
          <strong> permanently terminate your Founders Lab access for this session</strong>. No warnings are given.
        </p>
      </div>
      <button onClick={() => setRunning(true)} className="px-7 py-3.5 rounded-xl bg-ink hover:bg-lime text-white text-[13.5px] font-bold transition-colors">
        I understand — start the quiz
      </button>
    </div>
  )
}

/* ------------------------------ Session accordion ------------------------------ */

const TABS = ['Learn', 'Activities', 'Quiz']

function SessionCard({ session }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('Learn')
  const progress = useProgress()

  const activityDone = !!progress.activities[session.id]?.done
  const quiz = progress.quizzes[session.id]
  const quizPassed = quiz && !quiz.terminated && quiz.score >= PASS_MARK
  const moduleDone = activityDone && quizPassed

  return (
    <div className={`rounded-2xl border transition-colors ${open ? 'border-lime/40 shadow-card-md' : 'border-slate-200'} bg-white overflow-hidden`}>
      {/* Dropdown header */}
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-[14px] ${moduleDone ? 'bg-lime text-white' : 'bg-slate-100 text-slate-500'}`}>
          {moduleDone ? <CheckCircle2 size={18} /> : session.num}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[15px] font-bold text-ink">Session {session.num} · {session.title}</div>
          <div className="text-[12px] text-slate-400 truncate">{session.activityName} — {session.mechanic}</div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {activityDone && <span className="px-2 py-1 rounded-md bg-teal-50 text-lime text-[10.5px] font-bold uppercase tracking-wide">Activity ✓</span>}
          {quizPassed && <span className="px-2 py-1 rounded-md bg-teal-50 text-lime text-[10.5px] font-bold uppercase tracking-wide">Quiz {quiz.score}/10</span>}
          {quiz?.terminated && <span className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 text-[10.5px] font-bold uppercase tracking-wide">Terminated</span>}
        </div>
        <ChevronDown size={17} className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="border-t border-slate-100">
          {/* Secondary nav — lexically scoped to this session */}
          <div className="flex border-b border-slate-100 px-5">
            {TABS.map((t) => {
              const locked = t === 'Quiz' && !activityDone
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-4 py-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${
                    tab === t ? 'text-lime' : locked ? 'text-slate-300' : 'text-slate-500 hover:text-ink'
                  }`}
                >
                  {locked && <Lock size={11} />} {t}
                  {tab === t && <span className="absolute bottom-0 inset-x-3 h-[2.5px] bg-lime rounded-full" />}
                </button>
              )
            })}
          </div>
          <div className="p-6">
            {tab === 'Learn' && <LearnTab session={session} />}
            {tab === 'Activities' && <ActivityTab session={session} />}
            {tab === 'Quiz' && <QuizTab session={session} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SessionModules() {
  return (
    <div className="flex flex-col gap-3.5">
      {sessions.map((s) => <SessionCard key={s.id} session={s} />)}
    </div>
  )
}
