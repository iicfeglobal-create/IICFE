import { useState, useEffect } from 'react'
import { ChevronDown, TrendingUp, Building2, BarChart3, Shield, Rocket, ShoppingCart, Calculator, Lock, Target, Calendar, Monitor, Bot, Award, CheckSquare, Users, Globe, Laptop, Star, Medal, GraduationCap, Scale, Map, Newspaper, BookOpen, Phone, Menu, X } from 'lucide-react'

const navData = [
  {
    label: 'Certifications',
    cols: [
      {
        title: 'Finance',
        items: [
          { icon: TrendingUp, title: 'Certified Financial Markets Professional', desc: 'Futures, options, trading & portfolio management' },
          { icon: Building2, title: 'Certified FinTech Analyst', desc: 'Digital banking, AI in finance, blockchain' },
          { icon: BarChart3, title: 'Financial Analytics Professional', desc: 'Excel, Power BI, data-driven finance' },
          { icon: Shield, title: 'Certified Fraud & Risk Examiner', desc: 'AML, compliance, digital fraud analytics' },
        ],
      },
      {
        title: 'Entrepreneurship & Commerce',
        items: [
          { icon: Rocket, title: 'Certified Startup Builder', desc: 'Lean startup, MVP, venture creation' },
          { icon: ShoppingCart, title: 'Certified E-Commerce Business Builder', desc: 'Shopify, Amazon, social commerce' },
          { icon: Calculator, title: 'GST & Taxation Practitioner', desc: 'Compliance, accounting, Tally & AI tools' },
          { icon: Lock, title: 'Certified Cyber Risk Professional', desc: 'Cyber governance, digital security' },
        ],
      },
    ],
  },
  {
    label: 'Study with IICFE',
    cols: [
      {
        title: 'Get Started',
        items: [
          { icon: Target, title: 'Find your pathway', desc: 'Which certification suits you?' },
          { icon: Calendar, title: 'Exam schedules', desc: 'Upcoming assessment dates globally' },
          { icon: Monitor, title: 'Online learning', desc: 'Self-paced modules and live cohorts' },
        ],
      },
      {
        title: 'AI Assessment Engine',
        items: [
          { icon: Bot, title: 'Socratic AI Assessor', desc: 'Adaptive questioning — AI asks, you answer' },
          { icon: BarChart3, title: 'Competency scoring', desc: 'Live performance analytics' },
          { icon: Award, title: 'Digital credentials', desc: 'Blockchain certificates & LinkedIn badges' },
        ],
      },
    ],
  },
  {
    label: 'Employers',
    cols: [
      {
        title: 'For Employers',
        items: [
          { icon: Building2, title: 'Train your workforce', desc: 'Custom IICFE programs for your org' },
          { icon: CheckSquare, title: 'Approved Employer Programme', desc: 'Recognise IICFE credentials in hiring' },
          { icon: Users, title: 'Recruit IICFE graduates', desc: 'Access our global talent network' },
        ],
      },
      {
        title: 'Sectors',
        items: [
          { icon: Building2, title: 'Banking & Financial Services', desc: 'Finance, trading & compliance talent' },
          { icon: Rocket, title: 'Startups & SMEs', desc: 'Commerce, operations & entrepreneurship' },
          { icon: Globe, title: 'FinTech & Digital Economy', desc: 'AI, data, blockchain talent' },
        ],
      },
    ],
  },
  {
    label: 'Learning Partners',
    right: true,
    cols: [
      {
        title: 'Become a Partner',
        items: [
          { icon: GraduationCap, title: 'University & College Partners', desc: 'Integrate IICFE into curriculum' },
          { icon: Globe, title: 'Licensing & Franchise Model', desc: 'Deliver programs in your region' },
          { icon: Laptop, title: 'EdTech Platform Integration', desc: 'Power your platform with IICFE' },
        ],
      },
      {
        title: 'Partner Tiers',
        items: [
          { icon: Star, title: 'Platinum Partner', desc: 'Full accreditation & co-branding' },
          { icon: Medal, title: 'Gold Partner', desc: 'Accredited delivery with annual review' },
          { icon: Award, title: 'Silver / Registered', desc: 'Entry-level affiliation' },
        ],
      },
    ],
  },
  {
    label: 'About IICFE',
    right: true,
    cols: [
      {
        title: 'The Institution',
        items: [
          { icon: Building2, title: 'About IICFE', desc: 'Vision, mission and founding story' },
          { icon: Scale, title: 'Governance & Academic Council', desc: 'Leadership, board, examination authority' },
          { icon: Map, title: 'Global Expansion', desc: 'Roadmap across Asia, ME & Africa' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { icon: Newspaper, title: 'Newsroom', desc: 'Announcements and press releases' },
          { icon: BookOpen, title: 'Research & Publications', desc: 'Industry insights and knowledge papers' },
          { icon: Phone, title: 'Contact Us', desc: 'Singapore HQ and regional offices' },
        ],
      },
    ],
  },
]

function DropMenu({ cols, right }) {
  return (
    <div className={`mega-drop absolute top-[calc(100%+12px)] ${right ? 'right-0' : 'left-0'} bg-ink-soft rounded-2xl shadow-card-lg border border-white/10 p-7 flex gap-10 z-50 min-w-[640px]`}>
      {cols.map(({ title, items }) => (
        <div key={title} className="flex-1 min-w-[200px]">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30 mb-4 pb-2.5 border-b border-white/10">{title}</div>
          {items.map(({ icon: Icon, title: t, desc }) => (
            <a key={t} href="#" className="flex items-start gap-3 py-2.5 group cursor-pointer border-b border-white/5 last:border-0">
              <div className="w-8 h-8 bg-white/10 group-hover:bg-lime rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                <Icon size={14} className="text-white/60 group-hover:text-white transition-colors duration-150" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white/80 group-hover:text-lime transition-colors leading-snug">{t}</div>
                <div className="text-[11.5px] text-white/35 font-light mt-0.5 leading-snug">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
      style={{ background: scrolled ? 'rgba(15,28,38,0.95)' : '#0F1C26', backdropFilter: scrolled ? 'blur(12px)' : 'none', boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.30)' : '0 1px 0 rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1320px] mx-auto px-6 flex items-center h-16">
        {/* Logo */}
        <a href="#" className="flex items-center mr-12 flex-shrink-0">
          <img
                src="/IICFE.png"
                alt="IICFE Logo"
                className="h-10 w-auto object-contain"
              />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center flex-1 gap-1">
          {navData.map(({ label, cols, right }) => (
            <div key={label} className="nav-item relative">
              <button className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-150 cursor-pointer whitespace-nowrap">
                {label} <ChevronDown size={13} className="text-white/30 mt-0.5" />
              </button>
              <DropMenu cols={cols} right={right} />
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <a href="#" className="px-4 py-2 text-[13px] font-semibold text-white/60 hover:bg-white/10 rounded-xl transition-colors duration-150 cursor-pointer">
            Member Login
          </a>
          <a href="#" className="px-5 py-2.5 bg-ink hover:bg-ink-soft text-white text-[13px] font-bold rounded-xl transition-colors duration-150 cursor-pointer flex items-center gap-1.5">
            Apply Now <span className="text-lime">→</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-ink-soft border-t border-white/10 px-6 py-4 flex flex-col gap-2">
          {navData.map(({ label }) => (
            <a key={label} href="#" className="py-2.5 text-[14px] font-medium text-white/70 border-b border-white/10 last:border-0">{label}</a>
          ))}
          <div className="flex gap-3 pt-3">
            <a href="#" className="flex-1 py-2.5 text-center border-2 border-white/20 text-white text-[13px] font-bold rounded-xl">Login</a>
            <a href="#" className="flex-1 py-2.5 text-center bg-ink text-white text-[13px] font-bold rounded-xl">Apply Now</a>
          </div>
        </div>
      )}
    </div>
  )
}
