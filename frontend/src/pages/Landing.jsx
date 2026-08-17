import React, { useEffect, useRef, useState } from "react";
import {
  MapPin, Camera, FileText, CheckCircle,
  Trash2, Construction, Lamp, Droplets, ArrowRight,
  Sparkles, ShieldCheck, TrendingUp, Users, Award
} from "lucide-react";
import Issues from "./Issues";
import { Link } from "react-router-dom";
import IssueCategories from "../components/IssueCategories";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config/api";

/* ── Animated Counter ────────────────────── */
const AnimatedCounter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = null;
          const duration = 1800;
          const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* ── Data ────────────────────────────────── */
const steps = [
  { icon: <MapPin className="w-6 h-6" />,    title: "Add Location",  desc: "Pin the exact spot on the map.",             color: "bg-civic-saffron/10 text-civic-saffron"   },
  { icon: <Camera className="w-6 h-6" />,    title: "Upload Photo",  desc: "Visual proof helps authorities act faster.", color: "bg-civic-navy/10 text-civic-navy dark:text-civic-navy-300" },
  { icon: <FileText className="w-6 h-6" />,  title: "Describe",      desc: "Add a brief note about the situation.",      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20" },
  { icon: <CheckCircle className="w-6 h-6" />,title: "Track",        desc: "Get real-time updates until it's fixed.",    color: "bg-civic-emerald/10 text-civic-emerald"  },
];

const impactStats = [
  { icon: <Users size={28} />,    label: "Active Citizens", value: 5000,  suffix: "+" },
  { icon: <FileText size={28} />, label: "Issues Filed",    value: 12000, suffix: "+"  },
  { icon: <Award size={28} />,    label: "Issues Resolved", value: 9800,  suffix: "+"  },
  { icon: <TrendingUp size={28} />,label: "Cities Covered", value: 47,    suffix: ""   },
];

/* ── Component ───────────────────────────── */
const Landing = () => {
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/issues/stats`)
      .then(r => r.json())
      .then(d => setLiveStats(d.stats))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-civic-surface dark:bg-slate-900 font-inter text-slate-900 dark:text-slate-50 transition-colors duration-300">

      {/* ── HERO ───────────────────────────── */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden bg-mesh-pattern">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-civic-saffron-100 dark:bg-civic-saffron-900/10 rounded-full blur-[120px] opacity-40 pointer-events-none animate-float" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-civic-navy-100 dark:bg-civic-navy-900/10 rounded-full blur-[80px] opacity-30 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16 relative z-10">
          <div className="text-center lg:text-left animate-slide-up">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-civic-saffron/10 dark:bg-civic-saffron/20 text-civic-saffron text-xs font-black uppercase tracking-widest mb-5">
              🇮🇳 Community Governance
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.05] dark:text-white font-outfit">
              Better Cities <br />
              <span className="bg-gradient-to-r from-civic-saffron to-civic-navy bg-clip-text text-transparent dark:from-civic-saffron-400 dark:to-civic-navy-300">Start with You.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              Report potholes, garbage, broken streetlights directly to local
              authorities. Fast, transparent, and accountable governance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/report"
                className="bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-civic-saffron-600 hover:to-civic-saffron-700 transition flex items-center justify-center gap-2 group shadow-lg shadow-civic-saffron/20 hover:shadow-civic-saffron/30 hover:-translate-y-0.5 active:translate-y-0 duration-200"
              >
                Report an Issue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#view"
                className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg hover:border-civic-saffron hover:text-civic-saffron dark:hover:border-civic-saffron-400 dark:hover:text-civic-saffron-400 transition flex items-center justify-center duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                View Reports
              </a>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-civic-saffron-100 dark:bg-civic-saffron-900/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <img
              src="https://res.cloudinary.com/dd4s9ife4/image/upload/v1769166485/users/ie0nw8zqmxdbvkeajzrl.png"
              alt="Citizens reporting civic issues"
              className="relative z-10 w-full rounded-3xl shadow-glass-lg border border-white/20 dark:border-slate-800/40 transform hover:scale-[1.01] transition duration-500"
            />

            {/* Floating badge */}
            {liveStats && (
              <div className="absolute -bottom-6 -left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-glass border border-slate-100 dark:border-slate-700/60 px-6 py-4 z-20 flex items-center gap-4 animate-float">
                <div className="w-10 h-10 rounded-full bg-civic-saffron/10 dark:bg-civic-saffron/20 flex items-center justify-center text-civic-saffron">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Live Issues</p>
                  <p className="text-xl font-black text-civic-navy dark:text-white mt-0.5">
                    <AnimatedCounter target={liveStats.total} /> <span className="text-xs font-bold text-slate-400 dark:text-slate-500">reported</span>
                  </p>
                  <p className="text-[11px] text-civic-emerald font-extrabold mt-0.5 flex items-center gap-1">
                    <span>✓</span> <AnimatedCounter target={liveStats.resolved} /> resolved
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ───────────────────── */}
      <section className="py-16 bg-gradient-to-b from-civic-navy-900 to-civic-navy dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="group relative text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-civic-saffron/30 transition-all duration-300 hover:shadow-navy-lg">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-civic-saffron mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <p className="text-4xl font-black text-white mb-1 font-outfit">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISSUE CATEGORIES ───────────────── */}
      <IssueCategories />

      {/* ── HOW IT WORKS ───────────────────── */}
      <section id="how" className="py-24 bg-gradient-to-b from-civic-surface to-white dark:from-slate-900/30 dark:to-slate-950/20 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-black text-civic-saffron uppercase tracking-[0.3em] mb-4 inline-block">Process</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
              Four Steps to a Better Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-civic-saffron/20 via-civic-navy/20 to-civic-emerald/20 -z-0" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white dark:bg-slate-800/80 backdrop-blur-md border border-slate-100 dark:border-slate-700/60 hover:shadow-glass-lg hover:-translate-y-1.5 transition-all duration-300 z-10"
              >
                <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-700/40 text-6xl font-black leading-none select-none transition-colors font-outfit">
                  0{index + 1}
                </div>
                <div className={`w-14 h-14 ${step.color} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white font-outfit">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE FEED ──────────────────────── */}
      <div id="view">
        <Issues />
      </div>

      {/* ── CTA ────────────────────────────── */}
      <section className="px-6 py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-civic-saffron-500/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto bg-gradient-to-r from-civic-navy to-civic-navy-950 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-navy-lg">
          {/* Background mesh */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-mesh-pattern" />

          {/* Floating icon */}
          <div className="relative z-10 flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center animate-float">
              <Sparkles className="text-civic-saffron" size={32} />
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight font-outfit">
              Ready to make a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-civic-saffron to-amber-300">
                real difference?
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-slate-300 text-lg font-medium leading-relaxed font-inter">
              Join a network of{" "}
              <span className="text-white font-bold">5,000+ responsible citizens</span>.
              Together, we've resolved 12k+ local issues this year alone.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white px-12 py-5 rounded-[2rem] font-black text-xl transition-all shadow-lg shadow-civic-saffron/30 hover:shadow-civic-saffron/50 flex items-center gap-3 active:scale-95 duration-200"
              >
                Join JanSeva Today
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center gap-8 text-slate-500 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-civic-saffron/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verified Platform</span>
              </div>
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Privacy Focused</div>
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">100% Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────── */}
      <Footer />
    </div>
  );
};

export default Landing;