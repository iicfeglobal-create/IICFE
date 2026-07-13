import { useMemo, useState } from 'react'
import { Dices, Heart, X, Check, Lock, Undo2, PartyPopper } from 'lucide-react'

// Interactive activity engines for the 11 Founders Lab sessions.
// Every engine calls onProgress(0..1) as the student advances and
// onComplete() exactly once when the activity is finished.

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function DoneBanner({ text }) {
  return (
    <div className="mt-5 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-[13.5px] font-semibold text-lime">
      <PartyPopper size={18} /> {text}
    </div>
  )
}

/* ------------------------------ 1 · Spinner (Idea Blender) ------------------------------ */

function SpinnerEngine({ config, onProgress, onComplete, done }) {
  const deckNames = Object.keys(config.decks)
  const [combo, setCombo] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [shortlist, setShortlist] = useState([])
  const [sentence, setSentence] = useState(['', '', ''])
  const target = config.shortlistTarget

  const sentenceReady = sentence.every((s) => s.trim().length >= 2)
  const report = (list, sent) => {
    const p = (Math.min(list.length, target) / target) * 0.7 + (sent ? 0.3 : 0)
    onProgress(p)
  }

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    let ticks = 0
    const interval = setInterval(() => {
      setCombo(deckNames.map((d) => config.decks[d][Math.floor(Math.random() * config.decks[d].length)]))
      if (++ticks >= 10) {
        clearInterval(interval)
        setSpinning(false)
      }
    }, 80)
  }

  const keep = () => {
    if (!combo || spinning || shortlist.length >= target) return
    const label = combo.join(' + ')
    if (shortlist.includes(label)) return
    const next = [...shortlist, label]
    setShortlist(next)
    report(next, sentenceReady)
  }

  const finish = () => {
    if (shortlist.length < target || !sentenceReady || done) return
    onProgress(1)
    onComplete()
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {deckNames.map((name, i) => (
          <div key={name} className="rounded-xl border-2 border-slate-200 bg-white p-3 text-center">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">{name}</div>
            <div className={`text-[13px] font-semibold text-ink min-h-[40px] flex items-center justify-center ${spinning ? 'animate-pulse' : ''}`}>
              {combo ? combo[i] : '—'}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={spin} disabled={spinning} className="flex-1 py-3 rounded-xl bg-ink hover:bg-lime text-white text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
          <Dices size={16} /> {spinning ? 'Spinning…' : 'SPIN'}
        </button>
        <button
          onClick={keep}
          disabled={!combo || spinning || shortlist.length >= target}
          className="flex-1 py-3 rounded-xl border-2 border-lime text-lime hover:bg-teal-50 text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
        >
          <Heart size={15} /> Shortlist ({shortlist.length}/{target})
        </button>
      </div>

      {shortlist.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {shortlist.map((s) => (
            <div key={s} className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-700">💡 {s}</div>
          ))}
        </div>
      )}

      {shortlist.length >= target && (
        <div className="mt-5 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="text-[13px] font-bold text-ink mb-3">Now lock your favourite into one sentence:</div>
          <div className="flex flex-wrap items-center gap-2 text-[13.5px] text-slate-700">
            We will help
            <input value={sentence[0]} onChange={(e) => { const s = [...sentence]; s[0] = e.target.value; setSentence(s); report(shortlist, s.every((x) => x.trim().length >= 2)) }} placeholder="who?" className="w-32 px-2 py-1.5 border-b-2 border-lime/40 focus:border-lime outline-none text-center font-semibold" />
            with
            <input value={sentence[1]} onChange={(e) => { const s = [...sentence]; s[1] = e.target.value; setSentence(s); report(shortlist, s.every((x) => x.trim().length >= 2)) }} placeholder="what problem?" className="w-36 px-2 py-1.5 border-b-2 border-lime/40 focus:border-lime outline-none text-center font-semibold" />
            by
            <input value={sentence[2]} onChange={(e) => { const s = [...sentence]; s[2] = e.target.value; setSentence(s); report(shortlist, s.every((x) => x.trim().length >= 2)) }} placeholder="how?" className="w-36 px-2 py-1.5 border-b-2 border-lime/40 focus:border-lime outline-none text-center font-semibold" />
          </div>
          <button onClick={finish} disabled={!sentenceReady || done} className="mt-4 px-5 py-2.5 rounded-xl bg-lime text-white text-[13px] font-bold disabled:opacity-40">
            Lock in my idea
          </button>
        </div>
      )}
      {done && <DoneBanner text="Idea locked! The quiz for this session is now unlocked." />}
    </div>
  )
}

/* ------------------------------ 2 · Binary swipe ------------------------------ */

function BinaryEngine({ config, onProgress, onComplete, done }) {
  const cards = useMemo(() => shuffle(config.cards), [config])
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)

  const answer = (choseRight) => {
    if (feedback || index >= cards.length) return
    const card = cards[index]
    const correct = choseRight === card.right
    if (correct) setScore((s) => s + 1)
    setFeedback({ correct, why: card.why })
  }

  const next = () => {
    const n = index + 1
    setIndex(n)
    setFeedback(null)
    onProgress(n / cards.length)
    if (n >= cards.length && !done) onComplete()
  }

  if (index >= cards.length) {
    return (
      <div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div className="font-heading text-xl font-bold text-ink mb-1">Round complete!</div>
          <div className="text-[13.5px] text-slate-500">You scored {score}/{cards.length}.</div>
        </div>
        <DoneBanner text="Activity complete — the quiz is now unlocked." />
      </div>
    )
  }

  return (
    <div>
      {config.context && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-[12.5px] text-amber-900 font-medium">
          {config.context}
        </div>
      )}
      <div className="text-[12px] text-slate-400 font-semibold mb-3">Card {index + 1} of {cards.length} · Score {score}</div>
      <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white text-center min-h-[110px] flex items-center justify-center">
        <div className="text-[15px] font-semibold text-ink leading-relaxed">{cards[index].text}</div>
      </div>

      {feedback ? (
        <div className={`mt-4 p-4 rounded-xl border text-[13px] ${feedback.correct ? 'bg-teal-50 border-teal-200 text-lime' : 'bg-rose-50 border-rose-400/30 text-rose-600'}`}>
          <div className="font-bold mb-1">{feedback.correct ? '✓ Correct!' : '✗ Not quite.'}</div>
          <div className="text-slate-600">{feedback.why}</div>
          <button onClick={next} className="mt-3 px-4 py-2 rounded-lg bg-ink text-white text-[12.5px] font-bold">
            {index + 1 >= cards.length ? 'Finish' : 'Next card'}
          </button>
        </div>
      ) : (
        <div className="flex gap-3 mt-4">
          <button onClick={() => answer(false)} className="flex-1 py-3.5 rounded-xl border-2 border-rose-400/40 text-rose-600 hover:bg-rose-50 text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors">
            <X size={16} /> {config.leftLabel}
          </button>
          <button onClick={() => answer(true)} className="flex-1 py-3.5 rounded-xl border-2 border-lime/50 text-lime hover:bg-teal-50 text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors">
            <Check size={16} /> {config.rightLabel}
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------ 3 · Bucket sort ------------------------------ */

function BucketEngine({ config, onProgress, onComplete, done }) {
  const items = useMemo(() => (config.gridMode ? config.items : shuffle(config.items)), [config])
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)

  const choose = (bucket) => {
    if (feedback || index >= items.length) return
    const item = items[index]
    const correct = bucket === item.bucket
    if (correct) setScore((s) => s + 1)
    setFeedback({ correct, why: item.why, right: item.bucket })
  }

  const next = () => {
    const n = index + 1
    setIndex(n)
    setFeedback(null)
    onProgress(n / items.length)
    if (n >= items.length && !done) onComplete()
  }

  if (index >= items.length) {
    return (
      <div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div className="font-heading text-xl font-bold text-ink mb-1">All sorted!</div>
          <div className="text-[13.5px] text-slate-500">You placed {score}/{items.length} correctly.</div>
        </div>
        <DoneBanner text="Activity complete — the quiz is now unlocked." />
      </div>
    )
  }

  return (
    <div>
      <div className="text-[12px] text-slate-400 font-semibold mb-3">Item {index + 1} of {items.length} · Score {score}</div>
      <div className="p-5 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 text-center mb-4">
        <div className="text-[14px] font-semibold text-amber-900">{items[index].text}</div>
      </div>

      {feedback ? (
        <div className={`p-4 rounded-xl border text-[13px] ${feedback.correct ? 'bg-teal-50 border-teal-200' : 'bg-rose-50 border-rose-400/30'}`}>
          <div className={`font-bold mb-1 ${feedback.correct ? 'text-lime' : 'text-rose-600'}`}>
            {feedback.correct ? '✓ Correct!' : `✗ It belongs in ${feedback.right}.`}
          </div>
          <div className="text-slate-600">{feedback.why}</div>
          <button onClick={next} className="mt-3 px-4 py-2 rounded-lg bg-ink text-white text-[12.5px] font-bold">
            {index + 1 >= items.length ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div className={`grid gap-2.5 ${config.gridMode ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
          {config.buckets.map((b) => (
            <button
              key={b}
              onClick={() => choose(b)}
              className={`${config.gridMode ? 'py-6' : 'py-4'} px-3 rounded-xl border-2 border-slate-200 hover:border-lime hover:bg-teal-50 text-[12.5px] font-bold text-slate-700 transition-all`}
            >
              {b}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------ 4 · Pick 3 (MVP Slicer) ------------------------------ */

function Pick3Engine({ config, onProgress, onComplete, done }) {
  const [selected, setSelected] = useState([])
  const [locked, setLocked] = useState(false)

  const toggle = (text) => {
    if (locked) return
    setSelected((sel) => {
      let next
      if (sel.includes(text)) next = sel.filter((t) => t !== text)
      else if (sel.length >= 3) return sel // the MVP column refuses a 4th card
      else next = [...sel, text]
      onProgress((next.length / 3) * 0.9)
      return next
    })
  }

  const lockIn = () => {
    if (selected.length !== 3 || locked) return
    setLocked(true)
    onProgress(1)
    if (!done) onComplete()
  }

  const coreSet = config.features.filter((f) => f.core).map((f) => f.text)

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border-2 border-lime/50 bg-teal-50/50">
          <div className="text-[11px] font-bold tracking-widest uppercase text-lime mb-3">MVP — only 3 slots</div>
          <div className="flex flex-col gap-2 min-h-[140px]">
            {selected.map((t) => (
              <button key={t} onClick={() => toggle(t)} className="px-3.5 py-2.5 rounded-xl bg-white border border-lime/40 text-[13px] font-semibold text-ink text-left hover:border-rose-400 transition-colors">
                {t} <span className="text-slate-300 text-[11px]">— tap to remove</span>
              </button>
            ))}
            {Array.from({ length: 3 - selected.length }).map((_, i) => (
              <div key={i} className="px-3.5 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-[12px] text-slate-300 text-center">empty slot</div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">Later — unlimited</div>
          <div className="flex flex-col gap-2">
            {config.features.filter((f) => !selected.includes(f.text)).map((f) => (
              <button key={f.text} onClick={() => toggle(f.text)} disabled={locked} className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-[13px] text-slate-600 text-left hover:border-lime transition-colors disabled:opacity-50">
                {f.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[12px] text-slate-400 italic">{config.coreHint}</div>

      {!locked ? (
        <button onClick={lockIn} disabled={selected.length !== 3} className="mt-4 px-5 py-3 rounded-xl bg-ink hover:bg-lime text-white text-[13.5px] font-bold disabled:opacity-40 flex items-center gap-2 transition-colors">
          <Lock size={14} /> Lock in my MVP
        </button>
      ) : (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-600">
          <span className="font-bold text-ink">Suggested core:</span> {coreSet.join(' · ')}.{' '}
          {selected.filter((t) => coreSet.includes(t)).length === 3
            ? 'You found the exact core — a customer can discover, order and pay. 🎯'
            : 'Compare with your picks: could a customer discover, order AND pay with your three?'}
        </div>
      )}
      {done && <DoneBanner text="MVP locked — the quiz is now unlocked." />}
    </div>
  )
}

/* ------------------------------ 5 · Match quiz (Face of the Brand) ------------------------------ */

function MatchEngine({ config, onProgress, onComplete, done }) {
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [finalAnswer, setFinalAnswer] = useState('')
  const total = config.pairs.length + 1

  const answer = (i) => {
    if (feedback) return
    const pair = config.pairs[index]
    const correct = i === pair.a
    if (correct) setScore((s) => s + 1)
    setFeedback({ correct, right: pair.options[pair.a] })
  }

  const next = () => {
    const n = index + 1
    setIndex(n)
    setFeedback(null)
    onProgress(n / total)
  }

  const finish = () => {
    if (finalAnswer.trim().length < 5 || done) return
    onProgress(1)
    onComplete()
  }

  if (index >= config.pairs.length) {
    return (
      <div>
        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
          <div className="text-[13px] text-slate-500 mb-1">You matched {score}/{config.pairs.length}. Notice — every brand had a human face people follow.</div>
          <div className="font-heading text-[15px] font-bold text-ink mt-3 mb-2">{config.finalPrompt}</div>
          <input
            value={finalAnswer}
            onChange={(e) => setFinalAnswer(e.target.value)}
            placeholder="e.g. Me — because I live this problem every day and my classmates already follow my memes."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-[13.5px] focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20"
          />
          <button onClick={finish} disabled={finalAnswer.trim().length < 5 || done} className="mt-3 px-5 py-2.5 rounded-xl bg-lime text-white text-[13px] font-bold disabled:opacity-40">
            Save my answer
          </button>
        </div>
        {done && <DoneBanner text="Activity complete — the quiz is now unlocked." />}
      </div>
    )
  }

  const pair = config.pairs[index]
  return (
    <div>
      <div className="text-[12px] text-slate-400 font-semibold mb-3">Round {index + 1} of {config.pairs.length} · Score {score}</div>
      <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white text-center mb-4">
        <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Which brand did this person build?</div>
        <div className="font-heading text-xl font-bold text-ink">{pair.prompt}</div>
      </div>
      {feedback ? (
        <div className={`p-4 rounded-xl border text-[13px] ${feedback.correct ? 'bg-teal-50 border-teal-200 text-lime' : 'bg-rose-50 border-rose-400/30 text-rose-600'}`}>
          <div className="font-bold">{feedback.correct ? '✓ Correct!' : `✗ It was ${feedback.right}.`}</div>
          <button onClick={next} className="mt-3 px-4 py-2 rounded-lg bg-ink text-white text-[12.5px] font-bold">Next</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {pair.options.map((o, i) => (
            <button key={o} onClick={() => answer(i)} className="py-3.5 px-3 rounded-xl border-2 border-slate-200 hover:border-lime hover:bg-teal-50 text-[13px] font-semibold text-slate-700 transition-all">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------ 6 · Price slider ------------------------------ */

function SliderEngine({ config, onProgress, onComplete, done }) {
  const { cost, min, max, maxBuyers, tolerance } = config
  const [price, setPrice] = useState(Math.round((min + max) / 2))
  const [result, setResult] = useState(null)

  const buyersAt = (p) => Math.round(maxBuyers * (1 - (p - min) / (max - min)))
  const totalAt = (p) => (p - cost) * buyersAt(p)

  // Best possible total profit across the whole range
  const optimum = useMemo(() => {
    let best = { p: min, total: -Infinity }
    for (let p = min; p <= max; p++) {
      const t = totalAt(p)
      if (t > best.total) best = { p, total: t }
    }
    return best
  }, [config]) // eslint-disable-line react-hooks/exhaustive-deps

  const buyers = buyersAt(price)
  const perUnit = price - cost
  const total = totalAt(price)
  const pct = Math.max(0, Math.min(1, total / optimum.total))

  const lockIn = () => {
    const hit = Math.abs(price - optimum.p) <= tolerance
    setResult(hit)
    if (hit) {
      onProgress(1)
      if (!done) onComplete()
    } else {
      onProgress(pct * 0.9)
    }
  }

  return (
    <div>
      <div className="p-5 rounded-2xl border border-slate-200 bg-white">
        <div className="text-center mb-4">
          <div className="text-3xl mb-1">🧶</div>
          <div className="font-heading text-[15px] font-bold text-ink">{config.product}</div>
          <div className="text-[12px] text-slate-400">Costs ₹{cost} to make</div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={price}
          onChange={(e) => { setPrice(Number(e.target.value)); setResult(null) }}
          className="w-full accent-[#008075]"
        />
        <div className="text-center font-heading text-2xl font-bold text-lime mt-1">₹{price}</div>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          {[['Profit / unit', `₹${perUnit}`], ['Buyers', buyers], ['Total profit', `₹${total}`]].map(([l, v]) => (
            <div key={l} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="font-heading text-[17px] font-bold text-ink">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
            <span>Profit meter</span><span>{Math.round(pct * 100)}% of best possible</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${pct > 0.9 ? 'bg-lime' : pct > 0.6 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${pct * 100}%` }} />
          </div>
        </div>

        <button onClick={lockIn} disabled={done} className="mt-4 w-full py-3 rounded-xl bg-ink hover:bg-lime text-white text-[13.5px] font-bold transition-colors disabled:opacity-50">
          Lock in this price
        </button>

        {result === false && (
          <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[13px] text-amber-900">
            You're leaving profit on the table — {price > optimum.p ? 'too few buyers at this price.' : 'too little profit per unit.'} Keep hunting for the sweet spot!
          </div>
        )}
      </div>
      {done && <DoneBanner text={`Sweet spot found near ₹${optimum.p}! The quiz is now unlocked.`} />}
    </div>
  )
}

/* ------------------------------ 7 · Sequence (Pitch Deck) ------------------------------ */

function SequenceEngine({ config, onProgress, onComplete, done }) {
  const [pool, setPool] = useState(() => shuffle(config.correctOrder))
  const [placed, setPlaced] = useState([])
  const [checked, setChecked] = useState(null)

  const place = (slide) => {
    if (checked) return
    setPool((p) => p.filter((s) => s !== slide))
    setPlaced((pl) => [...pl, slide])
  }

  const undo = () => {
    if (checked || placed.length === 0) return
    const last = placed[placed.length - 1]
    setPlaced((pl) => pl.slice(0, -1))
    setPool((p) => [...p, last])
  }

  const check = () => {
    const wrong = placed.filter((s, i) => s !== config.correctOrder[i])
    const right = placed.filter((s, i) => s === config.correctOrder[i])
    onProgress(right.length / config.correctOrder.length)
    if (wrong.length === 0) {
      setChecked('perfect')
      if (!done) onComplete()
    } else {
      setChecked(null)
      // Keep the correct prefix, return everything after the first mistake to the pool
      const firstWrong = placed.findIndex((s, i) => s !== config.correctOrder[i])
      setPlaced(placed.slice(0, firstWrong))
      setPool((p) => [...p, ...placed.slice(firstWrong)])
    }
  }

  return (
    <div>
      <div className="p-4 rounded-2xl border border-slate-200 bg-white mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400">Your deck order</div>
          <button onClick={undo} disabled={placed.length === 0 || !!checked} className="flex items-center gap-1 text-[12px] font-semibold text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors">
            <Undo2 size={13} /> Undo
          </button>
        </div>
        <div className="flex flex-col gap-1.5 min-h-[60px]">
          {placed.map((s, i) => (
            <div key={s} className="px-3.5 py-2 rounded-lg bg-teal-50 border border-teal-200 text-[13px] font-semibold text-ink flex items-center gap-2">
              <span className="text-lime font-bold w-5">{i + 1}.</span> {s}
              {checked === 'perfect' && <span className="ml-auto text-[11px] text-slate-400 font-normal">{config.whys[s]}</span>}
            </div>
          ))}
          {placed.length === 0 && <div className="text-[12.5px] text-slate-300 text-center py-4">Tap slides below in story order…</div>}
        </div>
      </div>

      {pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {pool.map((s) => (
            <button key={s} onClick={() => place(s)} className="px-3.5 py-2 rounded-lg border-2 border-slate-200 hover:border-lime hover:bg-teal-50 text-[12.5px] font-semibold text-slate-600 transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      {pool.length === 0 && checked !== 'perfect' && (
        <button onClick={check} className="w-full py-3 rounded-xl bg-ink hover:bg-lime text-white text-[13.5px] font-bold transition-colors">
          Check my story order
        </button>
      )}
      {checked !== 'perfect' && placed.length > 0 && pool.length > 0 && (
        <div className="text-[12px] text-slate-400">Place all 10 slides, then check. Wrong slides return to the pool.</div>
      )}
      {done && <DoneBanner text="Perfect pitch spine! The quiz is now unlocked." />}
    </div>
  )
}

/* ------------------------------ 8 · Power quiz (Founder Level Up) ------------------------------ */

function PowerQuizEngine({ config, onProgress, onComplete, done }) {
  const [index, setIndex] = useState(0)
  const [power, setPower] = useState(0)
  const maxPower = config.questions.length * Math.max(...config.points)

  const answer = (optIdx) => {
    if (index >= config.questions.length) return
    const gained = config.points[optIdx]
    setPower((p) => p + gained)
    const n = index + 1
    setIndex(n)
    onProgress(n / config.questions.length)
    if (n >= config.questions.length && !done) onComplete()
  }

  const badge = [...config.badges].reverse().find((b) => power >= b.min) || config.badges[0]

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
          <span>Founder power</span><span>{power}/{maxPower}</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-lime to-teal-400 rounded-full transition-all duration-500" style={{ width: `${(power / maxPower) * 100}%` }} />
        </div>
      </div>

      {index < config.questions.length ? (
        <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white">
          <div className="text-[12px] text-slate-400 font-semibold mb-2">Check {index + 1} of {config.questions.length}</div>
          <div className="text-[15px] font-semibold text-ink mb-4">{config.questions[index]}</div>
          <div className="grid grid-cols-3 gap-2.5">
            {config.options.map((o, i) => (
              <button key={o} onClick={() => answer(i)} className="py-3 rounded-xl border-2 border-slate-200 hover:border-lime hover:bg-teal-50 text-[13px] font-bold text-slate-700 transition-all">
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border-2 border-lime/40 bg-teal-50/50 text-center">
          <div className="text-4xl mb-2">{badge.name === 'Mela Ready' ? '🏆' : badge.name === 'Rising Founder' ? '🚀' : '🌱'}</div>
          <div className="font-heading text-2xl font-bold text-ink mb-1">{badge.name}</div>
          <div className="text-[13.5px] text-slate-600 max-w-sm mx-auto">{badge.nudge}</div>
        </div>
      )}
      {done && <DoneBanner text="Self-check complete — the final quiz is unlocked." />}
    </div>
  )
}

/* --------------------------------- Dispatcher --------------------------------- */

const ENGINES = {
  spinner: SpinnerEngine,
  binary: BinaryEngine,
  bucket: BucketEngine,
  pick3: Pick3Engine,
  match: MatchEngine,
  slider: SliderEngine,
  sequence: SequenceEngine,
  powerquiz: PowerQuizEngine,
}

export default function ActivityPlayer({ activity, onProgress, onComplete, done }) {
  const Engine = ENGINES[activity.engine]
  if (!Engine) return null
  return (
    <div>
      <p className="text-[13px] text-slate-500 mb-5 leading-relaxed">{activity.instructions}</p>
      <Engine config={activity} onProgress={onProgress} onComplete={onComplete} done={done} />
    </div>
  )
}
