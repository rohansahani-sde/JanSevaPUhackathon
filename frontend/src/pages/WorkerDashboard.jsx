import React, { useEffect, useState } from "react";
import {
  LayoutDashboard, Search, ExternalLink, Bell,
  LogOut, Wrench, MapPin, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { useToast } from "../components/Toast";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_BASE_URL}/issues/worker`, { headers });
        const data = await res.json();
        setIssues(data.issues || []);
      } catch (err) {
        console.error(err);
        addToast("Failed to load assigned work", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredIssues = issues.filter((issue) => {
    const q = searchTerm.toLowerCase();
    return (
      issue.location?.toLowerCase().includes(q) ||
      issue.issuetype?.toLowerCase().includes(q) ||
      issue._id?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 flex font-inter transition-colors duration-300">

      {/* ── SIDEBAR ─────────── */}
      <aside className="w-64 bg-civic-navy dark:bg-slate-900 text-white hidden lg:flex flex-col p-6 shrink-0 border-r border-white/5 dark:border-slate-800">
        <div className="text-2xl font-black mb-10 tracking-tight font-outfit flex items-center gap-2">
          <span>🇮🇳</span> JAN<span className="text-amber-500">SEVA</span>
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full text-slate-350">Worker</span>
        </div>

        <nav className="space-y-1 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-bold text-sm shadow-md shadow-amber-500/20 text-white">
            <LayoutDashboard size={18} /> My Work
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium text-sm transition">
            <CheckCircle2 size={18} /> Completed
          </button>
        </nav>

        {/* Worker stats badge */}
        <div className="bg-white/5 dark:bg-slate-800/80 border border-white/10 dark:border-slate-700/60 rounded-2xl p-4 mb-4 text-center">
          <p className="text-2xl font-black text-amber-500">{issues.length}</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Active Tasks</p>
        </div>

        {/* Worker profile */}
        <div className="bg-white/5 dark:bg-slate-800/80 border border-white/10 dark:border-slate-700/60 p-4 rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-lg text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "W"}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{user?.name || "Field Worker"}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-red-650 transition text-sm font-bold text-slate-350 hover:text-white"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────── */}
      <main className="flex-1 overflow-y-auto min-w-0">

        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/85 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by location, type, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-amber-500 dark:focus:border-amber-550 rounded-xl focus:bg-white dark:focus:bg-slate-900 transition outline-none text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-slate-400" />
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-white font-black text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "W"}
            </div>
            {/* Mobile logout */}
            <button
              onClick={handleLogout}
              className="lg:hidden p-2.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 font-outfit">
              <Wrench className="text-amber-500 animate-float" size={28} /> Assigned Work
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
              {filteredIssues.length} active issue{filteredIssues.length !== 1 ? "s" : ""} require{filteredIssues.length === 1 ? "s" : ""} your attention
            </p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl h-56 animate-pulse" />
              ))}
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-205 dark:border-slate-800/80 shadow-glass">
              <AlertCircle size={48} className="text-slate-200 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-2 font-outfit">
                {searchTerm ? "No results found" : "No work assigned yet"}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm">
                {searchTerm ? "Try different search terms." : "New issues will appear here once assigned."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.map((issue, idx) => (
                <WorkerCard key={issue._id} issue={issue} idx={idx} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* ── Worker Issue Card ── */
const WorkerCard = ({ issue, idx, navigate }) => {
  // Determine priority indicator based on issue age
  const issueAgeDays = (new Date() - new Date(issue.date_created)) / (1000 * 60 * 60 * 24);
  const isHighPriority = issueAgeDays > 2;

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-glass hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <img
          src={issue.image}
          alt={issue.issuetype}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Urgent/Priority Badge */}
        <div className="absolute top-4 left-4">
          {isHighPriority ? (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1 animate-pulse">
              ⚠️ High Urgency
            </span>
          ) : (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
              Normal Priority
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <span className="bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {issue.status}
          </span>
          <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            #{issue._id.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2 group-hover:text-amber-500 transition font-outfit">{issue.issuetype}</h3>
        <div className="flex items-center gap-1.5 text-slate-550 dark:text-slate-400 text-xs font-semibold mb-1">
          <MapPin size={13} className="text-amber-550" /> {issue.location}
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-medium mb-5">
          <Clock size={13} /> {new Date(issue.date_created).toLocaleDateString("en-IN")}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/admin/issues/${issue._id}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 transition"
          >
            <ExternalLink size={15} /> View
          </button>
          <button
            onClick={() => navigate(`/worker/issues/${issue._id}/upload-proof`)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl text-sm font-bold transition shadow-md shadow-amber-500/20"
          >
            📷 Submit Proof
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
