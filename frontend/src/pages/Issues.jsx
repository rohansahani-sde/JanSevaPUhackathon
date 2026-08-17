import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowBigUp,
  MessageSquare,
  MapPin,
  User,
  ChevronRight,
  Loader2,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

const FILTERS = ["All", "Pending", "In Progress", "Resolved"];

const Issues = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState({});
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/issues/all`);
        const data = await res.json();
        setIssuesData(data);
        
        // Stable mock upvotes based on MongoDB ID hash to avoid randomness on every load
        const initVotes = {};
        data.forEach(issue => {
          const hash = issue._id ? parseInt(issue._id.slice(-4), 16) : 0;
          initVotes[issue._id] = (hash % 25) + 3;
        });
        setUpvotes(initVotes);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleUpvote = (id) => {
    const upvotedList = JSON.parse(localStorage.getItem("upvotedIssues") || "[]");
    if (upvotedList.includes(id)) return;
    
    setUpvotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    upvotedList.push(id);
    localStorage.setItem("upvotedIssues", JSON.stringify(upvotedList));
  };

  const isUpvoted = (id) => {
    const upvotedList = JSON.parse(localStorage.getItem("upvotedIssues") || "[]");
    return upvotedList.includes(id);
  };

  const filteredIssues =
    activeFilter === "All"
      ? issuesData
      : issuesData.filter(i => i.status === activeFilter);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const getDetailLink = (issueId) => {
    if (!token) return "/login";
    if (role === "admin" || role === "worker") return `/admin/issues/${issueId}`;
    return `/user/report/${issueId}`;
  };

  if (loading)
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4 text-civic-saffron" size={40} />
        <p className="font-bold uppercase tracking-widest text-xs">Syncing Live Feed...</p>
      </div>
    );

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-inter">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-civic-saffron font-black text-xs uppercase tracking-[0.2em]">
            <TrendingUp size={16} /> Live Community Feed
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
            Recent Reports
          </h2>
        </div>

        {/* Functional Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === tab
                  ? "bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white shadow-lg shadow-civic-saffron/20"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-civic-saffron dark:hover:border-civic-saffron-400 hover:text-civic-saffron dark:hover:text-civic-saffron-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <RefreshCw size={48} className="mx-auto mb-4 opacity-30 animate-spin" style={{ animationDuration: '3s' }} />
          <p className="font-bold text-lg">No {activeFilter !== "All" ? activeFilter : ""} issues found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIssues.map((issue) => (
            <div
              key={issue._id}
              className="group bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-[2.5rem] border border-slate-100 dark:border-slate-700/60 shadow-glass hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={issue.image}
                  alt={issue.issuetype}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-5 left-5">
                  <StatusBadge status={issue.status} />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-civic-saffron transition-colors font-outfit">
                      {issue.issuetype}
                    </h3>
                    <div className="flex items-center gap-1 text-civic-navy dark:text-civic-navy-300 font-bold text-xs mt-1">
                      <MapPin size={14} className="text-civic-saffron" /> {issue.location}
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed mb-6 font-medium">
                  {issue.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between py-4 border-y border-slate-50 dark:border-slate-700/60 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <User size={14} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span className="text-slate-900 dark:text-slate-200 block">{issue.username || "Citizen"}</span>
                      {new Date(issue.date_created).toLocaleDateString()}
                    </div>
                  </div>
                  <Link
                    to={getDetailLink(issue._id)}
                    className="w-10 h-10 bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 group-hover:bg-civic-saffron group-hover:text-white transition-all shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>

                {/* Interaction Bar */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleUpvote(issue._id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                      isUpvoted(issue._id)
                        ? "bg-civic-saffron/20 text-civic-saffron"
                        : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-civic-saffron/10 hover:text-civic-saffron"
                    }`}
                  >
                    <ArrowBigUp size={20} className={isUpvoted(issue._id) ? "fill-current animate-bounce" : ""} />
                    Upvote {upvotes[issue._id] || 0}
                  </button>
                  <button className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all">
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const StatusBadge = ({ status }) => {
  const themes = {
    Resolved: "bg-civic-emerald text-white shadow-lg shadow-civic-emerald/20",
    Pending: "bg-civic-saffron text-white shadow-lg shadow-civic-saffron/20",
    "In Progress": "bg-civic-navy text-white shadow-lg shadow-civic-navy/20 dark:bg-slate-700/80 dark:border dark:border-slate-600",
  };
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
        themes[status] || "bg-slate-500 text-white"
      }`}
    >
      {status}
    </span>
  );
};

export default Issues;