import { ArrowUpRight } from 'lucide-react'

const pillars = [
  { num:'01', title:'Curriculum Standards Authority', desc:'Industry practitioners design every program. Our Academic Council ensures every syllabus meets real employer demand.' },
  { num:'02', title:'Global Examination Board',        desc:'AI-powered assessments. One rigorous standard. Every certified centre, everywhere in the world.' },
  { num:'03', title:'Digital Credential Issuer',       desc:'Every graduate receives tamper-proof digital certificates, LinkedIn badges, and a portable skill transcript.' },
  { num:'04', title:'Learning Partner Approval',       desc:'Universities, corporates, and EdTech platforms earn the right to deliver IICFE-certified programs under our quality framework.' },
]

const tiers = [
  { badge:'Platinum',   cls:'bg-amber-400 text-ink',         title:'Full Accreditation & Co-Branding',   sub:'Exceptional outcomes · Annual joint review' },
  { badge:'Gold',       cls:'bg-amber-200 text-amber-900',   title:'Accredited Delivery Rights',         sub:'Strong academic delivery · Faculty certification' },
  { badge:'Silver',     cls:'bg-slate-200 text-slate-800',   title:'Limited Delivery Rights',            sub:'Monitored 12-month probationary period' },
  { badge:'Registered', cls:'bg-slate-100 text-slate-600',   title:'Entry-Level Affiliation',            sub:'Workshop & short-course delivery only' },
]

export default function AccreditationBody() {
  return (
    <section id="accreditation" className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-[620px] mx-auto mb-16">
          <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">Our Role</p>
          <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-4">
            IICFE as a Global<br />
            <span className="text-white/50 font-semibold">Accreditation Body</span>
          </h2>
          <p className="text-[16px] text-white/55 font-semibold leading-relaxed">
             IICFE exists to set a standard, not merely deliver a course. We design the curriculum, conduct the examination, and issue the credential — recognised by employers and institutions across the globe.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — dark card with image */}
          <div className="bg-ink rounded-3xl overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative h-52 overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80&auto=format&fit=crop"
                alt="Academic council and governance board meeting"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink" />
            </div>
            {/* Pillars */}
            <div className="p-8 lg:p-10 flex-1">
              <p className="text-[11px] font-bold tracking-[2px] uppercase text-lime mb-6">Four Pillars of Authority</p>
              {pillars.map(({ num, title, desc }) => (
                <div key={num} className="flex gap-5 py-4 border-b border-white/[0.07] last:border-0">
                  <div className="font-heading text-[26px] font-bold text-lime leading-none min-w-[40px] pt-0.5">{num}</div>
                  <div>
                    <h4 className="font-heading text-[15px] font-bold text-white mb-1">{title}</h4>
                    <p className="text-[12.5px] text-white/65 leading-relaxed font-light">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — partner tiers */}
          <div className="bg-ink rounded-3xl border-2 border-white/10 p-8 lg:p-10 flex flex-col">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-400 mb-2">Approved Learning Partner Network</p>
            <h3 className="font-heading text-[24px] font-bold text-white mb-2">Join an exclusive network of accredited institutions worldwide.</h3>
            <p className="text-[13.5px] text-white/45 font-light mb-8">Globally delivered. Universally recognised.</p>

            {/* Partner logos strip */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { img:'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&q=70&auto=format&fit=crop', alt:'University campus' },
                { img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=70&auto=format&fit=crop', alt:'Corporate building' },
                { img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=70&auto=format&fit=crop', alt:'Business team' },
              ].map(({ img, alt }) => (
                <div key={alt} className="h-20 rounded-xl overflow-hidden bg-white/10">
                  <img src={img} alt={alt} className="w-full h-full object-cover opacity-60 hover:opacity-90 transition-opacity" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {tiers.map(({ badge, cls, title, sub }) => (
                <div key={badge} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide flex-shrink-0 min-w-[80px] text-center ${cls}`}>{badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-white/80">{title}</div>
                    <div className="text-[11.5px] text-white/40 mt-0.5">{sub}</div>
                  </div>
                  <ArrowUpRight size={15} className="text-white/20 group-hover:text-lime flex-shrink-0 transition-colors" />
                </div>
              ))}
            </div>

            <a href="#" className="mt-6 block text-center bg-lime hover:bg-lime-dark text-white py-3.5 rounded-2xl text-[14px] font-bold transition-colors cursor-pointer">
              Apply for Accreditation <span className="text-white/70">→</span>
            </a>
            <p className="text-center mt-3 text-[11.5px] text-white/30">Applications reviewed within 15 working days</p>
          </div>
        </div>
      </div>
    </section>
  )
}
