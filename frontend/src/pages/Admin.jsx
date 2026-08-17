import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, AlertCircle, CheckCircle2,
  Clock, Search, ExternalLink, Bell, User,
  LogOut, Map, RefreshCw, TrendingUp, XCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { useToast } from "../components/Toast";

/* ── Animated Counter ───────────────────────── */
const AnimatedCounter = ({ target, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!target) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return <span>{count}</span>;
};

/* ── Status pill ────────────────────────────── */
const StatusPill = ({ status }) => {
  const map = {
    Pending:     "bg-civic-saffron/10 text-civic-saffron",
    "In Progress": "bg-civic-navy/10 text-civic-navy dark:text-civic-navy-300 dark:bg-civic-navy/20",
    Resolved:    "bg-civic-emerald/10 text-civic-emerald",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
};

/* ── Main Component ─────────────────────────── */
const Admin = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const [issueRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/issues/all`, { headers }),
        fetch(`${API_BASE_URL}/issues/stats`, { headers }),
      ]);
      const issueData = await issueRes.json();
      const statsData = await statsRes.json();
      setIssues(issueData || []);
      setStats(statsData.stats || {});
    } catch (err) {
      addToast("Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredIssues = issues.filter((issue) => {
    const matchStatus = statusFilter === "ALL" || issue.status === statusFilter;
    const matchSearch =
      issue.issuetype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.username?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const STATS = [
    { label: "Total Issues",  value: stats.total,      icon: <AlertCircle size={22} />,  color: "text-civic-saffron",   bg: "bg-civic-saffron/10",   border: "border-civic-saffron/10"   },
    { label: "Pending",       value: stats.pending,     icon: <Clock size={22} />,        color: "text-amber-500",  bg: "bg-amber-500/10",  border: "border-amber-500/10"  },
    { label: "In Progress",   value: stats.inProgress,  icon: <Map size={22} />,          color: "text-civic-navy dark:text-civic-navy-300", bg: "bg-civic-navy/10", border: "border-civic-navy/10" },
    { label: "Resolved",      value: stats.resolved,    icon: <CheckCircle2 size={22} />, color: "text-civic-emerald",bg: "bg-civic-emerald/10",border: "border-civic-emerald/10" },
  ];

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex font-inter">
      {/* ── SIDEBAR ────────────────── */}
      <aside className="w-64 bg-civic-navy dark:bg-slate-900 text-white hidden lg:flex flex-col p-6 shrink-0 border-r border-white/5 dark:border-slate-800">
        <div className="text-2xl font-black mb-10 tracking-tight font-outfit flex items-center gap-2">
          <span>🇮🇳</span> JAN<span className="text-civic-saffron">SEVA</span>
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full text-slate-350">Admin</span>
        </div>

        <nav className="space-y-1 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-civic-saffron to-civic-saffron-600 rounded-xl font-bold text-sm shadow-md shadow-civic-saffron/20 text-white">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium text-sm transition">
            <AlertCircle size={18} /> Reports
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium text-sm transition">
            <TrendingUp size={18} /> Analytics
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium text-sm transition">
            <User size={18} /> Manage Users
          </button>
        </nav>

        {/* Admin Profile */}
        <div className="bg-white/5 dark:bg-slate-800/80 border border-white/10 dark:border-slate-700/60 p-4 rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-civic-saffron rounded-xl flex items-center justify-center font-black text-lg text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-red-650 transition text-sm font-bold text-slate-300 hover:text-white"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ──────────── */}
      <main className="flex-1 overflow-y-auto min-w-0">

        {/* Top Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by type, location, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-civic-saffron dark:focus:border-civic-saffron rounded-xl focus:bg-white dark:focus:bg-slate-900 transition outline-none text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 text-slate-500 dark:text-slate-405 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              title="Refresh"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button className="p-2.5 text-slate-500 dark:text-slate-405 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative">
              <Bell size={18} />
              {stats.pending > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </button>
            <div className="w-9 h-9 bg-civic-saffron rounded-xl flex items-center justify-center text-white font-black text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
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

        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">Issue Management</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Monitor and manage all civic reports in real-time</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-glass hover:shadow-md transition-all"
              >
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-slate-500 dark:text-slate-450 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1 font-outfit">
                  {loading ? <span className="skeleton w-12 h-8 inline-block bg-slate-200 dark:bg-slate-700 animate-pulse rounded" /> : <AnimatedCounter target={stat.value || 0} />}
                </h3>
              </div>
            ))}
          </div>

          {/* Issues Table */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass border border-slate-100 dark:border-slate-800/80 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-outfit">Citizen Reports</h2>
                <p className="text-slate-400 dark:text-slate-550 text-xs mt-0.5 font-bold uppercase tracking-wider">{filteredIssues.length} cases found</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["ALL", "Pending", "In Progress", "Resolved"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                      statusFilter === status
                        ? "bg-civic-navy dark:bg-slate-800 text-white shadow-md shadow-civic-navy/20"
                        : "bg-slate-105 dark:bg-slate-800/50 text-slate-605 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400">
                <RefreshCw size={32} className="animate-spin mx-auto mb-3 opacity-40 text-civic-saffron" />
                <p className="font-bold text-sm">Loading reports...</p>
              </div>
            ) : filteredIssues.length === 0 ? (
              <div className="p-16 text-center text-slate-405">
                <XCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold">No issues found for selected filter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/70 dark:bg-slate-850/40 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-100 dark:border-slate-800/80">
                      <th className="px-6 py-4">Case ID</th>
                      <th className="px-6 py-4">Problem</th>
                      <th className="px-6 py-4">Reporter</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/85">
                    {filteredIssues.map((issue) => (
                      <tr key={issue._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition group">
                        <td className="px-6 py-4 font-mono text-xs text-civic-saffron font-black">
                          #{issue._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/admin/issues/${issue._id}`}
                            className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-civic-saffron transition text-sm font-outfit"
                          >
                            {issue.issuetype}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-550 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-205">{issue.username || "Anonymous"}</span>
                          <br />
                          <span className="text-[10px] text-slate-400">
                            {new Date(issue.date_created).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-350">{issue.location}</td>
                        <td className="px-6 py-4">
                          <StatusPill status={issue.status} />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/admin/issues/${issue._id}`)}
                            className="p-2 rounded-xl hover:bg-civic-saffron/10 hover:text-civic-saffron text-slate-400 transition"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
