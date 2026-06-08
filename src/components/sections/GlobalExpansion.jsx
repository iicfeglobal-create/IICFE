const phases = [
  { num: '01', title: 'The Foundation', desc: 'Establishing the IICFE standard. Flagship certifications launched, examination infrastructure built, and the first cohort of accredited institutions onboarded.', markets: ['Singapore', 'India', 'UAE'], active: true },
  { num: '02', title: 'Deepening Roots', desc: 'Expanding the partner network across key markets. Corporate training verticals activated. University integrations and placement ecosystems come online.', markets: ['Malaysia', 'Indonesia', 'Sri Lanka'], active: false },
  { num: '03', title: 'Regional Dominance', desc: 'The IICFE licensing model scales across new regions. More institutions, more candidates, one uncompromising standard.', markets: ['Gulf', 'Africa', 'S. Asia'], active: false },
  { num: '04', title: 'Global Reach', desc: 'A truly borderless institution. Multi-market delivery, a venture incubation arm, and IICFE credentials recognised as the definitive professional standard worldwide.', markets: ['Europe', 'Americas', 'Global'], active: false },
]

export default function GlobalExpansion() {
  return (
    <section className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-[480px] mx-auto mb-16">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-lime mb-3">Global Roadmap</p>
          <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight">
            Building a Standard<br />
            <span className="text-white/25 font-light">That Travels the World.</span>
          </h2>
        </div>

        {/* Timeline connector */}
        <div className="relative">
          {/* Background connector line */}
          <div className="hidden lg:block absolute top-[38px] left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-px bg-white/8 z-0" />
          {/* Active fill — spans first phase dot */}
          <div className="hidden lg:block absolute top-[38px] left-[calc(12.5%+12px)] w-[calc(25%-24px)] h-px bg-lime z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative z-20">
            {phases.map(({ num, title, desc, markets, active }) => (
              <div key={num} className="px-4">

                {/* Dot */}
                <div className="flex justify-center mb-7">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    active
                      ? 'bg-lime border-lime ring-4 ring-lime/15'
                      : 'bg-ink-soft border-white/15'
                  }`} />
                </div>

                {/* Card */}
                <div className={`rounded-2xl p-6 h-full flex flex-col transition-all duration-200 ${
                  active
                    ? 'bg-ink border border-lime/25 hover:-translate-y-1'
                    : 'bg-white/[0.03] border border-white/7 hover:border-white/15 hover:-translate-y-1'
                }`}>
                  {/* Phase label */}
                  <p className={`text-[10.5px] font-bold tracking-[1.5px] uppercase mb-3 ${active ? 'text-lime' : 'text-white/20'}`}>
                    Phase {num}
                  </p>

                  {/* Big number */}
                  <div className={`font-heading text-[56px] font-extrabold leading-none mb-3 ${active ? 'text-lime' : 'text-white/8'}`}>
                    {num.replace(/^0/, '')}
                  </div>

                  {/* Title */}
                  <h4 className={`font-heading text-[16px] font-bold mb-2.5 ${active ? 'text-white' : 'text-white/45'}`}>
                    {title}
                  </h4>

                  {/* Description */}
                  <p className={`text-[12.5px] font-light leading-relaxed flex-1 mb-4 ${active ? 'text-white/50' : 'text-white/22'}`}>
                    {desc}
                  </p>

                  {/* Market tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {markets.map(m => (
                      <span
                        key={m}
                        className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${
                          active ? 'bg-lime/10 text-lime/80' : 'bg-white/5 text-white/30'
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Active badge */}
                  {active && (
                    <div className="mt-4 pt-4 border-t border-lime/15 flex items-center gap-1.5 text-[10.5px] font-bold text-lime tracking-wide">
                      <span className="w-1.5 h-1.5 bg-lime rounded-full blink-dot" />
                      Currently active
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
