import { useState } from 'react'
import { GraduationCap, Briefcase, Rocket, Building2, Globe } from 'lucide-react'

const tabs = [
  { icon: GraduationCap, label: 'Students & Graduates', color: 'bg-lime' },
  { icon: Briefcase,     label: 'Working Professionals', color: 'bg-teal-500/30' },
  { icon: Rocket,        label: 'Aspiring Entrepreneurs', color: 'bg-amber-500/30' },
  { icon: Building2,     label: 'Employers & Corporates', color: 'bg-violet-500/30' },
  { icon: GraduationCap, label: 'Universities & Institutes', color: 'bg-rose-500/30' }
]

export default function AudienceTabs() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-ink border-y border-white/10 py-8">
      <div className="max-w-[1320px] mx-auto px-6">
        <p className="text-center text-[11px] font-bold tracking-[2px] uppercase text-white/30 mb-6">I am a…</p>
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map(({ icon: Icon, label, color }, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-150 cursor-pointer border-2
                ${active === i
                  ? 'bg-lime border-lime text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-lime/50 hover:bg-white/10'
                }`}
            >
              <span className={`w-6 h-6 ${active === i ? 'bg-white/15' : color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={13} className={active === i ? 'text-white' : 'text-white/70'} />
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
