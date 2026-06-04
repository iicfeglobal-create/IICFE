const links = {
  'Study with IICFE':  ['Find your pathway','Examination schedules','AI Assessment Engine','Credit framework','Student login','Verify certificate'],
  'Institution':       ['Academic Council','Examination Board','Global presence','Newsroom','Research & publications'],
  'Know More':['Contact Us','Global expansion','Careers at IICFE']
}

const socials = [
  { label:'in', title:'LinkedIn' },
  { label:'X',  title:'X (Twitter)' },
  { label:'f',  title:'Facebook' },
  { label:'▶',  title:'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-[1320px] mx-auto px-6 pt-16 pb-12 border-b border-white/[0.10]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/IICFE.png"
                alt="IICFE Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[13px] text-white/65 leading-[1.75] font-light max-w-[260px] mb-6">
              International Institute of Commerce, Finance & Entrepreneurship — Setting the global standard for professional education in commerce, finance and entrepreneurship.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ label, title }) => (
                <button key={title} aria-label={title}
                  className="w-9 h-9 border border-white/25 hover:border-lime hover:text-lime text-white/65 rounded-full flex items-center justify-center text-[12px] font-bold transition-all cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h5 className="text-[10.5px] font-bold tracking-[1.5px] uppercase text-white/75 mb-5">{section}</h5>
              {items.map(item => (
                <a key={item} href="#" className="block text-[13px] text-white/60 hover:text-white mb-3 font-light transition-colors duration-150">{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-white/55">
        <span>© 2025 IICFE Singapore Pte. Ltd. All rights reserved.</span>
        <div className="flex flex-wrap justify-center gap-5">
          {['Privacy Policy','Terms of Use','Cookie Policy','Accreditation Standards','Sitemap'].map(l => (
            <a key={l} href="#" className="text-white/55 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
