import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Map,
  Clock,
  Search,
  ExternalLink,
  Bell,
  User,
  Wrench
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/issues/worker");
        const data = await res.json();
        setIssues(data.issues || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6">
        <div className="text-2xl font-black mb-10">
          JANSEVA <span className="text-blue-500 font-normal">Worker</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl font-bold">
            <LayoutDashboard size={20} /> My Work
          </button>
        </nav>

        <div className="bg-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-500 mb-2">Logged in as</p>
          <p className="font-bold text-sm">Field Worker</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        
        {/* HEADER */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search work by location or type..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-slate-500" />
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              W
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8 max-w-7xl mx-auto">

          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Wrench className="text-blue-600" /> Assigned Work
          </h2>

          <div className="bg-white rounded-[2rem] shadow border overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-xs font-black">
                  <th className="px-6 py-4">Issue ID</th>
                  <th className="px-6 py-4">Problem</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {issues.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-400">
                      No work assigned yet
                    </td>
                  </tr>
                )}

                {issues.map(issue => (
                  <tr key={issue._id}>
                    <td className="px-6 py-4 font-mono text-blue-600 font-bold">
                      {issue._id.slice(-6)}
                    </td>

                    <td className="px-6 py-4 font-bold">
                      <Link to={`/admin/issues/${issue._id}`} > {issue.issuetype} </Link>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {issue.location}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-black">
                        In Progress
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
      </main>
    </div>
  );
};

export default WorkerDashboard;
