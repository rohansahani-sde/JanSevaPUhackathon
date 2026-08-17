import React from "react";
import { Heart, Globe, Shield, Mail, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-civic-navy dark:bg-slate-950 pt-20 pb-0 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#E85D26_0%,transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#059669_0%,transparent_40%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-civic-gradient rounded-xl flex items-center justify-center text-white shadow-civic">
                <Flame size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white font-outfit">
                JanSeva
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Empowering citizens to build smarter, cleaner, and more accountable cities through transparent reporting.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail, Shield].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-civic-saffron-400 hover:border-civic-saffron/30 hover:bg-civic-saffron/5 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-civic-saffron-400">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="/#how" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="/#view" className="hover:text-white transition-colors">Active Reports</a></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-civic-saffron-400">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Status Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 bg-white/5 rounded-4xl border border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">System Status</span>
              </div>
              <p className="text-xs font-bold text-white">All Departments Online</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight font-medium">Updated 2 mins ago</p>
            </div>

            <div className="p-6 bg-civic-saffron/10 rounded-4xl border border-civic-saffron/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-civic-saffron-400 mb-1">Quick Report</p>
              <Link to="/report" className="text-sm font-bold text-white hover:text-civic-saffron-300 transition-colors">
                File an issue now →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © 2026 JanSeva Civic Platform.
          </p>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Made with <Heart size={14} className="text-red-500 fill-current mx-0.5" /> in India for a better tomorrow
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg">
              <Globe size={12} /> EN-IN
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg">
              <Shield size={12} /> SECURE
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor bottom strip */}
      <div className="tricolor-strip" />
    </footer>
  );
};

export default Footer;