import { Globe } from 'lucide-react'

export default function UtilityNav() {
  return (
    <div className="bg-ink text-white/50 text-[11.5px]">
      <div className="max-w-[1320px] mx-auto px-6 h-9 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-white/70">
            <Globe size={11} />
            <span>India</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          {['Global', 'Singapore', 'UAE'].map(r => (
            <a key={r} href="#" className="hover:text-lime transition-colors duration-150">{r}</a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {['Member Login', 'Verify Certificate', 'Find a Partner'].map((l, i) => (
            <span key={l} className="flex items-center gap-5">
              {i > 0 && <span className="w-px h-3 bg-white/10" />}
              <a href="#" className="hover:text-lime transition-colors duration-150">{l}</a>
            </span>
          ))}
          <div className="w-px h-3 bg-white/10" />
          <a href="#" className="bg-lime text-white px-3.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide hover:bg-lime-dark transition-colors duration-150">
            Apply Now
          </a>
        </div>
      </div>
    </div>
  )
}
