import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Clock, AlertCircle, Loader2,
  ArrowLeft, CheckCircle2, Hammer, Calendar, ChevronRight
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

const UserReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_BASE_URL}/issues/${id}`, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Unable to load report");
        setIssue(data.issue);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-surface/40 dark:bg-slate-950 font-inter">
        <div className="text-center">
          <Loader2 className="animate-spin text-civic-saffron mx-auto mb-4" size={48} />
          <p className="font-bold text-slate-550 dark:text-slate-400 animate-pulse">Retrieving case files...</p>
        </div>
      </div>
    );

  if (!issue)
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-surface/40 dark:bg-slate-950 p-6 font-inter">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-glass text-center max-w-sm border border-red-100 dark:border-red-950/40">
          <AlertCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-outfit">Report Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
            This case might have been archived or the link is incorrect.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white py-4 rounded-2xl font-bold"
          >
            Return Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 pb-12 font-inter pt-24 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-650 dark:text-slate-300 hover:text-civic-saffron font-bold transition-all bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Reports
        </button>
        <div
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
            ${issue.workerImage
              ? "bg-civic-emerald/10 text-civic-emerald border-civic-emerald/20"
              : "bg-civic-saffron/10 text-civic-saffron border-civic-saffron/20"}`}
        >
          {issue.workerImage ? "Task Resolved" : "Resolution Pending"}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Original Complaint */}
          <div className="space-y-6 animate-slide-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-civic-saffron/10 text-civic-saffron rounded-lg flex items-center justify-center font-bold text-sm">01</div>
              <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-outfit">Original Complaint</h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass border border-slate-200 dark:border-slate-800/80 overflow-hidden group">
              <div className="relative">
                <img src={issue.image} alt="Original" className="w-full h-[320px] object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold">BEFORE</div>
              </div>
              <div className="p-8">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-outfit">{issue.issuetype}</h1>
                <div className="flex items-center gap-2 text-civic-navy dark:text-civic-navy-300 font-bold text-sm mb-4">
                  <MapPin size={16} className="text-civic-saffron" /> {issue.location}
                </div>
                <p className="text-slate-600 dark:text-slate-305 leading-relaxed bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 font-medium">
                  {issue.description}
                </p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Calendar size={14} /> {new Date(issue.date_created).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Clock size={14} />{" "}
                    {new Date(issue.date_created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Resolution Proof */}
          <div className="space-y-6 animate-slide-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-civic-emerald/10 text-civic-emerald rounded-lg flex items-center justify-center font-bold text-sm">02</div>
              <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-outfit">Resolution Proof</h2>
            </div>

            {issue.workerImage ? (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass border border-civic-emerald/20 dark:border-slate-800/80 overflow-hidden">
                <div className="relative">
                  <img src={issue.workerImage} alt="Resolved" className="w-full h-[320px] object-cover" />
                  <div className="absolute top-4 left-4 bg-civic-emerald text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Fixed
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-civic-emerald mb-4">
                    <CheckCircle2 size={24} className="animate-pulse" />
                    <h3 className="text-xl font-black font-outfit">Issue Resolved</h3>
                  </div>
                  {issue.workerNote && (
                    <div className="bg-civic-emerald/10 p-5 rounded-2xl border border-civic-emerald/20 italic text-slate-700 dark:text-slate-300 text-sm">
                      <span className="font-bold text-civic-emerald not-italic block mb-1">Worker Note:</span>
                      "{issue.workerNote}"
                    </div>
                  )}
                  <div className="mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>Verified Completion</span>
                    <span>{new Date(issue.workerUpdatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] h-[550px] flex flex-col items-center justify-center p-10 text-center shadow-glass">
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-6 animate-bounce">
                  <Hammer size={32} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-2 font-outfit">Work in Progress</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed text-sm font-medium">
                  Our ground team has been notified. Check back soon for the completion photo.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Still having issues with this location?
          </p>
          <button className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-3 rounded-2xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            Re-open Case <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReportDetails;
