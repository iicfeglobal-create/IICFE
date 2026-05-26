import { useState } from 'react'
import { TrendingUp, Building2, BarChart3, Shield, Rocket, ShoppingCart, Calculator, Lock, Bot, ArrowUpRight, Clock, Layers } from 'lucide-react'

const certs = [
  { cat:'fin', icon:TrendingUp,   tag:'Finance',         tagCls:'tag-finance',  title:'Certified Financial Markets Professional',  desc:'Equity markets, futures & options, portfolio management, risk analytics, live trading simulations.',     duration:'3 Months',   level:'Practitioner', credits:'9',  ai:true  },
  { cat:'fin', icon:Building2,    tag:'Finance',         tagCls:'tag-finance',  title:'Certified FinTech Analyst',                 desc:'Digital banking, embedded finance, AI in finance, blockchain fundamentals, fintech operations.',        duration:'6 Months',   level:'Specialist',   credits:'12', ai:true  },
  { cat:'fin', icon:Shield,       tag:'Finance',         tagCls:'tag-finance',  title:'Certified Fraud & Risk Examiner',           desc:'AML compliance, digital fraud analytics, financial crime detection and governance.',                    duration:'3–6 Months', level:'Expert',       credits:'15', ai:true  },
  { cat:'ent', icon:Rocket,       tag:'Entrepreneurship',tagCls:'tag-entrep',   title:'Certified Startup Builder',                 desc:'Lean startup methodology, MVP building, startup finance, investor pitching, AI tools.',                  duration:'3–6 Months', level:'Expert',       credits:'15', ai:true  },
  { cat:'ent', icon:Bot,          tag:'Entrepreneurship',tagCls:'tag-entrep',   title:'AI for Entrepreneurs',                      desc:'AI tools for business automation, marketing AI, productivity workflows and AI-driven models.',          duration:'1 Week',     level:'Foundation',   credits:'3',  ai:false },
  { cat:'com', icon:ShoppingCart, tag:'Commerce',        tagCls:'tag-commerce', title:'Certified E-Commerce Business Builder',     desc:'Shopify, Amazon, social commerce, digital marketing, logistics management and AI tools.',               duration:'3 Months',   level:'Practitioner', credits:'9',  ai:true  },
  { cat:'com', icon:Calculator,   tag:'Commerce',        tagCls:'tag-commerce', title:'GST & Taxation Practitioner',               desc:'GST filing, taxation compliance, business accounting using Tally and AI tools.',                       duration:'1 Month',    level:'Foundation',   credits:'3',  ai:false },
  { cat:'emp', icon:Lock,         tag:'Employability',   tagCls:'tag-employ',   title:'Certified Cyber Risk Professional',         desc:'Cyber governance, digital risk management, financial security analysis and compliance.',               duration:'3–6 Months', level:'Specialist',   credits:'12', ai:true  },
  { cat:'emp', icon:BarChart3,    tag:'Employability',   tagCls:'tag-employ',   title:'Certified Business Data Analyst',           desc:'Excel, Power BI, AI tools for analysts, business intelligence and financial analytics.',                duration:'3 Months',   level:'Practitioner', credits:'9',  ai:true  },
]

const filters = [
  { key:'all', label:'All Programs' },
  { key:'fin', label:'Finance' },
  { key:'ent', label:'Entrepreneurship' },
  { key:'com', label:'Commerce' },
  { key:'emp', label:'Employability' },
]

const levelColors = {
  Foundation:   'bg-white/10 text-white/60',
  Practitioner: 'bg-teal-500/20 text-teal-300',
  Specialist:   'bg-violet-500/20 text-violet-300',
  Expert:       'bg-lime text-white',
}

export default function Certifications() {
  const [active, setActive] = useState('all')
  const visible = certs.filter(c => active === 'all' || c.cat === active)

  return (
    <section id="certifications" className="py-20 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-teal-600 mb-3">Certification Catalogue</p>
            <h2 className="font-heading text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-4">
              Professional Certifications<br />
              <span className="text-white/40 font-semibold">Built for the Real World</span>
            </h2>
            <p className="text-[15.5px] text-white/60 font-semibold leading-relaxed max-w-[480px] mb-6">
              Every IICFE certification is industry-designed, AI-assessed, and globally recognised
              by employers and institutions.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white border-b-2 border-lime hover:border-white transition-colors pb-0.5">
              View all 50+ programs <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-72 shadow-card-md">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop"
              alt="Professional certification exam and learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-soft/80 via-transparent to-transparent" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <div className="bg-ink rounded-2xl shadow-card-md p-4 max-w-[200px]">
                <div className="font-heading text-[28px] font-bold text-white leading-none mb-1">50+</div>
                <div className="text-[12px] text-white/60 font-semibold">Professional Certifications across Finance, Commerce &amp; Entrepreneurship</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 cursor-pointer
                ${active === key ? 'bg-lime text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map(({ icon: Icon, tag, tagCls, title, desc, duration, level, credits, ai }) => (
            <div key={title} className="group text-xl bg-ink border-2 border-white/10 hover:border-lime rounded-2xl overflow-hidden hover:shadow-card-md transition-all duration-200 cursor-pointer flex flex-col">
              <div className="h-1.5 bg-white/10 group-hover:bg-lime transition-colors duration-200" />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 group-hover:bg-lime rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <Icon size={18} className="text-white/60 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${tagCls}`}>{tag}</span>
                </div>
                <h3 className="font-heading text-[22px] font-bold text-white mb-2.5 leading-snug">{title}</h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-light flex-1">{desc}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-[12px] text-white/50 font-semibold">
                    <span className="flex items-center gap-1"><Clock size={12} />{duration}</span>
                    <span className="flex items-center gap-1"><Layers size={12} />{credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${levelColors[level]}`}>{level}</span>
                    {ai && <span className="flex items-center gap-1 text-[11px] font-bold text-teal-400"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full blink-dot" />AI</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
