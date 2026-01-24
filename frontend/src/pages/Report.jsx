import React, { useState, useRef } from "react";
import { 
  Camera, MapPin, X, UploadCloud, 
  CheckCircle2, AlertCircle, Loader2, ArrowLeft 
} from "lucide-react";
import { Link } from "react-router-dom";

const Report = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    location: "",
    description: "",
    issuetype: "Garbage Overflow"
  });

  
  
  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      
      
      
      
      const user = JSON.parse(localStorage.getItem("user"));
      
  const data = new FormData();
  data.append("image", fileInputRef.current.files[0]);
  data.append("location", formData.location);
  data.append("description", formData.description);
  data.append("issuetype", formData.issuetype);
  data.append("username", user?.name);



  try {
    await fetch("http://localhost:5000/api/issues/report", {
      method: "POST",
      body: data,
    });

    setSubmitted(true);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <div className="max-w-sm animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100">
            <CheckCircle2 size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Report Sent!</h2>
          <p className="text-slate-500 mb-8">Thank you for being a responsible citizen. We've notified the local authorities.</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Mobile Header */}
      <div className="bg-white px-6 py-6 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-100">
        <button className="p-2 hover:bg-slate-100 rounded-full transition">
         <Link to={'/'} > <ArrowLeft size={24} className="text-slate-700" /> </Link>
        </button>
        <h1 className="text-xl font-bold text-slate-900">New Report</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* IMAGE UPLOAD SECTION */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Visual Evidence</label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`relative h-64 w-full rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden
                ${image ? 'border-transparent shadow-2xl' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30'}`}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <p className="bg-white px-4 py-2 rounded-full font-bold text-sm">Change Photo</p>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={32} />
                  </div>
                  <p className="text-slate-900 font-bold">Take or Upload a Photo</p>
                  <p className="text-slate-400 text-sm mt-1">Real photos speed up the resolution</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" // This triggers the mobile camera directly
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
            
            {/* Location Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" /> Exact Location
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Street name, landmark, or sector..."
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                >
                  GPS
                </button>
              </div>
            </div>

            {/* Issue Type Input */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <AlertCircle size={16} className="text-purple-600" /> Issue Type
                </label>
                
                <select
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl 
                focus:bg-white focus:border-blue-600 transition-all outline-none"
                value={formData.issuetype}
                onChange={(e) =>
                    setFormData({ ...formData, issuetype: e.target.value })
                    }
                required
                >
                    <option value="Garbage Overflow">Garbage Overflow</option>
                    <option value="Pothole">Pothole</option>
                    <option value="Streetlight">Streetlight Not Working</option>
                    <option value="Drainage">Open Drainage</option>
                    <option value="Road">Road Damage</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <AlertCircle size={16} className="text-orange-500" /> Description
              </label>
              <textarea
                placeholder="Describe the issue in a few words..."
                rows="4"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>




            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !image}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Uploading...
                </>
              ) : (
                "Submit Report"
              )}
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default Report;