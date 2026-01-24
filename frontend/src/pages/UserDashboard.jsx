import React, { useEffect, useState } from "react";
import { 
  MapPin, AlertCircle, Clock, CheckCircle2, 
  BarChart3, User, Mail, Phone, Settings, Plus 
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);



  // Safely parse user data
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.name) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/issues/user/${user.name}`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.issues || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Calculate Stats for the "Impact" section
  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === "Resolved").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    pending: issues.filter(i => i.status === "Pending").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold tracking-tight">Syncing your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PROFILE & IMPACT */}
        <aside className="lg:col-span-4 space-y-6">
          {/* User Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-none">{user?.name || "Citizen User"}</h2>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">Active Reporter</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-50 pt-6">
              <div className="flex items-center gap-3 text-slate-500">
                <Mail size={18} /> <span className="text-sm font-medium">{user?.email || "No Email"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Phone size={18} /> <span className="text-sm font-medium">{user?.phone || "No Phone"}</span>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition">
                <Settings size={18} /> Edit Profile
              </button>
            </div>
          </div>

          {/* Impact/Stats Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-blue-400" />
              <h3 className="font-bold text-lg uppercase tracking-wider">Your Impact</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-3xl font-black">{stats.total}</p>
                <p className="text-xs text-white/50 font-bold uppercase">Reported</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-2xl border border-green-500/20">
                <p className="text-3xl font-black text-green-400">{stats.resolved}</p>
                <p className="text-xs text-green-400 font-bold uppercase">Resolved</p>
              </div>
              <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/20">
                <p className="text-3xl font-black text-blue-400">{stats.inProgress}</p>
                <p className="text-xs text-blue-400 font-bold uppercase">In Progress</p>
              </div>
              <div className="bg-orange-500/20 p-4 rounded-2xl border border-orange-500/20">
                <p className="text-3xl font-black text-orange-400">{stats.pending}</p>
                <p className="text-xs text-orange-400 font-bold uppercase">Pending</p>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: LIST OF ISSUES */}
        <main className="lg:col-span-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-slate-900">Your Reports</h2>
             <Link to={'/report'} > 
            <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 group">
             <Plus className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
             </Link>
          </div>

          {issues.length === 0 ? (
            <div className="bg-white p-16 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">No active reports</h3>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto">See something wrong in your city? Report it and make a change!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {issues.map((issue) => (
                <div key={issue._id} className="group bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:shadow-slate-100 transition-all border border-slate-50">
                  <div className="w-full md:w-48 h-40 flex-shrink-0">
                    <img 
                      src={issue.image} 
                      alt="Issue" 
                      className="w-full h-full object-cover rounded-[1.8rem]"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-3 py-2">
                    <div className="flex justify-between items-start">
                      <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full 
                        ${issue.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 
                          issue.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                          'bg-green-50 text-green-600'}`}>
                        {issue.status}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <Clock size={14} />
                        {new Date(issue.date_created).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{issue.issuetype}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{issue.description}</p>
                    
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pt-2">
                      <MapPin size={14} className="text-red-400" />
                      {issue.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default UserDashboard;