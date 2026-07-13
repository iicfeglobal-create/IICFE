import { useState } from 'react'
import { Award, Lock, Printer } from 'lucide-react'
import { sessions } from '../data/sessions'
import { isFullyComplete } from '../store'
import { useProgress } from '../useProgress'

function MockCertificate({ onClose }) {
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-[760px] my-8" onClick={(e) => e.stopPropagation()}>
        {/* Certificate */}
        <div id="fl-certificate" className="bg-white rounded-sm p-2 shadow-card-lg">
          <div className="border-[3px] border-lime/70 p-1">
            <div className="border border-slate-300 px-8 sm:px-14 py-12 text-center relative">
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-lime/40" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-lime/40" />
              <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-lime/40" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-lime/40" />

              <img src="/IICFE.png" alt="IICFE" className="h-12 mx-auto mb-5 object-contain" />
              <div className="text-[10px] font-bold tracking-[4px] uppercase text-slate-400 mb-1">International Institute of Commerce, Finance & Entrepreneurship</div>
              <div className="text-[10px] font-bold tracking-[4px] uppercase text-lime mb-8">The Founders Lab · Student Entrepreneur Program</div>

              <div className="font-heading text-[13px] text-slate-500 mb-2">This certificate of completion is proudly presented to</div>
              <div className="font-heading text-4xl font-bold text-ink mb-2" style={{ fontStyle: 'italic' }}>Demo Student</div>
              <div className="w-48 h-px bg-slate-300 mx-auto mb-6" />

              <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-lg mx-auto mb-8">
                for successfully completing all <strong>11 sessions</strong> of The Founders Lab — including every
                hands-on activity and all proctored assessments — demonstrating founder-level skills from
                startup ideation to a Shark Tank-ready pitch.
              </p>

              <div className="flex items-end justify-between max-w-md mx-auto">
                <div className="text-center">
                  <div className="font-heading text-[15px] text-ink italic mb-1">A. Mentor</div>
                  <div className="w-32 h-px bg-slate-300 mb-1.5" />
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Program Director</div>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-lime/50 flex items-center justify-center">
                  <Award size={26} className="text-lime" />
                </div>
                <div className="text-center">
                  <div className="font-heading text-[15px] text-ink mb-1">{today}</div>
                  <div className="w-32 h-px bg-slate-300 mb-1.5" />
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Date of Completion</div>
                </div>
              </div>

              <div className="mt-8 text-[9px] text-slate-300 tracking-wide">MOCK CERTIFICATE · DEMO ENVIRONMENT · NOT A VALID CREDENTIAL</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4 justify-center print:hidden">
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-white text-ink text-[13px] font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
            <Printer size={15} /> Print / Save PDF
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-white/20 text-white text-[13px] font-bold hover:bg-white/30 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CertificateSection({ completedModules }) {
  useProgress() // re-render on progress changes
  const [show, setShow] = useState(false)
  const unlocked = isFullyComplete(sessions.map((s) => s.id))
  const remaining = sessions.length - completedModules

  return (
    <div className={`rounded-3xl border-2 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 ${unlocked ? 'border-lime/40 bg-teal-50/40' : 'border-slate-200 bg-slate-50'}`}>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${unlocked ? 'bg-lime' : 'bg-slate-200'}`}>
        {unlocked ? <Award size={36} className="text-white" /> : <Lock size={30} className="text-slate-400" />}
      </div>
      <div className="flex-1 text-center md:text-left">
        <div className="font-heading text-xl font-bold text-ink mb-1.5">
          {unlocked ? 'Congratulations, founder! 🎉' : 'Your certificate awaits'}
        </div>
        <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-xl">
          {unlocked
            ? 'You completed every activity and passed all 11 proctored quizzes with a clean record. Your Founders Lab Certificate of Completion is ready.'
            : `Complete ${remaining} more module${remaining === 1 ? '' : 's'} (activity + quiz ≥ 7/10, no proctoring violations) to unlock your certificate.`}
        </p>
      </div>
      <button
        onClick={() => unlocked && setShow(true)}
        disabled={!unlocked}
        className="px-7 py-3.5 rounded-xl bg-ink hover:bg-lime disabled:opacity-40 disabled:hover:bg-ink text-white text-[13.5px] font-bold transition-colors flex-shrink-0"
      >
        {unlocked ? 'View certificate' : `${completedModules}/${sessions.length} complete`}
      </button>

      {show && <MockCertificate onClose={() => setShow(false)} />}
    </div>
  )
}
