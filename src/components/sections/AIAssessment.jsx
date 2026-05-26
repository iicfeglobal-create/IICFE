import { useState, useRef, useEffect } from 'react'
import { Target, TrendingUp, Building2, ClipboardList, Send, Sparkles, Bot } from 'lucide-react'

const features = [
  { icon: Target,        color: 'bg-lime',        iconColor: 'text-white',    title: 'Reverse-Pedagogy Questioning',  desc: 'The AI poses real-world scenarios. Questions adapt dynamically — deepening where knowledge is strong, pivoting where it is weak.' },
  { icon: TrendingUp,    color: 'bg-teal-500/20',  iconColor: 'text-teal-300', title: 'Live Competency Scoring',    desc: 'Each response scored across 6 dimensions: conceptual depth, practical application, risk awareness, decision-making, communication.' },
  { icon: Building2,     color: 'bg-violet-500/20', iconColor: 'text-violet-300', title: 'Business Simulation Mode', desc: 'Advanced programs place you inside a live business scenario. AI tracks your reasoning quality and decision-making in real time.' },
  { icon: ClipboardList, color: 'bg-amber-500/20',  iconColor: 'text-amber-300', title: 'Certification Outcome Report', desc: 'On completion: full competency breakdown, development recommendations, and an IICFE digital certificate if threshold is met.' },
]

const aiResponses = [
  { keys: ['gap','3%','drop','exposure','lot','loss','2 lots','50','risk'],
    msg: "Good reasoning. Let's break it down further.\n\nA 3% gap-down on 19,450 = ~583 points → opens at ~18,867. With 2 lots × 50 units, your unrealised loss = 583 × 100 = ₹58,300.\n\nFollow-up: Your stop-loss was at ₹19,200 — but the market gapped below it. You experienced slippage. How does gap risk challenge conventional stop-loss strategies, and what alternative would you consider?",
    score: 72 },
  { keys: ['option','hedge','put','buy put','protective','insurance','gap risk'],
    msg: "Excellent — you identified protective puts as a hedge against gap risk. That demonstrates understanding beyond basic stop-loss mechanics.\n\nScenario shift: You're now risk manager at a prop trading firm. A junior trader holds ₹40 lakh in overnight Nifty positions without any hedge. How do you structure a firm-wide policy to prevent this?",
    score: 86 },
  { keys: ['policy','limit','exposure','overnight','var','position limit','margin','approval'],
    msg: "Strong answer. You've demonstrated clear knowledge of institutional risk governance.\n\nAssessment Complete — your session has been evaluated across 6 competency dimensions. You have met the threshold for the Foundation Certificate in Futures Risk Management. Your full competency report is now available in your IICFE dashboard.",
    score: 91 },
]
const fallback = { msg: "Interesting perspective. Let me probe further — how would you quantify the exact risk exposure numerically? Walk me through the calculation step by step.", score: null }

export default function AIAssessment() {
  const [messages, setMessages] = useState([{
    role: 'ai',
    text: "Good morning. I'll be evaluating your understanding of futures trading risk management today. I'll ask questions — your task is to reason through them clearly.\n\nLet's begin. You hold a long position in 2 lots of Nifty Futures at ₹19,450. Each lot = 50 units. Overnight, news causes a 3% gap-down opening. Walk me through your immediate risk exposure and what you should do.",
    score: null,
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  function send() {
    const val = input.trim()
    if (!val || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: val, score: null }])
    setTyping(true)
    const lower = val.toLowerCase()
    const matched = aiResponses.find(r => r.keys.some(k => lower.includes(k))) || fallback
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'ai', text: matched.msg, score: matched.score }])
    }, 1800)
  }

  return (
    <section id="ai-assessment" className="py-20 bg-ink">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* ── HEADER ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">AI-Powered Assessment</p>
            <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-4">
              The IICFE Socratic<br />
              <span className="text-white/30 font-light">Assessment Engine</span>
            </h2>
            <p className="text-[16px] text-white/50 leading-relaxed">
              The AI doesn't present content — it questions you. Modelled on Socratic dialogue,
              the system probes your understanding through adaptive questioning and evaluates
              depth, not memorisation.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-64 shadow-card-md">
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop"
              alt="AI technology and digital assessment interface"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">Adaptive · Socratic · AI-examined</div>
                <div className="text-[11px] text-white/70">Not a multiple-choice test — a live reasoning assessment</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES + CHATBOT ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, color, iconColor, title, desc }) => (
              <div key={title} className="bg-ink-soft rounded-2xl p-6 border-2 border-white/10 hover:border-lime hover:shadow-card-md transition-all duration-200">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <h4 className="font-heading text-[15px] font-bold text-white mb-2 leading-snug">{title}</h4>
                <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── CHATBOT ─────────────────────────── */}
          <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-card-lg bg-ink-soft">

            {/* Chatbot header */}
            <div className="bg-ink px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-white">IICFE Socratic Assessor</div>
                <div className="text-[11px] text-white/65 font-medium">Adaptive Examination Engine · v2.4</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[11px] text-white/65 font-medium">
                <span className="w-2 h-2 bg-lime rounded-full blink-dot" />
                Live Assessment
              </div>
            </div>

            {/* Course tag */}
            <div className="bg-ink px-5 py-2.5 text-[12px] border-b border-white/10">
              <span className="text-white/40">Program: </span>
              <span className="font-bold text-white">Certified Financial Markets Professional</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-white/40">Module 2: Risk Management</span>
            </div>

            {/* Messages area */}
            <div className="chat-scroll bg-ink min-h-[260px] max-h-[340px] overflow-y-auto p-5 flex flex-col gap-4">
              {messages.map(({ role, text, score }, i) => (
                <div key={i} className={`flex flex-col max-w-[90%] ${role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/30">
                    {role === 'ai' ? 'IICFE AI Assessor' : 'You'}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed
                    ${role === 'ai'
                      ? 'bg-ink-soft border border-white/10 text-white/80 rounded-tl-sm shadow-card'
                      : 'bg-lime text-white rounded-tr-sm'}`}
                  >
                    {text.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-1.5' : ''}>{line}</p>
                    ))}
                    {score && (
                      <div className="mt-3 p-3 bg-lime/20 rounded-xl border border-lime/40">
                        <div className="flex justify-between text-[12px] mb-2 font-bold text-white">
                          <span>Session Score</span><span>{score}%</span>
                        </div>
                        <div className="h-2 bg-lime/30 rounded-full overflow-hidden">
                          <div className="h-full bg-lime rounded-full score-fill" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex flex-col self-start items-start">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/30">IICFE AI Assessor</div>
                  <div className="bg-ink-soft border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center shadow-card">
                    <span className="w-2 h-2 bg-white/30 rounded-full dot-bounce" />
                    <span className="w-2 h-2 bg-white/30 rounded-full dot-bounce-2" />
                    <span className="w-2 h-2 bg-white/30 rounded-full dot-bounce-3" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input row */}
            <div className="bg-ink-soft px-4 py-3.5 border-t border-white/10 flex gap-2.5 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type your answer and press Enter…"
                className="flex-1 px-4 py-2.5 bg-white/10 border-2 border-white/10 focus:border-lime focus:bg-white/15 rounded-full text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors"
              />
              <button
                onClick={send}
                aria-label="Send message"
                className="w-10 h-10 bg-lime hover:bg-lime-dark text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
              >
                <Send size={15} />
              </button>
            </div>

            <div className="px-5 py-2.5 bg-ink border-t border-white/10 text-[11px] text-white/30 text-center font-medium">
              IICFE Socratic AI · Adaptive assessment powered by IICFE Examination Engine
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
