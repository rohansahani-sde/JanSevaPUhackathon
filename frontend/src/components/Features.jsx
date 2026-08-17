import React from "react";
import {
  Camera,
  MapPin,
  ShieldCheck,
  User,
  Wrench,
  CheckCircle2,
  Bell,
  BarChart3,
  ArrowRight
} from "lucide-react";

const features = [
  {
    title: "Citizen Reporting",
    icon: <Camera size={24} />,
    color: "text-civic-saffron dark:text-civic-saffron-400",
    bg: "bg-civic-saffron/10",
    points: [
      "Real-time photo capture",
      "Exact location tagging",
      "Multi-category reporting",
    ],
  },
  {
    title: "Live Tracking",
    icon: <MapPin size={24} />,
    color: "text-civic-emerald dark:text-civic-emerald-400",
    bg: "bg-civic-emerald/10",
    points: [
      "Pinpoint GPS accuracy",
      "Route optimization for teams",
      "Duplicate entry detection",
    ],
  },
  {
    title: "Worker Management",
    icon: <Wrench size={24} />,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    points: [
      "Role-specific task lists",
      "Work-completion proof",
      "Post-resolution notes",
    ],
  },
  {
    title: "Admin Control",
    icon: <ShieldCheck size={24} />,
    color: "text-civic-navy dark:text-civic-navy-300",
    bg: "bg-civic-navy/10",
    points: [
      "Automated task assignment",
      "Work proof verification",
      "Centralized issue auditing",
    ],
  },
  {
    title: "Status Pipeline",
    icon: <CheckCircle2 size={24} />,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    points: [
      "Real-time status updates",
      "Citizen feedback loop",
      "Process accountability",
    ],
  },
  {
    title: "Smart Alerts",
    icon: <Bell size={24} />,
    color: "text-civic-saffron dark:text-civic-saffron-400",
    bg: "bg-civic-saffron/10",
    points: [
      "Push progress updates",
      "New report notifications",
      "Worker task reminders",
    ],
  },
  {
    title: "RBAC Security",
    icon: <User size={24} />,
    color: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-100 dark:bg-slate-800",
    points: [
      "Role-based access control",
      "Secure citizen privacy",
      "Encrypted data storage",
    ],
  },
  {
    title: "Civic Analytics",
    icon: <BarChart3 size={24} />,
    color: "text-civic-navy dark:text-civic-navy-300",
    bg: "bg-civic-navy/10",
    points: [
      "Area-wise hot-spotting",
      "Performance benchmarks",
      "Data-driven planning",
    ],
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-civic-surface/40 dark:bg-slate-900 transition-colors duration-300 overflow-hidden font-inter">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-civic-saffron">
              Core Capabilities
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter font-outfit">
              A complete toolkit for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-civic-saffron to-civic-navy dark:from-civic-saffron-400 dark:to-civic-navy-350">
                Civic Governance.
              </span>
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm">
            Designed for transparency and accountability at every level of city management.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-start p-2 transition-all"
            >
              {/* Icon Box */}
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight font-outfit">
                {feature.title}
              </h3>

              <ul className="space-y-3">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-500 dark:text-slate-450">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-civic-saffron shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Subtle Decorative Element */}
              <div className="absolute -bottom-4 -left-2 w-0 h-1 bg-civic-saffron group-hover:w-12 transition-all duration-500 opacity-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;