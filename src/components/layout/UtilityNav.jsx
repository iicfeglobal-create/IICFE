import { Globe } from 'lucide-react'

export default function UtilityNav() {
  return (
    <div className="bg-ink text-white/50 text-[11.5px]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 min-h-9 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-1.5 sm:py-0 sm:h-9">

        {/* Left: Region links */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <div className="flex items-center gap-1.5 text-white/70 shrink-0">
            <Globe size={11} />
            <span>Singapore</span>
          </div>
          <div className="hidden sm:block w-px h-3 bg-white/10 shrink-0" />
          Global
        </div>

        {/* Right: Utility links */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {[ 'Verify Certificate', 'Find a Partner'].map((l, i) => (
            <span key={l} className="flex items-center gap-3 sm:gap-5">
              {i > 0 && <span className="hidden sm:block w-px h-3 bg-white/10 shrink-0" />}
              <a href="#" className="hover:text-lime transition-colors duration-150 whitespace-nowrap">
                {l}
              </a>
            </span>
          ))}
          <div className="hidden sm:block w-px h-3 bg-white/10 shrink-0" />
        </div>

      </div>
    </div>
  )
}
