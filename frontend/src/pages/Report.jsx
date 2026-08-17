import React, { useState, useRef } from "react";
import {
  Camera,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  X,
  Navigation,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { useToast } from "../components/Toast";

const Report = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);
  const imageFileRef = useRef(null);

  const [formData, setFormData] = useState({
    location: "",
    description: "",
    issuetype: "Garbage Overflow",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFileRef.current) {
      addToast("Please upload an image of the issue.", "warning");
      return;
    }

    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("image", imageFileRef.current);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("issuetype", formData.issuetype);
    data.append("username", user?.name || "Anonymous Citizen");

    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/issues/report`, {
        method: "POST",
        headers,
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      addToast("Issue reported successfully!", "success");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      addToast(err.message || "Submission failed. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (e) => {
    if (e) e.stopPropagation();
    setImage(null);
    imageFileRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getActiveStep = () => {
    if (!image) return 1;
    if (!formData.location || !formData.description) return 2;
    return 3;
  };
  
  const activeStep = getActiveStep();

  if (submitted) {
    return (
      <div className="min-h-screen bg-civic-surface dark:bg-slate-950 flex items-center justify-center p-6 text-center font-inter">
        <div className="max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[3rem] shadow-glass-lg animate-in zoom-in-95 duration-500">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-civic-emerald/20 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-full h-full bg-civic-emerald text-white rounded-full flex items-center justify-center shadow-lg shadow-civic-emerald/20">
              <CheckCircle2 size={48} />
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight font-outfit">Report Lodged!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            Your grievance has been registered under the civic action pipeline. Field teams will inspect the visual evidence shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white py-5 rounded-[2rem] font-black text-lg transition-all shadow-lg shadow-civic-saffron/20 active:scale-95"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-civic-surface dark:bg-slate-950 transition-colors pt-24 pb-20 font-inter">
      {/* Subheader Title */}
      <div className="max-w-2xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-305 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">File a Grievance</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">JanSeva Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-civic-saffron bg-civic-saffron/10 px-3 py-1.5 rounded-full border border-civic-saffron/10 shadow-sm">
          <Navigation size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">GPS Tagging Active</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {/* Stepper Progress */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-10 relative">
          <div className="absolute top-[18px] left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
          <div className="absolute top-[18px] left-[15%] h-0.5 bg-civic-saffron transition-all duration-500 -z-0" 
               style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }} />

          <div className="flex flex-col items-center relative z-10">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 1 ? 'bg-civic-saffron text-white shadow-md shadow-civic-saffron/20 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>1</div>
            <span className="text-[10px] font-black uppercase tracking-wider mt-2 text-slate-500 dark:text-slate-400">Photo</span>
          </div>
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 2 ? 'bg-civic-saffron text-white shadow-md shadow-civic-saffron/20 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>2</div>
            <span className="text-[10px] font-black uppercase tracking-wider mt-2 text-slate-500 dark:text-slate-400">Details</span>
          </div>
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${activeStep >= 3 ? 'bg-civic-saffron text-white shadow-md shadow-civic-saffron/20 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>3</div>
            <span className="text-[10px] font-black uppercase tracking-wider mt-2 text-slate-500 dark:text-slate-400">Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                Visual Evidence
              </label>
              {image && (
                <button type="button" onClick={removeImage} className="text-xs font-bold text-red-500 flex items-center gap-1 hover:underline">
                  <X size={14} /> Remove Photo
                </button>
              )}
            </div>

            <div
              onClick={() => fileInputRef.current.click()}
              className={`group relative h-72 w-full rounded-[3rem] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden
                ${image 
                  ? "border-white dark:border-slate-800 shadow-glass-lg scale-[1.01]" 
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-civic-saffron dark:hover:border-civic-saffron hover:bg-civic-saffron/5 dark:hover:bg-civic-saffron/10 hover:scale-[1.005] duration-300"
                }`}
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-civic-saffron/10 dark:bg-civic-saffron/20 text-civic-saffron rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <Camera size={40} />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-black text-xl mb-1 font-outfit">Upload Image</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm">Tap to open camera or browse files</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                imageFileRef.current = file;
                setImage(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* FORM FIELDS */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 space-y-8 shadow-glass border border-slate-100 dark:border-slate-800/80 transition-colors">
            
            {/* Location Input */}
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Location Details</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-civic-saffron" size={20} />
                <input
                  type="text"
                  placeholder="Street name, Landmark, or Area..."
                  className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 focus:border-civic-saffron dark:focus:border-civic-saffron focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-bold text-slate-700 dark:text-slate-200"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Issue Type Dropdown */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Issue Category</label>
              <select
                className="w-full px-6 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 focus:border-civic-saffron focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-bold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
                value={formData.issuetype}
                onChange={(e) => setFormData({ ...formData, issuetype: e.target.value })}
              >
                <option>Garbage Overflow</option>
                <option>Pothole</option>
                <option>Streetlight</option>
                <option>Drainage</option>
                <option>Road Damage</option>
                <option>Public Hazard</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
                Problem Description <Info size={12} className="text-slate-350" />
              </label>
              <textarea
                rows="4"
                placeholder="Explain the issue clearly to help our ground team..."
                className="w-full px-8 py-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 focus:border-civic-saffron focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-medium text-slate-700 dark:text-slate-200 leading-relaxed resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !image}
              className={`w-full py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]
                ${loading || !image 
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none" 
                  : "bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white shadow-lg shadow-civic-saffron/20"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" />
                  Processing Report...
                </>
              ) : (
                "File Official Report"
              )}
            </button>

            <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              Verified reports are prioritized for resolution within 24-48 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
