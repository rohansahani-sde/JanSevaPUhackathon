import React, { useState, useRef } from "react";
import { 
  Camera, MapPin, X, UploadCloud, 
  CheckCircle2, AlertCircle, Loader2, ArrowLeft 
} from "lucide-react";
import { Link } from "react-router-dom";

const Report = () => {

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //   const fileInputRef = useRef(null);
  
  const [image, setImage] = useState(null);
  const imageFileRef = useRef(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  

  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    streamRef.current = stream;
    videoRef.current.srcObject = stream;
  } catch {
    alert("Camera permission is required");
  }
};



const capturePhoto = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    const file = new File([blob], `report_${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    imageFileRef.current = file;
    setImage(URL.createObjectURL(blob));

    // Stop camera
    streamRef.current.getTracks().forEach(track => track.stop());
  }, "image/jpeg", 0.9);
};



  const [formData, setFormData] = useState({
    location: "",
    description: "",
    issuetype: "Garbage Overflow"
  });

  
  
//   const handleImageUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      
      
      
      
      const user = JSON.parse(localStorage.getItem("user"));
      
  const data = new FormData();
//   data.append("image", fileInputRef.current.files[0]);
//   data.append("image", fileInputRef.current);
  data.append("image", imageFileRef.current);

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
  <label className="text-sm font-black text-slate-400 uppercase tracking-widest">
    Live Camera Proof
  </label>

  <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden bg-black">

    {!image ? (
      <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={startCamera}
          className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl font-bold"
        >
          Start Camera
        </button>

        <button
          type="button"
          onClick={capturePhoto}
          className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"
        >
          Capture
        </button>
      </>
    ) : (
      <img src={image} className="w-full h-full object-cover" />
    )}

    <canvas ref={canvasRef} className="hidden" />
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