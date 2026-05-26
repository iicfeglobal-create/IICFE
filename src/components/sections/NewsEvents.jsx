import { ArrowUpRight } from 'lucide-react'

const news = [
  {
    cat: 'Finance · Press Release',
    catColor: 'text-teal-300 bg-teal-500/15',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'FinTech and financial markets data screen',
    title: 'IICFE Launches Certified FinTech Analyst Program in Partnership with 12 Universities',
    desc: 'The program integrates blockchain credentialing and AI-powered Socratic assessment for the first time in the region.',
    date: 'May 2025',
    cta: 'Read more',
  },
  {
    cat: 'Entrepreneurship · Event',
    catColor: 'text-amber-300 bg-amber-500/15',
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Entrepreneurship summit with founders',
    title: 'IICFE Entrepreneurship Summit 2025 — Singapore: 1,200 Founders, Investors & Educators',
    desc: "The annual summit brings together Asia's leading startup ecosystem stakeholders for two days of learning and networking.",
    date: 'Jun 2025',
    cta: 'Register',
  },
  {
    cat: 'Accreditation · Announcement',
    catColor: 'text-violet-300 bg-violet-500/15',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format&fit=crop',
    imgAlt: 'Global network and international expansion',
    title: 'IICFE Approved Learning Partner Network Expands to 200+ Institutions Across 25 Countries',
    desc: 'New platinum-tier partners include leading institutions from India, UAE, Malaysia and Indonesia.',
    date: 'Apr 2025',
    cta: 'Read more',
  },
]

export default function NewsEvents() {
  return (
    <section className="py-20 bg-ink">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">Latest from IICFE</p>
            <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight">
              News, Events<br />
              <span className="text-white/35 font-light">&amp; Insights</span>
            </h2>
          </div>
          <a href="#" className="self-start lg:self-end inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white border-b-2 border-lime hover:border-white transition-colors pb-0.5">
            All news <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map(({ cat, catColor, img, imgAlt, title, desc, date, cta }) => (
            <div key={title} className="group border-2 border-white/10 hover:border-lime bg-ink-soft rounded-3xl overflow-hidden hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={img}
                  alt={imgAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className={`inline-block text-[10.5px] font-bold tracking-[1px] uppercase px-2.5 py-1 rounded-full ${catColor} mb-3 self-start`}>{cat}</span>
                <h4 className="font-heading text-[16px] font-bold text-white leading-snug mb-3 flex-1">{title}</h4>
                <p className="text-[13px] text-white/45 font-light leading-relaxed">{desc}</p>
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-[12px] text-white/35 font-medium">{date}</span>
                <a href="#" className="flex items-center gap-1 text-[12.5px] font-bold text-lime group-hover:gap-1.5 transition-all">
                  {cta} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
