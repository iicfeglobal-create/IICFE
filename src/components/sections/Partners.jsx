import { GraduationCap, Building2, Scale, Laptop, ArrowUpRight } from 'lucide-react'

const partners = [
  {
    icon: GraduationCap, bg: 'bg-ink', iconColor: 'text-lime',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=70&auto=format&fit=crop',
    imgAlt: 'University campus building',
    title: 'Universities & Colleges',
    desc: 'Integrate IICFE certifications into your curriculum. Students earn academic credentials AND an IICFE professional designation.',
    cta: 'University partnership',
  },
  {
    icon: Building2, bg: 'bg-teal-500', iconColor: 'text-white',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=70&auto=format&fit=crop',
    imgAlt: 'Corporate office building',
    title: 'Corporates & Banks',
    desc: 'Upskill your workforce with bespoke IICFE programs in finance, FinTech, data analytics, entrepreneurship and leadership.',
    cta: 'Corporate solutions',
  },
  {
    icon: Scale, bg: 'bg-amber-400', iconColor: 'text-ink',
    img: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=500&q=70&auto=format&fit=crop',
    imgAlt: 'Government institution',
    title: 'Government & Skill Agencies',
    desc: "Align national employability initiatives with IICFE's globally benchmarked skill certification and entrepreneurship framework.",
    cta: 'Government partnerships',
  },
  {
    icon: Laptop, bg: 'bg-violet-600', iconColor: 'text-white',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=70&auto=format&fit=crop',
    imgAlt: 'EdTech platform and digital learning',
    title: 'EdTech Platforms',
    desc: 'License the IICFE curriculum, examination rights, and AI assessment engine to power globally recognised certifications on your platform.',
    cta: 'EdTech licensing',
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">Partnership Ecosystem</p>
          <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-4">
            Deliver IICFE Programs<br />
            <span className="text-white/35 font-light">Anywhere in the World</span>
          </h2>
          <p className="text-[15.5px] text-white/50 font-light leading-relaxed">
            Four types of institutions can partner with IICFE to deliver globally recognised certifications under our accreditation framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {partners.map(({ icon: Icon, bg, iconColor, img, imgAlt, title, desc, cta }) => (
            <div key={title} className="group border-2 border-white/10 hover:border-lime bg-ink rounded-3xl overflow-hidden hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col">
              {/* Image */}
              <div className="h-40 overflow-hidden relative">
                <img src={img} alt={imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className={`absolute top-4 left-4 w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className={iconColor} />
                </div>
              </div>
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading text-[17px] font-bold text-white mb-3">{title}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed font-light flex-1 mb-5">{desc}</p>
                <a href="#" className="flex items-center gap-1.5 text-[13px] font-bold text-lime group-hover:gap-2.5 transition-all duration-150">
                  {cta} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-lime rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-[22px] font-bold text-white mb-1">Ready to become a partner?</h3>
            <p className="text-[14px] text-white/70 font-light">Applications reviewed within 15 working days.</p>
          </div>
          <a href="#" className="flex-shrink-0 bg-ink hover:bg-ink-soft text-white px-7 py-3.5 rounded-2xl text-[14px] font-bold transition-colors cursor-pointer inline-flex items-center gap-2">
            Start your application <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
