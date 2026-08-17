import React, { useEffect, useState } from "react";
import {
  MapPin, AlertCircle, Clock, CheckCircle2,
  BarChart3, Mail, Plus, LogOut, User, ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const UserDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.name) { setLoading(false); return; }

    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch(`${API_BASE_URL}/issues/user/${encodeURIComponent(user.name)}`, { headers })
      .then(res => res.json())
      .then(data => { setIssues(data.issues || []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const stats = {
    total:      issues.length,
    resolved:   issues.filter(i => i.status === "Resolved").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    pending:    issues.filter(i => i.status === "Pending").length,
  };

  const filteredIssues = filter === "All" ? issues : issues.filter(i => i.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-surface/40 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-civic-saffron border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 font-bold">Syncing your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 p-4 lg:p-10 pt-24 font-inter transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">

        {/* ── LEFT: Profile & Stats ──── */}
        <aside className="lg:col-span-4 space-y-5">

          {/* User Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-glass border border-slate-100 dark:border-slate-800/80 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-civic-saffron to-civic-saffron-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-civic-saffron/20 font-outfit">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-none font-outfit">{user?.name || "Citizen"}</h2>
                <span className="text-xs font-bold text-civic-saffron bg-civic-saffron/10 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-civic-saffron/10">
                  Active Reporter
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800/80 pt-5">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <Mail size={16} className="text-civic-saffron" />
                <span className="text-sm font-medium truncate">{user?.email || "No Email"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <User size={16} className="text-civic-saffron" />
                <span className="text-sm font-medium capitalize">{user?.role || "citizen"}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-5 flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-2xl font-bold text-sm transition"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Impact Stats */}
          <div className="bg-civic-navy dark:bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-lg border border-white/5 dark:border-slate-800/80 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-civic-saffron animate-pulse" size={20} />
              <h3 className="font-bold uppercase tracking-wider text-sm font-outfit">Your Impact</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatBlock value={stats.total}      label="Reported"    color="bg-white/10"            textColor="text-white"       />
              <StatBlock value={stats.resolved}   label="Resolved"    color="bg-civic-emerald/20 border border-civic-emerald/20" textColor="text-civic-emerald"  />
              <StatBlock value={stats.inProgress} label="In Progress" color="bg-civic-navy/40 border border-civic-navy/20"     textColor="text-civic-navy-305 dark:text-civic-navy-200"    />
              <StatBlock value={stats.pending}    label="Pending"     color="bg-civic-saffron/20 border border-civic-saffron/20"   textColor="text-civic-saffron"   />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-glass border border-slate-100 dark:border-slate-800/80 animate-fade-in-up">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h3>
            <Link
              to="/report"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white rounded-2xl font-bold hover:from-civic-saffron-600 hover:to-civic-saffron-700 transition shadow-md shadow-civic-saffron/20 group"
            >
              <span className="flex items-center gap-2"><Plus size={18} /> Report New Issue</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </aside>

        {/* ── RIGHT: Issues List ────── */}
        <main className="lg:col-span-8 animate-slide-right">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white font-outfit">Your Reports</h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5 font-bold uppercase tracking-wider">{filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["All", "Pending", "In Progress", "Resolved"].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                  filter === tab
                    ? "bg-civic-navy dark:bg-slate-800 text-white shadow-md shadow-civic-navy/20"
                    : "bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-civic-saffron hover:text-civic-saffron"
                }`}
              >
                {tab}
                {tab !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    ({issues.filter(i => tab === "All" || i.status === tab).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {filteredIssues.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-16 rounded-[2.5rem] text-center border-2 border-dashed border-slate-205 dark:border-slate-800/80 shadow-glass">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-550 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-outfit">
                {filter === "All" ? "No reports yet" : `No ${filter} issues`}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto text-sm font-medium">
                {filter === "All"
                  ? "See something wrong in your city? Report it!"
                  : `You don't have any ${filter.toLowerCase()} issues.`}
              </p>
              {filter === "All" && (
                <Link
                  to="/report"
                  className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-civic-saffron-600 hover:to-civic-saffron-700 transition shadow-md shadow-civic-saffron/20"
                >
                  <Plus size={16} /> File First Report
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIssues.map((issue, idx) => (
                <Link
                  key={issue._id}
                  to={`/user/report/${issue._id}`}
                  className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-[2rem] p-4 gap-5 hover:shadow-lg transition-all border border-slate-100 dark:border-slate-800/60 w-full animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-full md:w-40 h-36 flex-shrink-0 rounded-[1.5rem] overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <img
                      src={issue.image}
                      alt="Issue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-2 py-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <StatusBadge status={issue.status} />
                      <div className="flex items-center gap-1 text-slate-405 dark:text-slate-500 text-xs font-semibold">
                        <Clock size={12} />
                        {new Date(issue.date_created).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-civic-saffron transition truncate font-outfit">
                      {issue.issuetype}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">{issue.description}</p>
                    <div className="flex items-center gap-2 text-civic-navy dark:text-civic-navy-300 text-xs font-bold pt-1">
                      <MapPin size={13} className="text-civic-saffron" /> {issue.location}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center self-center pr-2">
                    <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-civic-saffron group-hover:text-white transition-all shadow-sm">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const StatBlock = ({ value, label, color, textColor }) => (
  <div className={`${color} p-4 rounded-2xl`}>
    <p className={`text-3xl font-black ${textColor}`}>{value}</p>
    <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${textColor} opacity-80`}>{label}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    Pending:     "bg-civic-saffron/10 text-civic-saffron border border-civic-saffron/10",
    "In Progress": "bg-civic-navy/10 text-civic-navy dark:text-civic-navy-300 border border-civic-navy/10",
    Resolved:    "bg-civic-emerald/10 text-civic-emerald border border-civic-emerald/10",
  };
  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${map[status] || "bg-slate-50 text-slate-600"}`}>
      {status}
    </span>
  );
};

export default UserDashboard;
