const phases = [
  { num:'1', title:'The Core',           desc:'Singapore HQ, flagship courses, online baseline, initial partnerships.', markets:['Singapore','India','UAE'],        active:true },
  { num:'2', title:'Deepening Roots',    desc:'India expansion, corporate verticals, university tie-ups, placement ecosystem.', markets:['Malaysia','Indonesia','Sri Lanka'], active:false },
  { num:'3', title:'Regional Dominance', desc:'Southeast Asia, Middle East & Africa entry. Licensing model activated.', markets:['Gulf','Africa','S. Asia'],         active:false },
  { num:'4', title:'Global Reach',       desc:'Multi-country campuses, venture incubation arm, global digital credentials.', markets:['Europe','Americas','Global'],      active:false },
]

export default function GlobalExpansion() {
  return (
    <section className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center max-w-[480px] mx-auto mb-14">
          <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-400 mb-3">Global Roadmap</p>
          <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight">
            Building a Truly<br />
            <span className="text-white/30 font-light">Global Institution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map(({ num, title, desc, markets, active }) => (
            <div
              key={num}
              className={`rounded-3xl p-7 flex flex-col hover:-translate-y-1 transition-all duration-200 cursor-default
                ${active ? 'bg-ink' : 'bg-ink border-2 border-white/10 hover:border-lime'}`}
            >
              <div className={`font-heading text-[52px] font-bold leading-none mb-4 ${active ? 'text-lime' : 'text-slate-300'}`}>{num}</div>
              <h4 className={`font-heading text-[17px] font-bold mb-2 ${active ? 'text-white' : 'text-white/70'}`}>{title}</h4>
              <p className={`text-[13px] font-light leading-relaxed flex-1 mb-4 ${active ? 'text-white/55' : 'text-white/35'}`}>{desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {markets.map(m => (
                  <span key={m} className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${active ? 'bg-white/10 text-white/70' : 'bg-white/10 text-white/45'}`}>{m}</span>
                ))}
              </div>
              {active && (
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-lime font-bold">
                  <span className="w-1.5 h-1.5 bg-lime rounded-full blink-dot" />
                  Currently Active
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
