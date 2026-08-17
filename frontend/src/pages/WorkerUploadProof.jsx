import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Camera, Upload, CheckCircle, ArrowLeft,
  Loader2, Trash2, FileText, HardHat
} from "lucide-react";
import { API_BASE_URL } from "../config/api";
import { useToast } from "../components/Toast";

const WorkerUploadProof = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [workerImage, setWorkerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [workerNote, setWorkerNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorkerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setWorkerImage(null);
    setPreviewUrl(null);
    fileInputRef.current.value = "";
  };

  const handleNoteChange = (e) => {
    setWorkerNote(e.target.value);
    setCharCount(e.target.value.length);
  };

  const submitProof = async () => {
    if (!workerImage) {
      addToast("Please capture or upload a photo of the finished work.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("image", workerImage);
    formData.append("workerNote", workerNote);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_BASE_URL}/issues/${id}/work-proof`, {
        method: "PUT",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        addToast("Work proof submitted successfully! Admin will review it shortly.", "success");
        setTimeout(() => navigate(-1), 1500);
      } else {
        addToast(data.message || "Upload failed. Please try again.", "error");
      }
    } catch (err) {
      addToast("Network error. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 flex flex-col font-inter pt-24 transition-colors duration-300">

      {/* Field Header */}
      <header className="max-w-xl mx-auto px-6 mb-8 w-full flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-650 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-[10px]">
            <HardHat size={14} className="animate-bounce" />
            <span>Field Reporting Portal</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white font-outfit">Upload Completion Proof</h1>
        </div>
        {/* Case badge */}
        <div className="ml-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
          #{id.slice(-6).toUpperCase()}
        </div>
      </header>

      <main className="flex-1 px-6 max-w-xl mx-auto w-full space-y-6 pb-20">

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-8 rounded-[3rem] shadow-glass space-y-6">
          {/* IMAGE UPLOAD ZONE */}
          <section className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block ml-1">
              After-Work Photo <span className="text-red-400">*</span>
            </label>

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current.click()}
                className="h-72 w-full border-4 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-amber-500 dark:hover:border-amber-550 hover:bg-amber-500/5 transition-all group"
              >
                <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  <Camera size={40} />
                </div>
                <div className="text-center">
                  <p className="font-black text-slate-800 dark:text-white text-lg font-outfit">Snap Completion Photo</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Clear photo helps verify your resolution</p>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-550 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-1.5 rounded-full font-bold">
                  JPG, PNG or WEBP · ENVIRONMENT MODE ACTIVE
                </span>
              </div>
            ) : (
              <div className="relative group rounded-[2.5rem] overflow-hidden shadow-glass border-4 border-white dark:border-slate-800">
                <img src={previewUrl} alt="Preview" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={removeImage}
                    className="bg-red-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-90"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-civic-emerald text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black shadow-lg">
                  <CheckCircle size={14} /> PHOTO READY
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </section>

          {/* WORK NOTES */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                <FileText size={13} /> Work Summary Notes
              </label>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{charCount}/300</span>
            </div>
            <textarea
              placeholder="Describe what was fixed (e.g. Garbage cleared, street lamp bulb replaced)..."
              value={workerNote}
              onChange={handleNoteChange}
              maxLength={300}
              className="w-full p-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent dark:border-slate-850 focus:border-amber-500 dark:focus:border-amber-550 rounded-[2rem] focus:ring-0 transition-all outline-none resize-none text-slate-700 dark:text-slate-205 font-medium leading-relaxed"
              rows="5"
            />
          </section>

          {/* SUBMIT */}
          <button
            onClick={submitProof}
            disabled={loading || !workerImage}
            className={`w-full py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl
              ${loading || !workerImage
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin text-white" size={22} /> Uploading Proof...
              </>
            ) : (
              <>
                <Upload size={22} /> Submit Completion Report
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-[0.2em]">
          JanSeva Field Module · Resolution will be logged instantly
        </p>
      </main>
    </div>
  );
};

export default WorkerUploadProof;