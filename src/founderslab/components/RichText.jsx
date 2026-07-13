// Minimal renderer for the bots' markdown-ish output (headings, bold, bullets).
function Bold({ text }) {
  const parts = text.split('**')
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : <span key={i}>{part}</span>))
}

export default function RichText({ text }) {
  return (
    <div className="flex flex-col gap-1.5">
      {text.split('\n').map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-1" />
        if (trimmed.startsWith('# ')) {
          return <div key={i} className="font-heading text-[16px] font-bold text-ink mt-1"><Bold text={trimmed.slice(2)} /></div>
        }
        if (trimmed.startsWith('•') || trimmed.startsWith('*Why') || trimmed.startsWith('*Hook') || trimmed.startsWith('*Value') || trimmed.startsWith('*CTA')) {
          const clean = trimmed.replace(/^\*(.*)\*$/s, '$1')
          return <div key={i} className="pl-3 text-[13.5px] leading-relaxed"><Bold text={clean.startsWith('•') ? clean : '· ' + clean} /></div>
        }
        return <div key={i} className="text-[13.5px] leading-relaxed"><Bold text={trimmed} /></div>
      })}
    </div>
  )
}
