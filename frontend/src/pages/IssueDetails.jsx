import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, User, Calendar, Clock,
  Loader2, Shield, CheckCircle2, AlertTriangle, Info
} from "lucide-react";
import { API_BASE_URL } from "../config/api";
import { useToast } from "../components/Toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    fetch(`${API_BASE_URL}/issues/${id}`, { headers })
      .then(res => res.json())
      .then(data => {
        setIssue(data.issue);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        addToast("Failed to load issue details", "error");
        setLoading(false);
      });
  }, [id]);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_BASE_URL}/issues/${id}/status`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setIssue(prev => ({ ...prev, status: data.status }));
        addToast(`Status updated to "${status}" successfully`, "success");
      } else {
        addToast(data.message || "Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Network error. Please try again.", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-surface/40 dark:bg-slate-950">
        <div className="text-center animate-fade-in-up">
          <Loader2 className="animate-spin text-civic-saffron mx-auto mb-4" size={40} />
          <p className="text-slate-500 dark:text-slate-400 font-bold">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-surface/40 dark:bg-slate-950 p-6">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-glass border border-slate-100 dark:border-slate-800 text-center max-w-sm">
          <AlertTriangle size={48} className="text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-outfit">Issue Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">This report may have been removed or archived.</p>
          <button onClick={() => navigate(-1)} className="w-full bg-gradient-to-r from-civic-saffron to-civic-saffron-600 text-white py-4 rounded-2xl font-bold hover:from-civic-saffron-600 hover:to-civic-saffron-700 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-955 pb-12 font-inter pt-24 transition-colors duration-300">

      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-bold text-slate-650 dark:text-slate-300 hover:text-civic-saffron transition group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <span className="text-xs font-mono bg-white dark:bg-slate-905 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 px-4 py-1.5 rounded-full font-bold">
          CASE #{id.slice(-8).toUpperCase()}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT COLUMN ─────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Main Issue Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass border border-slate-100 dark:border-slate-800/80 overflow-hidden animate-fade-in-up">
            <div className="relative">
              <img
                src={issue.image}
                alt="Issue"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute top-4 left-4">
                <StatusPill status={issue.status} />
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3 font-outfit">{issue.issuetype}</h1>
              <div className="flex items-center gap-2 text-civic-navy dark:text-civic-navy-300 font-bold mb-6">
                <MapPin size={18} className="text-civic-saffron" /> {issue.location}
              </div>
              <p className="bg-slate-55 dark:bg-slate-800/60 p-6 rounded-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {issue.description}
              </p>

              {/* Worker upload link */}
              {issue.status === "In Progress" && role === "worker" && (
                <Link
                  to={`/worker/issues/${issue._id}/upload-proof`}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold mt-6 transition shadow-md shadow-amber-500/20"
                >
                  📷 Upload Work Proof
                </Link>
              )}
            </div>
          </div>

          {/* Before & After comparison visual indicator */}
          {issue.workerImage && (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-glass border border-slate-100 dark:border-slate-800/80 animate-fade-in-up">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-civic-emerald animate-pulse" /> Resolution Evidence
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-civic-saffron block">Before (Reported)</span>
                  <div className="h-64 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <img src={issue.image} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-civic-emerald block">After (Resolved)</span>
                  <div className="h-64 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <img src={issue.workerImage} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {issue.workerNote && (
                <div className="mt-6 bg-civic-emerald/10 border border-civic-emerald/20 p-5 rounded-2xl italic text-slate-700 dark:text-slate-300 text-sm">
                  <span className="font-bold text-civic-emerald not-italic block mb-1">Resolution Summary:</span>
                  "{issue.workerNote}"
                </div>
              )}
              {issue.workerUpdatedAt && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 font-bold uppercase tracking-wider">
                  Updated: {new Date(issue.workerUpdatedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN ─────────── */}
        <div className="space-y-6">

          {/* Admin Action Panel */}
          {(role === "admin" || role === "worker") && (
            <div className="bg-civic-navy dark:bg-slate-900 text-white rounded-3xl p-8 shadow-lg border border-white/5 dark:border-slate-800/80 animate-slide-right">
              <div className="flex items-center gap-2 mb-6">
                <Shield size={18} className="text-civic-saffron" />
                <h3 className="font-bold uppercase text-xs tracking-wider font-outfit">
                  {role === "admin" ? "Admin Panel" : "Field Worker Panel"}
                </h3>
              </div>

              <div className="space-y-3">
                {/* Pending → In Progress */}
                {issue.status === "Pending" && role === "admin" && (
                  <button
                    onClick={() => updateStatus("In Progress")}
                    disabled={updating}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white font-bold transition disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {updating ? <Loader2 size={18} className="animate-spin text-white" /> : null}
                    Mark In Progress
                  </button>
                )}

                {/* In Progress → Resolved */}
                {issue.status === "In Progress" && role === "admin" && (
                  <button
                    onClick={() => updateStatus("Resolved")}
                    disabled={updating || !issue.workerImage}
                    className={`w-full py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 ${
                      issue.workerImage
                        ? "bg-gradient-to-r from-civic-emerald to-civic-emerald-600 hover:from-civic-emerald-500 hover:to-civic-emerald-700 text-white"
                        : "bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700"
                    }`}
                  >
                    {updating ? <Loader2 size={18} className="animate-spin" /> : null}
                    {issue.workerImage ? "✓ Mark as Resolved" : "Waiting for Worker Proof"}
                  </button>
                )}

                {/* Worker upload link */}
                {issue.status === "In Progress" && role === "worker" && (
                  <Link
                    to={`/worker/issues/${issue._id}/upload-proof`}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold transition flex items-center justify-center gap-2 text-white shadow-md shadow-amber-500/20"
                  >
                    📷 Upload Completion Proof
                  </Link>
                )}

                {issue.status === "Resolved" && (
                  <div className="bg-civic-emerald/20 border border-civic-emerald/30 p-4 rounded-2xl text-center">
                    <CheckCircle2 size={24} className="text-civic-emerald mx-auto mb-2" />
                    <p className="text-civic-emerald font-bold text-sm">Issue Resolved</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reporter Info */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-glass border border-slate-100 dark:border-slate-800/80 animate-fade-in-up delay-100">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">Reporter Details</h3>
            <div className="space-y-1">
              <InfoCard icon={<User size={18} />}    label="Reported By" value={issue.username || "Anonymous Citizen"} />
              <InfoCard icon={<Calendar size={18} />} label="Date"       value={new Date(issue.date_created).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} />
              <InfoCard icon={<Clock size={18} />}    label="Time"       value={new Date(issue.date_created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
              <InfoCard icon={<MapPin size={18} />}   label="Location"   value={issue.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusPill = ({ status }) => {
  const styles = {
    Pending:     "bg-civic-saffron text-white shadow-lg shadow-civic-saffron/20",
    "In Progress": "bg-civic-navy text-white shadow-lg shadow-civic-navy/20 dark:bg-slate-700 dark:border dark:border-slate-650",
    Resolved:    "bg-civic-emerald text-white shadow-lg shadow-civic-emerald/20",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
    <div className="w-10 h-10 bg-civic-saffron/10 text-civic-saffron rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider">{label}</p>
      <p className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate">{value}</p>
    </div>
  </div>
);

export default IssueDetails;
