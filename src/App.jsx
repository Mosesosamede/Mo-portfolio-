import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  X,
  MapPin,
  Phone,
  Sparkles,
  Code2,
  Server,
  Palette,
  BadgeCheck,
  CheckCircle2,
  Cpu,
  RefreshCcw,
  Monitor,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

/**
 * 1. EDIT YOUR IMAGES HERE
 * Replace the URLs in the 'images' array for each project.
 */
const PROJECTS = [
  {
    name: "Brand Analysis AI",
    stack: "React • Node.js • Python • AWS",
    short: "Turn brand ideas into market-ready strategy using demand signals.",
    problem: "Founders struggle to validate their brand ideas objectively and align with market demand.",
    solution: "Built an AI-driven platform to analyze brand traits, assess market fit, and refine strategy.",
    impact: ["Clear validation of brand direction", "Faster go-to-market strategy", "Data-driven recommendations"],
    links: [{ label: "Case Study", href: "#" }],
    isAI: true,
    status: "updating",
    color: "from-blue-600 to-indigo-900",
    // Image Url for project 
    images: [
      "https://i.ibb.co/rR8bKLN2/file-000000007ac471f4bdc62a44e116151b.png",
      "https://i.ibb.co/S4cd7rMS/file-000000004c9471f4a1ee2f9e5087e6ae.png",
      "https://i.ibb.co/TBFDKHwd/file-00000000a834720a99daa927918b87dd.png"
    ]
  },
  {
    name: "Ads Manager AI",
    stack: "React • Python • Tailwind • AWS",
    short: "Suggests content angles and placements for focused campaigns.",
    problem: "Brands waste ad spend targeting the wrong audience.",
    solution: "Created an AI platform that recommends content formats, targeting, and platform placements.",
    impact: ["Improved ad relevance", "Increased campaign ROI", "Faster decision-making"],
    links: [{ label: "Case Study", href: "#" }],
    isAI: true,
    status: "updating",
    color: "from-emerald-600 to-teal-900",
    // Image Url 
    images: [
      "https://i.ibb.co/Fkpw8F8k/file-000000008bd4722f9ed50ec7d7eabf44.png",
      "https://i.ibb.co/cS67kYC2/file-00000000b5f8722f8cdd065721462480.png",
      "https://i.ibb.co/Q7B3s2sS/file-0000000029fc722f9e18b94888ce91ad.png"
    ]
  },
  {
    name: "Network Exposure Analysis",
    stack: "React • Node.js • AWS • Python",
    short: "Detects and mitigates network vulnerabilities and misconfigurations.",
    problem: "Exposed services and misconfigurations are a major security risk.",
    solution: "Developed an analysis tool to identify risks and suggest remedial actions.",
    impact: ["Reduced security vulnerabilities", "Improved network security posture", "Faster incident response"],
    links: [{ label: "Case Study", href: "#" }],
    isAI: false,
    status: "updating",
    color: "from-rose-600 to-orange-900",
    // CHANGE THESE URLS TO YOUR SCREENSHOTS
    images: [
      "https://i.ibb.co/zVkBLk89/file-000000003a30722f91dd56805b73677d.png",
      "https://i.ibb.co/HLcGfyzz/file-000000007190722f8e2f89b062338c21.png",
      "https://i.ibb.co/cXLBM3Mn/file-00000000959c722f991947e9c080c7f4.png"
    ]
  },
];

const PROFILE = {
  name: "Moses Obaseki",
  nickname: "Mo",
  title: "Senior Full-Stack Developer",
  summaryItems: [
    "Backend & Infrastructure Enthusiast",
    "High-Fidelity Frontend Engineer",
    "Open to Remote & Onsite roles",
    "Solving complex problems at scale"
  ],
  location: "Lagos, NG • Remote & Onsite",
  email: "obsmoses@gmail.com",
  phone: "+234 (916) 587 7240",
  website: "https://obsmoses.page.gd",
  status: "Available for new opportunities",
  socials: {
    github: "https://github.com/blade-code",
    linkedin: "https://linkedin.com/in/moses",
  },
};

const METRICS = [
  { label: "Years", value: "10+", hint: "Shipping production systems" },
  { label: "Speed", value: "40%", hint: "Faster load after migration" },
  { label: "Builds", value: "30+", hint: "Client apps delivered" },
  { label: "Perf", value: "100/100", hint: "Lighthouse score (Next.js)" },
];

const SKILLS = [
  { group: "Core", icon: Code2, items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind"] },
  { group: "Backend", icon: Server, items: ["Rust", "Python", "PHP", "Laravel", "Express.js", "FastAPI"] },
  { group: "Design", icon: Palette, items: ["UI/UX", "Figma", "Photoshop", "Responsive Design"] },
  { group: "Infrastructure", icon: Cpu, items: ["AWS", "Docker", "Firebase", "CI/CD", "Security Analysis"] }
];

const CERTS = [
  "AWS Certified Developer Associate",
  "Google Professional UI/UX Design Certificate",
  "FreeCodeCamp Full-Stack Developer",
  "Coursera Ethical Hacker Certificate",
];

/* ---------- Utility Components ---------- */

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Glass = ({ className = "", children }) => (
  <div className={cn("bg-zinc-950/40 border border-zinc-800/60 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]", className)}>
    {children}
  </div>
);

function MagneticButton({ children, className = "", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onMove(e) {
    if (window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.15);
    y.set(dy * 0.15);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold transition-all active:scale-95",
        "bg-white text-zinc-950 hover:bg-zinc-100 w-full sm:w-auto",
        "shadow-lg",
        className
      )}
    >
      <span className="relative flex items-center gap-2 z-10">{children}</span>
    </motion.button>
  );
}

function ToolPill({ label, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="inline-block rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-300"
    >
      {label}
    </motion.span>
  );
}

/* ---------- Custom Animated Components ---------- */

function Typewriter({ items }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const current = items[index % items.length];
      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(current.substring(0, displayText.length + 1));
        setSpeed(100);
      }

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, items, speed]);

  return (
    <span className="inline-block min-h-[1.5em] text-blue-400">
      {displayText}
      <span className="ml-1 inline-block w-1 h-[1em] bg-blue-500 animate-pulse align-middle" />
    </span>
  );
}

function BouncyM() {
  return (
    <span className="inline-block relative">
      <style>{`
        @keyframes blue-cycle {
          0% { background-color: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { background-color: #2563eb; box-shadow: 0 0 40px rgba(37, 99, 235, 0.6); }
          100% { background-color: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
        }
        .blue-circle {
          animation: blue-cycle 3s ease-in-out infinite;
        }
      `}</style>
      <motion.span
        animate={{ y: [0, -20, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative inline-flex items-center justify-center w-[1.1em] h-[1.1em]"
      >
        <span className="absolute inset-0 rounded-full blue-circle -z-10" />
        <span className="relative text-white">M</span>
      </motion.span>
    </span>
  );
}

function LetsTalkButton() {
  return (
    <>
      <style>{`
        @keyframes cycling-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-cycling-bg {
          background-size: 200% 200%;
          animation: cycling-bg 3s linear infinite;
        }
      `}</style>
      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold border border-transparent text-zinc-950 hover:text-white w-full sm:w-auto transition active:scale-95 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          Let's Talk <Mail className="h-5 w-5 text-zinc-900 group-hover:text-white transition-colors" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#e9ff70] via-[#50fa7b] to-[#e9ff70] animate-cycling-bg opacity-100 group-hover:opacity-90 transition-opacity"></div>
      </a>
    </>
  );
}

/* ---------- 2. THE SLIDER COMPONENT (WITH REAL IMAGE SUPPORT) ---------- */

function ProjectSlider({ project, showControls = true }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];

  const next = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider overflow-hidden bg-zinc-900">
      {/* Browser Bar Decoration */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-zinc-800/90 backdrop-blur-sm flex items-center justify-between px-3 z-20 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="bg-white/5 px-4 py-0.5 rounded text-[10px] font-medium text-zinc-400">
          {project.name.toLowerCase().replace(/\s/g, '-')}.app
        </div>
        <div className="w-10" />
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full pt-7"
        >
          {/* IMAGE RENDERER */}
          <img 
            src={images[index]} 
            alt={`${project.name} screenshot ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
                e.target.src = "https://placehold.co/1200x800/18181b/ffffff?text=Image+Not+Found";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}
      {showControls && images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/80 active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/80 active:scale-90"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={cn(
                  "h-1.5 transition-all rounded-full",
                  i === index ? "w-8 bg-blue-500" : "w-1.5 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- UI Components ---------- */

function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      onClick={() => onOpen(project)}
      className="text-left w-full active:scale-[0.98] transition-transform group"
    >
      <Glass className="relative rounded-3xl h-full hover:border-blue-500/40 transition flex flex-col overflow-hidden">
        <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-zinc-800">
           <ProjectSlider project={project} showControls={false} />
           <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10" />
        </div>
        
        <div className="p-6">
          <div className="flex justify-end gap-2 mb-4">
            {project.isAI && (
              <span className="py-1 px-3 text-[9px] font-black rounded-full bg-blue-500 text-white animate-pulse uppercase tracking-widest">
                AI Powered
              </span>
            )}
            {project.status === 'updating' && (
               <span className="py-1 px-3 text-[9px] font-black rounded-full bg-zinc-800 text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                 <RefreshCcw size={10} className="animate-spin" /> Update
               </span>
            )}
          </div>
          
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black group-hover:text-blue-400 transition">{project.name}</div>
            <div className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-2">{project.short}</div>
            <div className="mt-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest">{project.stack}</div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="text-sm font-bold flex items-center gap-1.5 text-zinc-300 group-hover:text-white transition">
              View Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </Glass>
    </motion.button>
  );
}

function ProjectsPage({ onOpen }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-6xl px-4 sm:px-6 pb-16"
    >
      <header className="pt-4 sm:pt-6 mb-12">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight">Case Studies</h2>
        <p className="mt-4 text-zinc-400 text-lg max-w-2xl">
          Deep dives into engineered systems designed for scale, security, and high performance.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {PROJECTS.map((p, idx) => (
          <ProjectCard key={idx} project={p} onOpen={onOpen} />
        ))}
      </div>
    </motion.section>
  );
}

function HomePage({ setPath }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-6xl px-4 sm:px-6 pb-10"
    >
      <div className="grid gap-6 md:gap-10 pt-4 md:grid-cols-[1.25fr_0.75fr] md:items-start">
        <div className="space-y-6">
          <Glass className="rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="h-32 w-32" />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-300 mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2">
                <BadgeCheck className="h-4 w-4 text-blue-400" />
                {PROFILE.status}
              </span>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-7xl font-black tracking-tighter leading-[1.3] mb-6">
              <BouncyM />oses Obaseki<span className="text-blue-500">.</span>
            </h1>

            <div className="text-xl sm:text-2xl text-zinc-300 max-w-2xl leading-relaxed font-medium mb-10 min-h-[4rem]">
              <span className="block mb-1">{PROFILE.title}</span>
              <Typewriter items={PROFILE.summaryItems} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton onClick={() => setPath("projects")}>
                Explore Works <ArrowRight className="h-5 w-5" />
              </MagneticButton>

              <LetsTalkButton />
            </div>

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {METRICS.map((m) => (
                <div key={m.label} className="border-l border-zinc-800 pl-4 py-2">
                  <div className="text-3xl font-black tracking-tighter">{m.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{m.label}</div>
                  <div className="mt-1 text-[10px] text-zinc-400 leading-tight">{m.hint}</div>
                </div>
              ))}
            </div>
          </Glass>

          <div className="grid gap-6 sm:grid-cols-2">
            {SKILLS.map((s, idx) => (
              <Glass key={s.group} className="rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                    <s.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-xl font-black">{s.group}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <ToolPill key={t} label={t} />
                  ))}
                </div>
              </Glass>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Glass className="rounded-3xl p-8">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
               <BadgeCheck className="h-5 w-5 text-blue-400" /> Certifications
            </h3>
            <div className="space-y-4">
              {CERTS.map(c => (
                <div key={c} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-zinc-300">{c}</span>
                </div>
              ))}
            </div>
          </Glass>