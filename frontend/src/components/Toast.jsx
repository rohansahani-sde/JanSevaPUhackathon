import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { CheckCircle2, XCircle, Info, X, AlertTriangle } from "lucide-react";

/* ─── Context ────────────────────────────────────────────── */
const ToastContext = createContext(null);

let externalToast = null;

/* ─── Provider ───────────────────────────────────────────── */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration, leaving: false }]);

    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => t.id === id ? { ...t, leaving: true } : t)
      );
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  // Allow external (non-React) usage
  externalToast = addToast;

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/* ─── Individual Toast Item ──────────────────────────────── */
const THEMES = {
  success: {
    borderClass: "border-l-4 border-l-civic-emerald shadow-lg shadow-civic-emerald/5",
    icon: <CheckCircle2 size={20} className="text-civic-emerald shrink-0" />,
    title: "Success",
  },
  error: {
    borderClass: "border-l-4 border-l-red-500 shadow-lg shadow-red-500/5",
    icon: <XCircle size={20} className="text-red-500 shrink-0" />,
    title: "Error",
  },
  warning: {
    borderClass: "border-l-4 border-l-civic-saffron shadow-lg shadow-civic-saffron/5",
    icon: <AlertTriangle size={20} className="text-civic-saffron shrink-0" />,
    title: "Warning",
  },
  info: {
    borderClass: "border-l-4 border-l-civic-navy dark:border-l-civic-navy-300 shadow-lg shadow-civic-navy/5",
    icon: <Info size={20} className="text-civic-navy dark:text-civic-navy-300 shrink-0" />,
    title: "Info",
  },
};

const ToastItem = ({ toast, onRemove }) => {
  const theme = THEMES[toast.type] || THEMES.info;

  return (
    <div
      className={`pointer-events-auto w-[360px] max-w-[90vw] flex items-start gap-3 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/85 shadow-glass-lg ${theme.borderClass}
        ${toast.leaving ? "animate-toast-out" : "animate-toast-in"} transition-colors duration-300`}
    >
      {theme.icon}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">{theme.title}</p>
        <p className="text-sm font-semibold text-slate-705 dark:text-slate-200 leading-snug">{toast.message}</p>
      </div>
      <button
        onClick={onRemove}
        className="text-slate-300 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-300 transition shrink-0 mt-0.5"
      >
        <X size={16} />
      </button>
    </div>
  );
};

/* ─── Hook ───────────────────────────────────────────────── */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

/* ─── Standalone helper (for use outside React tree if needed) ─ */
export const toast = {
  success: (msg, dur) => externalToast?.(msg, "success", dur),
  error:   (msg, dur) => externalToast?.(msg, "error",   dur),
  warning: (msg, dur) => externalToast?.(msg, "warning", dur),
  info:    (msg, dur) => externalToast?.(msg, "info",    dur),
};

export default ToastProvider;
