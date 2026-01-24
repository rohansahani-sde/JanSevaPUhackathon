import React, { useState } from "react";
import { 
  LayoutDashboard, Map, AlertCircle, CheckCircle2, 
  Clock, Search, Filter, MoreVertical, 
  ExternalLink, Menu, Bell, User
} from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// const STATS = [
//   { label: "Total Issues", value: "1,284", icon: <AlertCircle />, color: "text-blue-600", bg: "bg-blue-50" },
//   { label: "Pending", value: "142", icon: <Clock />, color: "text-orange-600", bg: "bg-orange-50" },
//   { label: "In Progress", value: "84", icon: <Map />, color: "text-purple-600", bg: "bg-purple-50" },
//   { label: "Resolved", value: "1,058", icon: <CheckCircle2 />, color: "text-green-600", bg: "bg-green-50" },
// ];

const INITIAL_ISSUES = [
  { id: "REP-001", type: "Garbage Overflow", location: "Downtown Street", reporter: "Amit K.", date: "2 mins ago", status: "Pending" },
  { id: "REP-002", type: "Pothole", location: "Highway 42", reporter: "Sana P.", date: "1 hour ago", status: "In Progress" },
  { id: "REP-003", type: "Water Leakage", location: "North Sector 4", reporter: "Rahul G.", date: "3 hours ago", status: "Resolved" },
  { id: "REP-004", type: "Streetlight", location: "Park Avenue", reporter: "Sneha W.", date: "5 hours ago", status: "Pending" },
];




const Admin = () => {

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    //   const [issues] = useState(INITIAL_ISSUES);
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
});

useEffect(() => {
    const fetchData = async () => {
        try {
            const issueRes = await fetch("http://localhost:5000/api/issues/all");
            const issueData = await issueRes.json();
            //   setIssues(issueData.issues);
            console.log(issueData)
            setIssues(issueData || []); // 🔥 SAFE
            
            
            const statsRes = await fetch("http://localhost:5000/api/issues/stats");
            const statsData = await statsRes.json();
            setStats(statsData.stats);
        } catch (err) {
            console.error(err);
        }
    };
    
    fetchData();
}, []);

const filteredIssues = issues.filter((issue) => {
        const matchStatus =
        statusFilter === "ALL" || issue.status === statusFilter;
        
        const matchSearch =
        issue.issuetype.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue._id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchStatus && matchSearch;
    });

const STATS = [
  { label: "Total Issues", value: stats.total, icon: <AlertCircle />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Pending", value: stats.pending, icon: <Clock />, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "In Progress", value: stats.inProgress, icon: <Map />, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Resolved", value: stats.resolved, icon: <CheckCircle2 />, color: "text-green-600", bg: "bg-green-50" },
];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6">
        <div className="text-2xl font-black mb-10 px-2 tracking-tight">JANSEVA <span className="text-blue-500 font-normal">Admin</span></div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl font-bold transition">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition">
            <AlertCircle size={20} /> Reports
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition">
            <Map size={20} /> Map View
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition">
            <User size={20} /> Manage Users
          </button>
        </nav>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-500 mb-2">Logged in as</p>
          <p className="font-bold text-sm">Official Admin #4</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
            type="text"
            placeholder="Search reports, ID, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl
            focus:bg-white focus:ring-2 focus:ring-blue-600 transition outline-none"
            />
            
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-blue-50">A</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Citizen Reports</h2>
              <div className="flex gap-2">
                {["ALL", "Pending", "In Progress", "Resolved"].map((status) => (
                    <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition
                        ${statusFilter === status
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                        `}
                    >
                        {status}
                    </button>
                ))}
                </div>
            
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-black tracking-widest">
                    <th className="px-6 py-4">Issue ID</th>
                    <th className="px-6 py-4">Problem Type</th>
                    <th className="px-6 py-4">Reporter</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredIssues.map((issue) => (
                        <tr key={issue._id}>
                            <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">
                                {issue._id.slice(-6)}
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-700">
                               <Link to={`/admin/issues/${issue._id}`} > {issue.issuetype} </Link>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                                {issue.username || "Anonymous"} <br />
                                <span className="text-[10px] text-slate-400">
                                    {new Date(issue.date_created).toLocaleString()}
                                </span>
                            </td>
                            
                            <td className="px-6 py-4 text-sm text-slate-600">
                                {issue.location}
                            </td>
                            
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black
                                ${issue.status === "Pending"
                                    ? "bg-orange-100 text-orange-600"
                                    : issue.status === "In Progress"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-green-100 text-green-600"}`}>
                                    {issue.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                onClick={() => navigate(`/admin/issues/${issue._id}`)}
                                className="p-2 rounded-lg hover:bg-slate-100 hover:text-blue-500"
                                >
                                <ExternalLink size={16} className="" />
                                </button>
                            </td>
                            
                        </tr>
                    ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;