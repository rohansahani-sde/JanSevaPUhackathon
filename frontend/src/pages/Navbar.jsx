import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav
      className="flex items-center justify-between px-8 py-4 shadow-md"
      style={{ backgroundColor: "#2C3E50", color: "#ECF0F1" }}
    >
        
        <h1 className="text-xl font-bold tracking-wide cursor-pointer">
        <a href="/">   JanSeva </a>
        </h1>
         

      <div className="hidden md:flex gap-6 items-center">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#how" className="hover:underline">
          How It Works
        </a>

        {/* Not Logged In */}
        {!isLoggedIn && (
          <>
            <a href="/login" className="hover:underline">
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: "#ECF0F1",
                color: "#2C3E50",
              }}
            >
              Register
            </a>
          </>
        )}

        {/* Logged In */}
        {isLoggedIn && (
          <>
            <a
              href={role === "admin" ? "/admin" : "/userDashboard"}
              className="hover:underline"
            >
              Dashboard
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold border border-[#ECF0F1] hover:bg-[#ECF0F1] hover:text-[#2C3E50] transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
