import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
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

      if(data.user.role === "admin")
        navigate("/admin");
      else if(data.user.role === "worker")
        navigate("/workerDashboard");
      else navigate("/userDashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-surface dark:bg-slate-950 flex items-center justify-center p-4 lg:p-8 font-inter">
      {/* Container Card */}
      <div className="max-w-5xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-glass-lg border border-slate-100 dark:border-slate-800/60 overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE: Brand/Visual */}
        <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-gradient-to-br from-civic-navy-900 via-civic-navy to-civic-navy-800 text-white">
          <div className="absolute inset-0 opacity-10 bg-mesh-pattern pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-civic-saffron/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <Link to="/" className="text-white text-3xl font-black tracking-tight font-outfit flex items-center gap-2">
              <span className="text-civic-saffron animate-pulse">🇮🇳</span> JanSeva
            </Link>
          </div>

          <div className="relative z-10 backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-3xl shadow-glass">
            <blockquote className="text-slate-200 text-lg font-medium leading-relaxed mb-4 font-inter">
              "The best way to find yourself is to lose yourself in the service of others."
            </blockquote>
            <p className="text-slate-400 text-sm font-semibold">— Mahatma Gandhi</p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-16">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-outfit">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Sign in to manage your reports and track progress.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/40">
              <span className="text-xs bg-red-600 text-white rounded-full p-0.5 px-1.5 font-bold">!</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-350 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-civic-saffron transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-civic-saffron focus:ring-2 focus:ring-civic-saffron/20 transition-all outline-none text-slate-900 dark:text-white"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-350">Password</label>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure login</span>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-civic-saffron transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white py-4 rounded-2xl font-bold text-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-civic-saffron/20 hover:shadow-civic-saffron/35"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              New to JanSeva?{" "}
              <Link to="/register" className="text-civic-saffron font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
