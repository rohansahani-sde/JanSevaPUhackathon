import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck, ArrowRight, Loader2, Users, Shield, Wrench } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setRole = (role) => setForm({ ...form, role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      localStorage.setItem(
        "user",
        JSON.stringify({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
        })
    );

      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "worker") navigate("/workerDashboard");
      else navigate("/userDashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-surface dark:bg-slate-950 flex items-center justify-center p-4 lg:p-8 font-inter">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass-lg border border-slate-100 dark:border-slate-800/60 p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-civic-saffron/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-civic-saffron/10 text-civic-saffron rounded-2xl mb-4 animate-float">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-outfit">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Join JanSeva to start improving your community.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/20 border border-red-105 dark:border-red-900/30 text-red-650 dark:text-red-400 p-4 rounded-2xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-350 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-civic-saffron transition-colors" size={20} />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-civic-saffron focus:ring-2 focus:ring-civic-saffron/20 transition-all outline-none text-slate-900 dark:text-white"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-350 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-civic-saffron transition-colors" size={20} />
              <input
                type="email"
                name="email"
                placeholder="you@domain.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-civic-saffron focus:ring-2 focus:ring-civic-saffron/20 transition-all outline-none text-slate-900 dark:text-white"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-350 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-civic-saffron transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-civic-saffron focus:ring-2 focus:ring-civic-saffron/20 transition-all outline-none text-slate-900 dark:text-white"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-350 ml-1">I am a...</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Citizen Card */}
              <button
                type="button"
                onClick={() => setRole("citizen")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  form.role === "citizen" 
                  ? "border-civic-emerald bg-civic-emerald/10 text-civic-emerald font-black shadow-sm" 
                  : "border-slate-100 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 text-slate-550 dark:text-slate-400 hover:border-slate-200"
                }`}
              >
                <Users size={20} />
                <span className="text-sm">Citizen</span>
              </button>
              
              {/* Admin Card */}
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  form.role === "admin" 
                  ? "border-civic-navy bg-civic-navy/10 text-civic-navy dark:text-civic-navy-300 font-black shadow-sm" 
                  : "border-slate-100 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 text-slate-550 dark:text-slate-400 hover:border-slate-200"
                }`}
              >
                <Shield size={20} />
                <span className="text-sm">Admin</span>
              </button>

              {/* Worker Card */}
              <button
                type="button"
                onClick={() => setRole("worker")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  form.role === "worker" 
                  ? "border-civic-saffron bg-civic-saffron/10 text-civic-saffron font-black shadow-sm" 
                  : "border-slate-100 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 text-slate-550 dark:text-slate-400 hover:border-slate-200"
                }`}
              >
                <Wrench size={20} />
                <span className="text-sm">Worker</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white py-4 rounded-2xl font-bold text-lg active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg shadow-civic-saffron/20 hover:shadow-civic-saffron/35 mt-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center relative z-10">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-civic-saffron font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
