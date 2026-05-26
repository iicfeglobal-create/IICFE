const levels = [
  { num:'3',  credits:'Credits · 45 Hours',    level:'Foundation',   desc:'Introductory professional competency. Awareness workshops, 1-day and 1-week programs.', bg:'bg-white/10', num_color:'text-white/40' },
  { num:'9',  credits:'Credits · 1–3 Months',  level:'Practitioner', desc:'Practical employability capability. Job-ready professional certifications.', bg:'bg-teal-500/20', num_color:'text-teal-300' },
  { num:'12', credits:'Credits · 3–4 Months',  level:'Specialist',   desc:'Advanced domain specialisation. Industry-recognised expertise credential.', bg:'bg-violet-500/20', num_color:'text-violet-300' },
  { num:'15', credits:'Credits · 3–6 Months',  level:'Expert',       desc:'High-level industry mastery. Global professional designation equivalent.', bg:'bg-lime', num_color:'text-white', featured:true },
]

const streams = ['FinTech','Financial Markets','Fraud Examination','Cyber Security','Entrepreneurship','Startup Management','Commerce Operations','Digital Business','Data Analytics','AI in Business']

export default function CreditFramework() {
  return (
    <section id="credits" className="py-20 bg-ink">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">Credit Framework</p>
            <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight">
              Stack Credits.<br />
              <span className="text-white/30 font-light">Earn Designations.</span>
            </h2>
          </div>
          <p className="text-[15px] text-white/45 font-light leading-relaxed max-w-[400px]">
            Each 3-credit program contributes toward a recognised professional designation.
            Progress within any stream at your own pace.
          </p>
        </div>

        {/* Level cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {levels.map(({ num, credits, level, desc, bg, num_color, featured }) => (
            <div key={level} className={`${bg} rounded-3xl p-7 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-200`}>
              {featured && (
                <span className="absolute top-4 right-4 bg-ink text-lime text-[10px] font-bold px-2.5 py-1 rounded-full">Highest</span>
              )}
              <div className={`font-heading text-[60px] font-bold ${num_color} leading-none mb-1`}>{num}</div>
              <div className={`text-[11px] font-medium uppercase tracking-wide mb-4 ${featured ? 'text-white/60' : 'text-white/35'}`}>{credits}</div>
              <div className={`font-heading text-[20px] font-bold mb-2 ${featured ? 'text-white' : 'text-white/80'}`}>{level}</div>
              <p className={`text-[12.5px] leading-relaxed font-light ${featured ? 'text-white/70' : 'text-white/40'}`}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Streams */}
        <div>
          <p className="text-[11px] font-bold tracking-[2px] uppercase text-white/25 mb-5 text-center">Certification Streams</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {streams.map(s => (
              <button key={s} className="px-4 py-2 bg-white/10 border-2 border-white/10 hover:border-lime hover:bg-lime hover:text-white rounded-full text-[13px] font-medium text-white/50 transition-all duration-150 cursor-pointer">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
