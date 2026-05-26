import { ArrowUpRight, BookOpen } from 'lucide-react'

export default function InsightStrip() {
  return (
    <section className="py-16 bg-ink">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="bg-ink-soft border border-white/10 rounded-3xl px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-lime text-[11px] font-bold tracking-[2px] uppercase mb-3">Research &amp; Resources</p>
            <h2 className="font-heading text-[28px] lg:text-[36px] font-bold text-white leading-snug mb-2">
              Explore IICFE research, reports<br className="hidden lg:block" /> and industry insights
            </h2>
            <p className="text-[14px] text-white/65 font-light">Download certification guides, market readiness assessments, and whitepapers.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="#" className="bg-lime hover:bg-lime-dark text-white px-6 py-3 rounded-2xl text-[14px] font-bold transition-colors cursor-pointer inline-flex items-center gap-2">
              <BookOpen size={16} /> Browse Research
            </a>
            <a href="#" className="border-2 border-white/40 hover:border-white/70 text-white/80 hover:text-white px-6 py-3 rounded-2xl text-[14px] font-medium transition-all cursor-pointer inline-flex items-center gap-2">
              Newsroom <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
