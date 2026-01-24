import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Camera, Upload, CheckCircle, ArrowLeft, 
  Loader2, Trash2, FileText, HardHat 
} from "lucide-react";

const WorkerUploadProof = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
    const role = localStorage.getItem("role");

  const [workerImage, setWorkerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [workerNote, setWorkerNote] = useState("");
  const [loading, setLoading] = useState(false);

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
  };

  const submitProof = async () => {
    if (!workerImage) return alert("Please capture or upload a photo of the finished work.");

    const formData = new FormData();
    formData.append("image", workerImage);
    formData.append("workerNote", workerNote);

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}/work-proof`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        navigate(-1);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Field Header */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-full transition">
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-2 opacity-70 mb-0.5">
              <HardHat size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Field Reporting</span>
            </div>
            <h1 className="text-xl font-bold">Upload Completion Proof</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-xl mx-auto w-full space-y-8">
        {/* IMAGE UPLOAD ZONE */}
        <section className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">After-Work Photo</label>
          
          {!previewUrl ? (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="h-80 w-full border-4 border-dashed border-slate-200 bg-white rounded-[2.5rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-95"
            >
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                <Camera size={40} />
              </div>
              <div className="text-center">
                <p className="font-black text-slate-800 text-lg">Snap Completion Photo</p>
                <p className="text-slate-500 text-sm font-medium">Clear photo helps verify work</p>
              </div>
            </div>
          ) : (
            <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={previewUrl} alt="Preview" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={removeImage}
                  className="bg-red-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-90"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black shadow-lg">
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
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
            <FileText size={14} /> Work Summary
          </label>
          <textarea
            placeholder="Tell us what was fixed (e.g., Pothole filled with cold mix bitumen)..."
            value={workerNote}
            onChange={(e) => setWorkerNote(e.target.value)}
            className="w-full p-6 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-blue-500 focus:ring-0 transition-all outline-none resize-none text-slate-700 font-medium"
            rows="5"
          />
        </section>

        {/* SUBMIT ACTION */}
        <button
          onClick={submitProof}
          disabled={loading || !workerImage}
          className={`w-full py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl
            ${loading || !workerImage 
              ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Finalizing...
            </>
          ) : (
            <>
              <Upload size={24} />
              Submit Completion Report
            </>
          )}
        </button>
      </main>

      {/* Helper Footer */}
      <footer className="p-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          Janseva Professional Network • Field Module
        </p>
      </footer>
    </div>
  );
};

export default WorkerUploadProof;