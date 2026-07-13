// Gemini API client for the Founders Lab chatbots.
// Set VITE_GEMINI_API_KEY in .env.local to run the bots on live AI;
// without a key the bots automatically use their offline demo engines.
// NOTE: a key bundled into a frontend is visible to anyone with devtools —
// fine for the demo account, but the public launch must proxy through a backend.

const KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash'

export const geminiEnabled = () => !!KEY

// turns: [{ role: 'user' | 'model', text }]
export async function geminiChat(systemPrompt, turns) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
        generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
      }),
    }
  )
  if (!res.ok) throw new Error(`Gemini API error ${res.status}`)
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
  if (!text) throw new Error('Gemini returned an empty response')
  return text
}

export async function geminiGenerate(systemPrompt, userPrompt) {
  return geminiChat(systemPrompt, [{ role: 'user', text: userPrompt }])
}
