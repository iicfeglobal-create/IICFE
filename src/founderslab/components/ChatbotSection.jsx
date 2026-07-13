import { useEffect, useRef, useState } from 'react'
import { X, Send, Sparkles, RotateCcw } from 'lucide-react'
import { chatbots } from '../data/chatbots'
import { geminiEnabled, geminiChat, geminiGenerate } from '../gemini'
import RichText from './RichText'

/* ----------------------------- Chat-style bot ----------------------------- */

function ChatBot({ bot }) {
  const [messages, setMessages] = useState([{ role: 'bot', text: bot.engine.firstMessage }])
  const [state, setState] = useState(bot.engine.start())
  const [live, setLive] = useState(geminiEnabled())
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text || typing || (!live && state.done)) return
    const history = [...messages, { role: 'user', text }]
    setMessages(history)
    setInput('')
    setTyping(true)

    if (live) {
      try {
        const turns = history.map((m) => ({ role: m.role === 'bot' ? 'model' : 'user', text: m.text }))
        const replyText = await geminiChat(bot.systemPrompt, turns)
        setMessages((m) => [...m, { role: 'bot', text: replyText }])
      } catch {
        // Live AI unreachable — restart on the offline demo engine
        setLive(false)
        setState(bot.engine.start())
        setMessages((m) => [
          ...m,
          { role: 'bot', text: '⚠️ Live AI is unavailable right now — switching to offline demo mode.\n\n' + bot.engine.firstMessage },
        ])
      }
      setTyping(false)
      return
    }

    // Offline demo engine, with a small delay so the exchange reads like a conversation
    setTimeout(() => {
      const { state: next, text: replyText } = bot.engine.reply(state, text)
      setState(next)
      setMessages((m) => [...m, { role: 'bot', text: replyText }])
      setTyping(false)
    }, 600 + Math.random() * 500)
  }

  const restart = () => {
    setMessages([{ role: 'bot', text: bot.engine.firstMessage }])
    setState(bot.engine.start())
    setInput('')
  }

  return (
    <div className="flex flex-col h-[520px]">
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-slate-50/60">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed ${
            m.role === 'bot'
              ? 'self-start bg-white border border-slate-200 text-slate-700 rounded-bl-md'
              : 'self-end bg-lime text-white rounded-br-md'
          }`}>
            {m.role === 'bot' ? <RichText text={m.text} /> : m.text}
          </div>
        ))}
        {typing && (
          <div className="self-start px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-400 text-[13px]">
            typing…
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-slate-200 p-3 flex gap-2 bg-white">
        {!live && state.done ? (
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[13px] font-semibold text-slate-600 flex items-center justify-center gap-2 transition-colors">
            <RotateCcw size={14} /> Start a new conversation
          </button>
        ) : (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your answer…"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-[13.5px] focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20"
            />
            <button onClick={send} className="px-4 rounded-xl bg-ink hover:bg-lime text-white transition-colors" aria-label="Send">
              <Send size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/* ----------------------------- Form-style bot ----------------------------- */

function FormBot({ bot }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(bot.fields.map((f) => [f.key, f.type === 'select' ? f.options[0] : '']))
  )
  const [output, setOutput] = useState(null)
  const [generating, setGenerating] = useState(false)

  const ready = bot.fields.every((f) => String(values[f.key]).trim())

  const generate = async () => {
    if (!ready || generating) return
    setGenerating(true)
    setOutput(null)

    if (geminiEnabled()) {
      try {
        const out = await geminiGenerate(bot.systemPrompt, bot.toPrompt(values))
        setOutput(out)
        setGenerating(false)
        return
      } catch {
        // fall through to the offline demo engine
      }
    }

    setTimeout(() => {
      setOutput(bot.generate(values))
      setGenerating(false)
    }, 900)
  }

  return (
    <div className="max-h-[520px] overflow-y-auto p-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {bot.fields.map((f) => (
          <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">{f.label}</label>
            {f.type === 'select' ? (
              <select
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13.5px] bg-white focus:outline-none focus:border-lime capitalize"
              >
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                rows={2}
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13.5px] focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 resize-none"
              />
            ) : (
              <input
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13.5px] focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20"
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={generate}
        disabled={!ready || generating}
        className="mt-5 w-full py-3 rounded-xl bg-ink hover:bg-lime disabled:opacity-40 text-white text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors"
      >
        <Sparkles size={15} /> {generating ? 'Generating…' : 'Generate'}
      </button>

      {output && (
        <div className="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
          <RichText text={output} />
        </div>
      )}
    </div>
  )
}

/* ------------------------------- Section ---------------------------------- */

export default function ChatbotSection() {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {chatbots.map((bot) => {
          const Icon = bot.icon
          return (
            <button
              key={bot.id}
              onClick={() => setActive(bot)}
              className="text-left p-6 rounded-2xl border border-slate-200 bg-white hover:border-lime hover:shadow-card-md transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-lime flex items-center justify-center mb-4 transition-colors">
                <Icon size={19} className="text-lime group-hover:text-white transition-colors" />
              </div>
              <div className="font-heading text-[15.5px] font-bold text-ink mb-1">{bot.name}</div>
              <div className="text-[12.5px] text-lime font-semibold mb-2">{bot.tagline}</div>
              <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-3">{bot.intro}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10.5px] font-bold tracking-wide uppercase text-slate-400">
                  {bot.type === 'chat' ? 'Conversational' : 'Form → Output'}
                </span>
                <span className="text-[10.5px] font-semibold text-slate-300">{bot.model}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bot modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div
            className="w-full max-w-[640px] bg-white rounded-3xl shadow-card-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                  <active.icon size={16} className="text-lime" />
                </div>
                <div>
                  <div className="font-heading text-[15px] font-bold text-ink leading-tight">{active.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {active.type === 'chat' ? 'Conversational chat' : 'Form → output'} · {geminiEnabled() ? 'Gemini AI' : 'offline demo engine'}
                  </div>
                </div>
              </div>
              <button onClick={() => setActive(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {active.type === 'chat' ? <ChatBot key={active.id} bot={active} /> : <FormBot key={active.id} bot={active} />}
          </div>
        </div>
      )}
    </>
  )
}
