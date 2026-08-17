import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-civic-surface/40 dark:bg-slate-950 flex items-center justify-center p-6 font-inter transition-colors duration-300">
      <div className="text-center animate-fade-in-up max-w-md">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[10rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none font-outfit">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-civic-saffron rounded-[2rem] flex items-center justify-center shadow-lg shadow-civic-saffron/20">
              <AlertCircle size={48} className="text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight font-outfit">
          Page Not Found
        </h1>
        <p className="text-slate-505 dark:text-slate-400 font-medium mb-10 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-civic-saffron to-civic-saffron-600 hover:from-civic-saffron-500 hover:to-civic-saffron-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-civic-saffron/20"
          >
            <Home size={20} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg hover:border-civic-saffron hover:text-civic-saffron dark:hover:border-civic-saffron transition shadow-sm"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
