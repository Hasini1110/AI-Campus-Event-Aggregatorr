"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedRole =
      localStorage.getItem("userRole") || "";

    const storedName =
      localStorage.getItem("userName") || "";

    setRole(storedRole);
    setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">

        <div className="flex gap-6 text-white font-semibold">
          <Link href="/">Home</Link>

          {!role && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {role && (
            <>
              <Link href="/dashboard">
                Dashboard
              </Link>

              {role === "Admin" && (
                <Link href="/add-event">
                  Add Event
                </Link>
              )}
            </>
          )}
        </div>

        {role && (
          <div className="flex gap-4 items-center">
            <span className="text-white">
              Welcome, {name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}