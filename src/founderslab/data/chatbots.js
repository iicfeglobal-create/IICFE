// The six Founders Lab chatbots, per "The Founders Lab Chatbots.docx".
// Demo build: each bot runs on a local rule engine so it works without an API
// key. When this goes live the engines swap for real model calls
// (Haiku 4.5 / Sonnet 4.6 per the spec) behind a backend.

import { MessageCircle, Lightbulb, Presentation, Search, Landmark, Megaphone } from 'lucide-react'

/* ---------------------------------- helpers ---------------------------------- */

const pick = (arr, seed) => arr[Math.abs(seed) % arr.length]
const seedFrom = (str) => str.split('').reduce((s, c) => s + c.charCodeAt(0), 0)

/* ------------------------------ 1 · Problem Discovery ------------------------------ */

const discoveryQuestions = [
  { key: 'grade', q: "Hi! I'm your Problem Discovery guide. Before we dig in — which class are you in?" },
  { key: 'interests', q: 'Nice! What do you love spending time on — hobbies, games, sports, anything?' },
  { key: 'schoolPain', q: "Let's talk about your day. What's one thing at school that regularly frustrates you or wastes your time?" },
  { key: 'homePain', q: 'And at home — is there a chore, routine or situation that always feels harder than it should be?' },
  { key: 'friendsPain', q: 'What do your friends complain about the most? Sometimes their problems are the best startup ideas.' },
  { key: 'moneyPain', q: 'Think about money for a second — is there anything you or your family find expensive, confusing or unfair?' },
  { key: 'lastTry', q: "Last one: have you or anyone around you tried to fix any of these problems? What happened?" },
]

const problemDiscoveryBot = {
  id: 'problem-discovery',
  name: 'Problem Discovery Bot',
  tagline: 'Find a problem worth solving',
  type: 'chat',
  icon: MessageCircle,
  model: 'Haiku 4.5',
  intro: 'A warm interviewer that asks one question at a time and never suggests a problem for you. Ends by naming your problem back to you as a clean 2-sentence statement for your Idea Canvas.',
  systemPrompt:
    'You are the Problem Discovery Bot for The Founders Lab, a startup program for school students (class 8-12). ' +
    'You are a warm, curious interviewer. Ask exactly ONE question per message, never more. NEVER suggest a problem for the student — your job is to draw problems out of THEIR life. ' +
    'Flow: first learn their grade, then their interests/hobbies, then ask 5-6 good follow-up questions about what frustrates them at school, home, with friends and around money. ' +
    'Good questions ask about the past and real behaviour (Mom Test style). Keep every message short (2-3 sentences max) and age-appropriate. ' +
    'When you have enough, END by naming the problem back to them as a clean 2-sentence problem statement they can copy into their Idea Canvas, clearly marked.',
  engine: {
    start: () => ({ step: 0, answers: {} }),
    firstMessage: discoveryQuestions[0].q,
    reply: (state, userText) => {
      const answers = { ...state.answers, [discoveryQuestions[state.step].key]: userText.trim() }
      const next = state.step + 1
      if (next < discoveryQuestions.length) {
        const ack = pick(
          ['Got it.', 'Interesting — noted.', 'That tells me a lot.', 'Okay, I hear you.', 'That sounds real.'],
          seedFrom(userText)
        )
        return { state: { step: next, answers }, text: `${ack} ${discoveryQuestions[next].q}` }
      }
      const pain = answers.schoolPain?.length >= (answers.homePain?.length || 0) ? answers.schoolPain : answers.homePain
      const statement =
        `Here's the problem I heard from you, named back in two sentences:\n\n` +
        `"Students like me (class ${answers.grade || '—'}) struggle with ${pain || 'a recurring everyday frustration'}. ` +
        `Today the only options are to put up with it or work around it — ${answers.lastTry && !/no|nothing|never/i.test(answers.lastTry) ? 'and even the fixes people tried (' + answers.lastTry + ') haven’t really solved it' : 'and nobody around us has properly solved it yet'}."\n\n` +
        `Copy this into your Idea Canvas — this is the seed of your startup. 🌱`
      return { state: { step: next, answers, done: true }, text: statement, done: true }
    },
  },
}

/* ------------------------------ 2 · Idea Generator ------------------------------ */

const ideaTemplates = {
  edtech: [
    ['StudyStreak', 'a {format} that turns revision into daily streak challenges for {who}', 'streaks are already a habit teens keep — homework can borrow that psychology'],
    ['DoubtDrop', 'a {format} where {who} drop a photo of a doubt and get a peer explanation in minutes', 'peer explanations feel safer than asking in class'],
    ['SkillSwap', 'a {format} where {who} teach each other one skill for one skill, no money involved', 'everyone has one thing they can teach — supply is free'],
  ],
  food: [
    ['TiffinTracker', 'a {format} that lets {who} pre-order from nearby home kitchens', 'home cooks have spare capacity and buyers want non-mess food'],
    ['ZeroPlate', 'a {format} that matches end-of-day surplus food from canteens to {who} at a discount', 'food that would be thrown away becomes the cheapest meal in town'],
    ['SnackBox', 'a {format} of weekly healthy snack boxes curated for {who}', 'parents pay for healthy; kids stay for taste'],
  ],
  environment: [
    ['BinBuddy', 'a {format} that rewards {who} with points for correctly segregated waste', 'gamified sorting fixes the habit where lectures failed'],
    ['GreenRoute', 'a {format} that shows {who} the lowest-pollution walking or cycling route', 'health-conscious users already track steps — add air to the map'],
    ['RefillMap', 'a {format} mapping every water-refill point near {who} to kill single-use bottles', 'the infrastructure exists, it just isn’t discoverable'],
  ],
  sport: [
    ['TurfTime', 'a {format} where {who} find, split and book empty turf slots together', 'empty slots are wasted inventory; groups make them affordable'],
    ['FormCheck', 'a {format} where {who} upload a 10-second clip and get basic form feedback', 'coaching is expensive; a first-pass check is enough for beginners'],
    ['LocalLeague', 'a {format} that organises weekend mini-leagues for {who} in their own colony', 'people don’t need stadiums, they need fixtures'],
  ],
}

const ideaGeneratorBot = {
  id: 'idea-generator',
  name: 'Idea Generator',
  tagline: '5–6 tailored startup ideas',
  type: 'form',
  icon: Lightbulb,
  model: 'Haiku 4.5',
  intro: 'Clicks only, no typing. Pick a sector, an audience, a format and a level — get back 5–6 age-appropriate, buildable-by-students ideas, each with a one-line "why it could work".',
  systemPrompt:
    'You are the Idea Generator for The Founders Lab, a startup program for school students (class 8-12). ' +
    'Generate exactly 5-6 startup ideas that are age-appropriate and genuinely buildable by school students (no deep tech, no licenses, no large capital). ' +
    'Fixed output shape: a numbered list where each idea is ONE line (name + what it does for whom), followed by one line "Why it could work: ...". ' +
    'For advanced level, add one line "Why now: ..." per idea. End with a reminder to refine the favourite into: "We will help ___ with ___ by ___."',
  toPrompt: (v) => `Sector: ${v.sector}. Target user: ${v.who}. Format: ${v.format}. Student level: ${v.level}.`,
  fields: [
    { key: 'sector', label: 'Sector', type: 'select', options: ['edtech', 'food', 'environment', 'sport'] },
    { key: 'who', label: "Who it's for", type: 'select', options: ['students', 'parents', 'shopkeepers', 'senior citizens'] },
    { key: 'format', label: 'Format', type: 'select', options: ['app', 'physical product', 'service'] },
    { key: 'level', label: 'Level', type: 'select', options: ['beginner', 'advanced'] },
  ],
  generate: (v) => {
    const base = ideaTemplates[v.sector] || ideaTemplates.edtech
    const extra = Object.entries(ideaTemplates)
      .filter(([k]) => k !== v.sector)
      .flatMap(([, t]) => t)
      .slice(0, v.level === 'advanced' ? 3 : 2)
    const all = [...base, ...extra]
    const lines = all.map(([name, what, why], i) => {
      const desc = what.replaceAll('{format}', v.format).replaceAll('{who}', v.who)
      const advanced = v.level === 'advanced' ? `\n   *Why now:* the tools to build this got cheap only in the last 2 years.` : ''
      return `**${i + 1}. ${name}** — ${desc}.\n   *Why it could work:* ${why}.${advanced}`
    })
    return `Here are ${all.length} ideas for **${v.who}** in **${v.sector}** as a **${v.format}**:\n\n${lines.join('\n\n')}\n\nSwipe one into your shortlist and refine it with the sentence: *"We will help ___ with ___ by ___."*`
  },
}

/* ------------------------------ 3 · Pitch Deck Generator ------------------------------ */

const pitchDeckBot = {
  id: 'pitch-deck',
  name: 'Pitch Deck Generator',
  tagline: 'Your full 10-slide outline',
  type: 'form',
  icon: Presentation,
  model: 'Sonnet 4.6',
  intro: 'Give it your startup basics and it returns the exact 10-slide structure from the session plan — one titled block per slide with 2–3 points each.',
  systemPrompt:
    'You are the Pitch Deck Generator for The Founders Lab, a startup program for school students. ' +
    'Given a startup\'s basics, produce a full 10-slide deck outline using EXACTLY this slide order: ' +
    '1 Problem, 2 Solution, 3 Market, 4 Product, 5 Traction, 6 Business Model, 7 Competition, 8 Team, 9 The Ask, 10 Vision. ' +
    'Output one titled block per slide ("**1 · Problem**" style) with 2-3 concrete bullet points each, tailored to the student\'s inputs. Keep language simple, punchy and age-appropriate.',
  toPrompt: (v) => `Startup name: ${v.name}. Problem: ${v.problem}. Solution: ${v.solution}. Customer: ${v.customer}. How it makes money: ${v.revenue}.`,
  fields: [
    { key: 'name', label: 'Startup name', type: 'text', placeholder: 'e.g. TiffinTracker' },
    { key: 'problem', label: 'The problem (1–2 lines)', type: 'textarea' },
    { key: 'solution', label: 'The solution (1–2 lines)', type: 'textarea' },
    { key: 'customer', label: 'Who the customer is', type: 'text' },
    { key: 'revenue', label: 'How it makes money', type: 'text', placeholder: 'e.g. 10% commission per order' },
  ],
  generate: (v) => {
    const slides = [
      ['1 · Problem', [`${v.problem}`, 'Show one real person who has this problem — a face, not a statistic.', 'End with: "and today, there is no good option."']],
      ['2 · Solution', [`${v.solution}`, `Show ${v.name} in one screen or one photo.`, 'One sentence: what changes for the customer the day they use it.']],
      ['3 · Market', [`Everyone like your customer: ${v.customer}.`, 'Estimate: how many exist in your city → your state → India.', 'Keep one honest number, not three inflated ones.']],
      ['4 · Product', ['Walk through the 3 MVP features only (the ones that survived the MVP Slicer).', 'Show, don’t describe — screenshots or a paper prototype.']],
      ['5 · Traction', ['Anything real: interviews done, waitlist signups, first users, a pilot school.', 'If you have none yet, show your validation evidence from the Mom Test interviews.']],
      ['6 · Business Model', [`${v.revenue}.`, 'One simple diagram: money in → what it costs → what you keep.']],
      ['7 · Competition', ['Your 2×2 plot from the Competitor Plotter.', `Name the gap ${v.name} owns — the empty square on the map.`]],
      ['8 · Team', ['Who you are and the one unfair advantage each member brings.', 'Why THIS team will out-learn everyone else on this problem.']],
      ['9 · The Ask', ['What you need next: mentorship, a pilot classroom, ₹X for materials.', 'Be specific — vague asks get polite nods, specific asks get help.']],
      ['10 · Vision', [`If ${v.name} works, what does the world look like in 5 years?`, 'One line. Make them remember it as they walk out.']],
    ]
    return `# ${v.name} — 10-Slide Pitch Deck\n\n` + slides.map(([t, pts]) => `**${t}**\n${pts.map((p) => `• ${p}`).join('\n')}`).join('\n\n')
  },
}

/* ------------------------------ 4 · Competitor Finder ------------------------------ */

const competitorSets = {
  edtech: [['BYJU’S / Toppr', 'direct'], ['Khan Academy', 'direct'], ['YouTube study channels', 'indirect'], ['Private tuition centres', 'indirect']],
  food: [['Zomato / Swiggy', 'direct'], ['Local dabbawala networks', 'direct'], ['School/office canteens', 'indirect'], ['Home cooking (doing nothing)', 'indirect']],
  environment: [['Recykal', 'direct'], ['Local kabadiwala network', 'direct'], ['Municipal collection', 'indirect'], ['Ignoring the problem', 'indirect']],
  sport: [['Playo / Hudle', 'direct'], ['Sports academies', 'direct'], ['School PE periods', 'indirect'], ['WhatsApp groups organising games', 'indirect']],
  other: [['The biggest national player in your space', 'direct'], ['The local/offline way people solve it today', 'direct'], ['DIY / doing nothing', 'indirect'], ['WhatsApp + spreadsheets', 'indirect']],
}

const competitorFinderBot = {
  id: 'competitor-finder',
  name: 'Competitor Finder',
  tagline: 'Direct vs indirect + your gap',
  type: 'form',
  icon: Search,
  model: 'Haiku 4.5 + Web Search',
  intro: 'Describe your idea and sector — get a framed list of direct vs indirect competitors, a 2×2 positioning summary, and the likely gap for your startup. (Demo mode uses a curated sector database; the live version searches the web for real, current companies.)',
  systemPrompt:
    'You are the Competitor Finder for The Founders Lab, a startup program for school students in India. ' +
    'Given a startup idea and sector, list real, currently existing companies only — NEVER invent companies. Prefer well-known Indian players. ' +
    'Output: a short list of direct competitors (same problem, same way), then indirect competitors (different way, or the customer\'s current habit), ' +
    'then a brief 2x2 positioning summary on two axes customers care about, and finish with the likely market gap this startup could own.',
  toPrompt: (v) => `Startup idea: ${v.idea}. Sector: ${v.sector}.`,
  fields: [
    { key: 'idea', label: 'Your startup idea (1–2 lines)', type: 'textarea' },
    { key: 'sector', label: 'Sector', type: 'select', options: ['edtech', 'food', 'environment', 'sport', 'other'] },
  ],
  generate: (v) => {
    const comps = competitorSets[v.sector] || competitorSets.other
    const direct = comps.filter(([, t]) => t === 'direct').map(([n]) => n)
    const indirect = comps.filter(([, t]) => t === 'indirect').map(([n]) => n)
    return (
      `**Competitor scan for:** *${v.idea}*\n\n` +
      `**Direct competitors** (solve the same problem, the same way):\n${direct.map((d) => `• ${d}`).join('\n')}\n\n` +
      `**Indirect competitors** (solve it differently — or the customer just puts up with it):\n${indirect.map((d) => `• ${d}`).join('\n')}\n\n` +
      `**2×2 positioning (Price vs Personalisation):**\n` +
      `• Big players sit at **high reach, low personalisation** — they serve everyone, so they serve no one specifically.\n` +
      `• Local/offline options sit at **high personalisation, low scale** — great service, can’t grow.\n\n` +
      `**Your likely gap →** the *affordable + personal* corner: as focused as the local option, as convenient as the big app. In your pitch, claim that empty square and say why the big players can’t easily follow you there.`
    )
  },
}

/* ------------------------------ 5 · Shark Tank Practice ------------------------------ */

const sharkQuestions = [
  { key: 'market', q: 'Interesting pitch. First question: how many people actually have this problem — and how many of them can you reach in year one? Give me a number, even a rough one.' },
  { key: 'money', q: "Let's talk money. Who pays you, how much, and how often? Walk me through one transaction." },
  { key: 'whyyou', q: 'There are smarter, richer teams out there. Why are YOU the team that wins this market?' },
  { key: 'competition', q: "If this works, a big player copies you in six months. What's your moat — the thing they can't copy?" },
  { key: 'traction', q: 'Last one. What have you actually DONE so far — interviews, users, a prototype? Evidence, not intentions.' },
]

const sharkTankBot = {
  id: 'shark-tank',
  name: 'Shark Tank Practice Bot',
  tagline: 'Pitch. Defend. Improve.',
  type: 'chat',
  icon: Landmark,
  model: 'Haiku 4.5',
  intro: "Paste or type your pitch, then survive the investor's questions — tough but fair, never humiliating. Ends with 3 strengths and 2 things to tighten before the real pitch.",
  systemPrompt:
    'You are the Shark Tank Practice Bot for The Founders Lab, a startup program for school students. ' +
    'Persona: a sharp but encouraging investor. The student opens with their pitch; you then ask tough-but-fair questions ONE at a time, covering: market size, how it makes money, why this team, competition/moat, and traction/evidence. ' +
    'Never humiliate — push hard on substance, stay warm in tone, and praise specificity (numbers, real interviews). Keep each message short. ' +
    'After about 5 questions, END the round with a clearly formatted verdict: exactly 3 strengths and 2 things to tighten before the real pitch.',
  engine: {
    start: () => ({ step: -1, answers: {} }),
    firstMessage: "Welcome to the tank. 🦈 I'm your practice investor. Give me your pitch — the problem, your solution, and why it matters. Take your time, then hit send.",
    reply: (state, userText) => {
      if (state.step === -1) {
        return {
          state: { step: 0, answers: { pitch: userText } },
          text: `Okay, I've heard the pitch. Now let's see if it holds up.\n\n${sharkQuestions[0].q}`,
        }
      }
      const answers = { ...state.answers, [sharkQuestions[state.step].key]: userText.trim() }
      const next = state.step + 1
      if (next < sharkQuestions.length) {
        const hasNumbers = /\d/.test(userText)
        const ack = hasNumbers
          ? pick(['Good — you came with numbers.', 'Specific. I like specific.', 'That’s a real answer.'], seedFrom(userText))
          : pick(['Hmm. A bit vague — but let’s keep moving.', 'I’ll push you on that later. Next.', 'You’ll need to sharpen that.'], seedFrom(userText))
        return { state: { step: next, answers }, text: `${ack}\n\n${sharkQuestions[next].q}` }
      }
      const numbered = Object.values(answers).filter((a) => /\d/.test(a)).length
      const longAnswers = Object.values(answers).filter((a) => a.length > 80).length
      const strengths = [
        numbered >= 2 ? 'You back claims with numbers — investors trust founders who count.' : 'You clearly understand the problem — your pitch came from a real place.',
        longAnswers >= 2 ? 'You give complete answers instead of one-liners; that reads as preparation.' : 'You answer fast and directly — that confidence carries a room.',
        'You stayed calm under five rounds of pressure. Most first-timers crack by question three.',
      ]
      const tighten = [
        numbered < 2 ? 'Add numbers: market size, price, even a rough count of interviews done.' : 'Rehearse your opening line until it lands in under 10 seconds.',
        answers.competition.length < 60 ? 'Your moat answer was thin — decide what you have that a copycat can’t buy.' : 'Trim each answer to its strongest 2 sentences; sharp beats long.',
      ]
      return {
        state: { step: next, answers, done: true },
        text:
          `That's the round. Here's my verdict:\n\n**3 strengths:**\n${strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
          `**2 things to tighten before the real pitch:**\n${tighten.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
          `Fix those two and come pitch me again. I'm not saying I'm in… but I didn't say I'm out. 🦈`,
        done: true,
      }
    },
  },
}

/* ------------------------------ 6 · Marketing Content Bot ------------------------------ */

const marketingBot = {
  id: 'marketing-content',
  name: 'Marketing Content Bot',
  tagline: 'Captions + 4-week calendar',
  type: 'form',
  icon: Megaphone,
  model: 'Haiku 4.5',
  intro: 'Feed it your startup, product, customer and tone — get 3 caption options built on the Hook → Value → CTA rule, plus a ready 4-week content calendar from Session 7.',
  systemPrompt:
    'You are the Marketing Content Bot for The Founders Lab, a startup program for school students. ' +
    'Every caption you write follows the Hook → Value → CTA rule, labelled as such. ' +
    'Output: exactly 3 caption options in the requested tone, then a 4-week content calendar following this arc — Week 1 tease the PROBLEM, Week 2 introduce the founder\'s face (people follow people), Week 3 reveal the product in action, Week 4 launch with countdown and CTAs. ' +
    'Keep it teen-friendly, Indian-social-media savvy, and practical enough to post as-is.',
  toPrompt: (v) => `Startup name: ${v.name}. Product: ${v.product}. Target customer: ${v.customer}. Tone: ${v.tone}.`,
  fields: [
    { key: 'name', label: 'Startup name', type: 'text' },
    { key: 'product', label: 'What the product is', type: 'text' },
    { key: 'customer', label: 'Target customer', type: 'text' },
    { key: 'tone', label: 'Tone', type: 'select', options: ['fun', 'serious', 'bold'] },
  ],
  generate: (v) => {
    const hooks = {
      fun: [`POV: you just discovered ${v.product} exists 🤯`, `We made ${v.product} so you don't have to suffer anymore 😌`, `Tell us you need ${v.name} without telling us you need ${v.name}…`],
      serious: [`Every day, ${v.customer} lose time to a problem nobody talks about.`, `${v.name} exists for one reason: ${v.customer} deserve better.`, `The numbers don't lie — ${v.customer} needed ${v.product} yesterday.`],
      bold: [`${v.customer}, stop settling. ${v.name} is here.`, `Everyone accepted the problem. We didn't. Meet ${v.product}.`, `The old way is dead. ${v.name} killed it.`],
    }
    const captions = (hooks[v.tone] || hooks.fun).map(
      (hook, i) =>
        `**Option ${i + 1}**\n*Hook:* ${hook}\n*Value:* ${v.product} — built specifically for ${v.customer}.\n*CTA:* ${['Follow for the launch 🚀', 'Tag someone who needs this 👇', 'Link in bio — first 50 get early access.'][i]}`
    )
    const calendar = [
      ['Week 1 · Tease', 'Post the PROBLEM, not the product. Relatable memes/stories about the pain point. Goal: "ugh, so true" comments.'],
      ['Week 2 · Face', `Introduce the founder — why YOU started ${v.name}. People follow people, not logos.`],
      ['Week 3 · Reveal', `Show ${v.product} in action. Demo clips, before/after, first reactions.`],
      ['Week 4 · Launch', 'Countdown + launch day + first-user shoutouts. CTA in every post.'],
    ]
    return (
      `# ${v.name} — Marketing Kit (${v.tone} tone)\n\n**3 caption options (Hook → Value → CTA):**\n\n${captions.join('\n\n')}\n\n` +
      `**Your 4-week content calendar:**\n\n${calendar.map(([w, d]) => `**${w}** — ${d}`).join('\n\n')}`
    )
  },
}

export const chatbots = [
  problemDiscoveryBot,
  ideaGeneratorBot,
  pitchDeckBot,
  competitorFinderBot,
  sharkTankBot,
  marketingBot,
]
