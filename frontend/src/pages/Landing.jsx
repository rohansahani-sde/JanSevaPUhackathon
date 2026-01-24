import React from "react";
import { 
  MapPin, Camera, FileText, CheckCircle, 
  Trash2, Construction, Lamp, Droplets, ArrowRight 
} from "lucide-react";
import Issues from "./Issues";
import { Link } from "react-router-dom";

const issues = [
  { name: "Garbage Overflow", icon: <Trash2 className="w-5 h-5" /> },
  { name: "Potholes", icon: <Construction className="w-5 h-5" /> },
  { name: "Streetlights", icon: <Lamp className="w-5 h-5" /> },
  { name: "Water Leakage", icon: <Droplets className="w-5 h-5" /> },
  { name: "Open Drainage", icon: <FileText className="w-5 h-5" /> },
];

const steps = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Add Location",
    desc: "Pin the exact spot on our integrated map.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Upload Photo",
    desc: "Visual proof helps authorities act faster.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Describe",
    desc: "Add a brief note about the situation.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Track",
    desc: "Get real-time updates until it's fixed.",
    color: "bg-green-100 text-green-600"
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16">
          <div className="z-10 text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
              COMMUNITY FIRST
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Better Cities <br />
              <span className="text-blue-600 italic">Start with You.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Report potholes, garbage, or broken streetlights directly to local 
              authorities. Fast, transparent, and accountable governance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 group shadow-xl shadow-blue-200">
              <Link to={'/report'} >  Report an Issue</Link> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition">
               <a href="#view"> View Report</a>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <img
              src="https://res.cloudinary.com/dd4s9ife4/image/upload/v1769166485/users/ie0nw8zqmxdbvkeajzrl.png"
              alt="Civic Engagement"
              className="relative z-10 w-full rounded-3xl shadow-2xl transform hover:scale-[1.02] transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* ISSUES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Common Issues to Report</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition cursor-default flex items-center gap-3"
              >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  {issue.icon}
                </div>
                <span className="font-semibold text-slate-700">{issue.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* HOW IT WORKS */}
      <section id="how" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-800 tracking-tight">
            Four Steps to a Cleaner City
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group relative p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl hover:shadow-blue-100 transition duration-300">
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* issues */}
            <div id="view">
            <Issues  />
            </div>


      {/* CTA SECTION */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Ready to make a difference?
          </h2>
          <p className="mb-10 text-slate-400 text-lg max-w-xl mx-auto relative z-10">
            Join 5,000+ citizens who are already helping improve city infrastructure every day.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition relative z-10 shadow-xl shadow-blue-900/50">
            Get Started Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 font-medium">
            © 2026 Janseva Civic Platform. Made for a better tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;