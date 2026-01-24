import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Clock,
  Loader2,
  Shield
} from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
    const role = localStorage.getItem("role");

  // ================= FETCH ISSUE =================
  useEffect(() => {
    fetch(`http://localhost:5000/api/issues/${id}`)
      .then(res => res.json())
      .then(data => {
        setIssue(data.issue);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/issues/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setIssue(prev => ({ ...prev, status: data.status }));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      
      {/* TOP BAR */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-bold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded">
            CASE #{id.slice(-8).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* ORIGINAL ISSUE */}
          <div className="bg-white rounded-3xl shadow border overflow-hidden">
            <img
              src={issue.image}
              alt="Issue"
              className="w-full h-[380px] object-cover"
            />

            <div className="p-8">
              <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-black">{issue.issuetype}</h1>
                <StatusPill status={issue.status} />
              </div>

              <div className="flex items-center gap-2 text-blue-600 font-semibold mb-6">
                <MapPin size={18} /> {issue.location}
              </div>

              {/* work prof */}
              <p className="bg-slate-50 p-6 rounded-2xl text-lg">
                {issue.description}
              </p>
              {issue.status === "In Progress" && role === "worker" && (

              <Link
              to={`/worker/issues/${issue._id}/upload-proof`}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 
              px-6 py-3 rounded-xl font-bold mt-6
              hover:bg-blue-100 transition"
              >
                Upload Work Proof
              </Link>
              )}
            </div>
          </div>
         


          {/* WORKER PROOF */}
          {issue.workerImage && (
            <div className="bg-white rounded-3xl p-8 shadow border">
              <h3 className="text-sm font-black text-slate-400 uppercase mb-4">
                Work Completion Proof
              </h3>

              <img
                src={issue.workerImage}
                alt="Work Done"
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />

              {issue.workerNote && (
                <p className="bg-slate-50 p-4 rounded-xl">
                  {issue.workerNote}
                </p>
              )}

              {issue.workerUpdatedAt && (
                <p className="text-xs text-slate-400 mt-2">
                  Updated: {new Date(issue.workerUpdatedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* ADMIN ACTIONS */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={18} className="text-blue-400" />
              <h3 className="font-bold uppercase text-sm">
                Admin Actions
              </h3>
            </div>

            {/* Pending → In Progress */}
            {issue.status === "Pending"  && (
              <button
                onClick={() => updateStatus("In Progress")}
                disabled={updating}
                className="w-full py-4 rounded-2xl bg-blue-600 font-bold"
              >
                Mark In Progress
              </button>
            )}

            {/* In Progress → Resolved */}
            {issue.status === "In Progress" && (
              <button
                onClick={() => updateStatus("Resolved")}
                disabled={updating || !issue.workerImage}
                className={`w-full py-4 rounded-2xl font-bold ${
                  issue.workerImage
                    ? "bg-green-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {issue.workerImage
                  ? "Mark Resolved"
                  : "Waiting for Worker Proof"}
              </button>
            )}
          </div>

          {/* REPORTER INFO */}
          <div className="bg-white rounded-3xl p-8 shadow border">
            <InfoCard
              icon={<User size={20} />}
              label="Reported By"
              value={issue.username || "Anonymous"}
            />
            <InfoCard
              icon={<Calendar size={20} />}
              label="Date"
              value={new Date(issue.date_created).toLocaleDateString()}
            />
            <InfoCard
              icon={<Clock size={20} />}
              label="Time"
              value={new Date(issue.date_created).toLocaleTimeString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= COMPONENTS =================

const StatusPill = ({ status }) => {
  const styles = {
    Pending: "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-4 py-1 rounded-full text-xs font-black ${styles[status]}`}>
      {status}
    </span>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3">
    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-bold">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);

export default IssueDetails;
