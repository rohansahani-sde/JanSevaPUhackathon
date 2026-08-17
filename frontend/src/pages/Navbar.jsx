import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, ShieldCheck, UserRound, X, Sun, Moon, Flame } from "lucide-react";
import { useTheme } from "../components/ThemeContext";

const dashboardPath = (role) => {
  if (role === "admin") return "/admin";
  if (role === "worker") return "/workerDashboard";
  return "/userDashboard";
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [auth, setAuth] = useState({ token: null, role: null });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setAuth({
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
    });
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setAuth({ token: null, role: null });
    navigate("/login");
  };

  const links = [
    { label: "Features", to: "/features" },
    { label: "Reports", to: "/#view" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-glass border-b border-civic-saffron/10 dark:border-civic-saffron/5"
          : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800"
      }`}
    >
      {/* Tricolor top strip */}
      <div className="tricolor-strip" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-civic-gradient text-white shadow-civic group-hover:shadow-civic-lg transition-shadow">
            <Flame size={20} />
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-black tracking-tight font-outfit text-civic-gradient">
              Jan
            </span>
            <span className="text-xl font-black tracking-tight font-outfit text-civic-navy dark:text-white">
              Seva
            </span>
          </div>
        </Link>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2 text-slate-600 dark:text-slate-300 hover:bg-civic-saffron/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-xl p-2 text-slate-600 dark:text-slate-300 hover:bg-civic-saffron/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-3 glass-strong px-4 py-4 shadow-glass-lg md:static md:flex md:flex-row md:items-center md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0 md:shadow-none`}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                  isActive(link.to)
                    ? "text-civic-saffron bg-civic-saffron/10"
                    : "text-slate-600 dark:text-slate-300 hover:text-civic-saffron hover:bg-civic-saffron/5"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-civic-saffron rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/report"
              className="rounded-xl bg-civic-saffron/10 dark:bg-civic-saffron/15 px-4 py-2 text-sm font-black text-civic-saffron hover:bg-civic-saffron/20 transition-colors flex items-center gap-1.5"
            >
              <Flame size={14} />
              Report Issue
            </Link>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 md:h-6 md:w-px" />

          {/* Desktop theme toggle */}
          <div className="hidden md:block">
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2.5 text-slate-500 dark:text-slate-400 hover:bg-civic-saffron/10 hover:text-civic-saffron transition-all"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                  }`}
                />
                <Moon
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    theme === "dark" ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 md:h-6 md:w-px" />

          {!auth.token ? (
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-civic-saffron hover:bg-civic-saffron/5 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-civic text-sm py-2 px-5"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Link
                to={dashboardPath(auth.role)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-civic-saffron/20 dark:border-civic-saffron/15 px-4 py-2 text-sm font-bold text-civic-navy dark:text-slate-200 hover:border-civic-saffron/40 hover:bg-civic-saffron/5 hover:text-civic-saffron transition-all"
              >
                <UserRound size={16} />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
