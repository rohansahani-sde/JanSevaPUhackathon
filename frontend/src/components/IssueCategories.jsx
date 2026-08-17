import React from "react";
import { 
  Trash2, Construction, Lamp, 
  Droplets, FileText, ChevronRight 
} from "lucide-react";

const issues = [
  { 
    name: "Garbage Overflow", 
    icon: <Trash2 className="w-6 h-6" />, 
    color: "text-civic-saffron dark:text-civic-saffron-400", 
    bg: "bg-civic-saffron/10",
    border: "hover:border-civic-saffron/30 hover:shadow-civic-saffron/10",
    progressBg: "bg-civic-saffron"
  },
  { 
    name: "Potholes", 
    icon: <Construction className="w-6 h-6" />, 
    color: "text-amber-600 dark:text-amber-400", 
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "hover:border-amber-500/30 hover:shadow-amber-500/10",
    progressBg: "bg-amber-600"
  },
  { 
    name: "Streetlights", 
    icon: <Lamp className="w-6 h-6" />, 
    color: "text-yellow-600 dark:text-yellow-400", 
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "hover:border-yellow-500/30 hover:shadow-yellow-500/10",
    progressBg: "bg-yellow-500"
  },
  { 
    name: "Water Leakage", 
    icon: <Droplets className="w-6 h-6" />, 
    color: "text-civic-navy dark:text-civic-navy-300", 
    bg: "bg-civic-navy/10",
    border: "hover:border-civic-navy/30 hover:shadow-civic-navy/10",
    progressBg: "bg-civic-navy"
  },
  { 
    name: "Open Drainage", 
    icon: <FileText className="w-6 h-6" />, 
    color: "text-civic-emerald dark:text-civic-emerald-400", 
    bg: "bg-civic-emerald/10",
    border: "hover:border-civic-emerald/30 hover:shadow-civic-emerald/10",
    progressBg: "bg-civic-emerald"
  },
];

const IssueCategories = () => {
  return (
    <section className="py-24 bg-civic-surface/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Glassmorphism feel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4 font-outfit">
              Common Issues to Report
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed font-inter">
              Select a category to see active reports in your area or to file a new complaint with the authorities.
            </p>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {issues.map((issue, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/60 shadow-glass transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer flex flex-col items-center text-center ${issue.border}`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${issue.bg} ${issue.color} rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {issue.icon}
              </div>

              {/* Text Content */}
              <h3 className="font-black text-slate-800 dark:text-white text-lg mb-2 tracking-tight font-outfit">
                {issue.name}
              </h3>
              
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-civic-saffron transition-colors">
                View Reports <ChevronRight size={12} />
              </div>

              {/* Subtle Progress Bar (Visual Polish) */}
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-6 overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ${issue.progressBg} opacity-30`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IssueCategories;