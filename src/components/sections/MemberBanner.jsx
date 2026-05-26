import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function MemberBanner() {
  return (
    <section className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="relative bg-ink rounded-3xl overflow-hidden">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=70&auto=format&fit=crop"
            alt="Graduates celebrating their professional achievement"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />

          {/* Content */}
          <div className="relative z-10 px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 bg-lime text-white px-4 py-2 rounded-full text-[12px] font-bold mb-6">
                <Sparkles size={13} />
                Join the Global IICFE Community
              </div>
              <h2 className="font-heading text-[42px] lg:text-[54px] font-bold text-white leading-tight mb-4">
                Ready to get certified<br />and go global?
              </h2>
              <p className="text-[16px] text-white/55 font-light leading-relaxed">
                Students, professionals, and institutions in 25+ countries have already chosen IICFE.
                Your career transformation starts here.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a href="#" className="bg-lime hover:bg-lime-dark text-white px-8 py-4 rounded-2xl text-[15px] font-bold transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lime justify-center">
                Apply Now <ArrowUpRight size={16} />
              </a>
              <a href="#" className="border-2 border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-2xl text-[15px] font-semibold transition-all cursor-pointer hover:bg-white/5 text-center">
                Explore Certifications
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
