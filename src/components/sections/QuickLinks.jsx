import {
  ClipboardList,
  Calendar,
  Bot,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    icon: ClipboardList,
    title: "Find Your Certification",
    desc: "Answer 3 questions, get your match.",
    cta: "Start quiz",
    bg: "bg-lime",
    iconBg: "bg-ink",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white",
    ctaColor: "text-white",
  },
  {
    icon: Calendar,
    title: "Exam Schedules",
    desc: "Upcoming dates — SG, India, UAE, Online.",
    cta: "View dates",
    bg: "bg-teal-500/20",
    iconBg: "bg-teal-500",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/60",
    ctaColor: "text-white",
  },
  {
    icon: Bot,
    title: "Try AI Assessment",
    desc: "Free 5-minute Socratic sample session.",
    cta: "Try now",
    bg: "bg-violet-500/20",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/60",
    ctaColor: "text-white",
  },
  {
    icon: ShieldCheck,
    title: "Verify a Certificate",
    desc: "Instant blockchain credential check.",
    cta: "Verify",
    bg: "bg-amber-500/20",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/60",
    ctaColor: "text-white",
  },
  {
    icon: GraduationCap,
    title: "Partner Application",
    desc: "Become an Approved Learning Partner.",
    cta: "Apply",
    bg: "bg-rose-500/20",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/60",
    ctaColor: "text-white",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-16 bg-ink-soft">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map(
            ({
              icon: Icon,
              title,
              desc,
              cta,
              bg,
              iconBg,
              iconColor,
              titleColor,
              descColor,
              ctaColor,
            }) => (
              <a
                key={title}
                href="#"
                className={`${bg} rounded-2xl p-5 flex flex-col justify-between min-h-[180px] hover:-translate-y-1 hover:shadow-card-md transition-all duration-200 cursor-pointer group`}
              >
                <div
                  className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon size={18} className={iconColor} />
                </div>
                <div>
                  <h4
                    className={`font-heading text-[14.5px] font-bold ${titleColor} mb-1.5 leading-snug`}
                  >
                    {title}
                  </h4>
                  <p
                    className={`text-[12px] ${descColor} leading-relaxed mb-3 font-light`}
                  >
                    {desc}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-[12px] font-bold ${ctaColor} group-hover:gap-2 transition-all duration-150`}
                  >
                    {cta} <ArrowUpRight size={13} />
                  </div>
                </div>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
