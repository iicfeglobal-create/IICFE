import { ArrowRight, CheckCircle2, Sparkles, Award, Globe, Users } from 'lucide-react'

const stats = [
  { n: '9', label: 'Certifications', bg: 'bg-lime' },
  { n: '4', label: 'Partner Institutes', bg: 'bg-ink-soft' },
  { n: '2', label: 'Countries', bg: 'bg-ink-soft' },
  { n: '50', label: 'Certified Professionals', bg: 'bg-ink-soft' },
]

const trust = ['ISO 21001 Certified', 'SkillsFuture Aligned', 'NSDC Recognised', 'Blockchain Credentials']

const badges = [
  { icon: Award, label: 'Blockchain Certificates', sub: 'Instantly verifiable globally', color: 'text-lime' },
  { icon: Globe, label: '2 Countries', sub: 'Active partner network', color: 'text-cyan-400' },
  { icon: Users, label: '50 Employers', sub: 'Recognise IICFE credentials', color: 'text-violet-400' },
]

export default function Hero() {
  return (
    <section className="bg-ink overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* ── TOP HERO ─────────────────────────────── */}
        <div className="pt-14 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 px-4 py-2 rounded-full text-[12px] font-semibold mb-7">
              <Sparkles size={13} className="text-lime" />
              Global Accreditation &amp; Examination Body · Est. 2024
            </div>
            <h1 className="font-heading text-[54px] sm:text-[62px] font-bold text-lime leading-[1.04] tracking-tight">IICFE</h1>
            <p className="text-[16.5px] text-white/50 font-light leading-relaxed max-w-[520px] mb-3">
              International Institute of Commerce, Finance &amp; Entrepreneurship
            </p>
            <h1 className="font-heading text-[40px] sm:text-[41px] font-bold text-white leading-[1.04] tracking-tight mb-6">
              The Global<br />
              Standard for{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Commerce,</span>
                <span className="absolute bottom-1 left-0 right-0 h-3.5 bg-lime -z-0 rounded" aria-hidden />
              </span>
              <br />Finance &amp; Entrepreneurship
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#certifications" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/35 text-white px-7 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-150 cursor-pointer">
                Explore Certifications <ArrowRight size={16} />
              </a>
              <a href="#accreditation" className="inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-white px-7 py-3.5 rounded-2xl text-[15px] font-bold transition-colors duration-150 cursor-pointer shadow-lime">
                Become a Partner
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[12.5px] text-white/35">
              {trust.map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80&auto=format&fit=crop"
                alt="IICFE students collaborating in a professional setting"
                className="w-full h-[420px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-ink-soft/90 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-card">
                <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-heading text-[14px] font-bold text-white">AI-Powered Socratic Assessment</div>
                  <div className="text-[12px] text-white/50">Adaptive examination · Blockchain certified</div>
                </div>
              </div>
            </div>
            {/* Floating stat */}
            <div className="absolute -top-4 -right-4 bg-ink-soft border border-white/15 text-white rounded-2xl px-5 py-3 shadow-card-lg">
              <div className="font-heading text-[28px] font-bold text-lime leading-none">50+</div>
              <div className="text-[11px] text-white/60 mt-0.5">Certified Globally</div>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map(({ n, label, bg }) => (
            <div key={label} className={`${bg} rounded-2xl px-6 py-5`}>
              <div className={`font-heading text-[38px] font-bold leading-none mb-1 ${bg === 'bg-lime' ? 'text-white' : 'text-white'}`}>{n}</div>
              <div className={`text-[13px] font-semibold ${bg === 'bg-lime' ? 'text-white/80' : 'text-white/50'}`}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── DARK BANNER ──────────────────────────── */}
        <div className="bg-ink-soft border border-white/10 rounded-t-3xl overflow-hidden px-8 pt-10 pb-0 relative">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.5) 40px,rgba(255,255,255,.5) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.5) 40px,rgba(255,255,255,.5) 41px)' }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-8">
            {/* Left copy */}
            <div className="max-w-[480px] pb-10">
              <div className="inline-flex items-center gap-2 bg-lime text-white px-3 py-1.5 rounded-full text-[11px] font-bold mb-5">
                <span className="w-1.5 h-1.5 bg-white rounded-full blink-dot" />
                AI-Powered Socratic Assessment
              </div>
              <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-white leading-snug mb-4">
                The only certification body that lets{' '}
                <em className="not-italic text-lime">AI examine you</em> — not just test you.
              </h2>
              <p className="text-[14px] text-white font-light leading-relaxed mb-6">
                Our adaptive Socratic engine probes your reasoning depth — not just recall.
                Real industry scenarios, live competency scoring, blockchain credentials.
              </p>
              <a href="#ai-assessment" className="inline-flex items-center gap-2 bg-lime text-white px-5 py-2.5 rounded-xl text-[13.5px] font-bold hover:bg-lime-dark transition-colors cursor-pointer">
                Try it free <ArrowRight size={14} />
              </a>
            </div>
            {/* Right cards */}
            <div className="flex flex-col gap-3 pb-10 min-w-[260px] flex-shrink-0">
              {badges.map(({ icon: Icon, label, sub, color }) => (
                <div key={label} className="flex items-center gap-3 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors cursor-default">
                  <Icon size={18} className={color} />
                  <div>
                    <div className="text-[13px] font-semibold text-white">{label}</div>
                    <div className="text-[11px] text-white/50">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
