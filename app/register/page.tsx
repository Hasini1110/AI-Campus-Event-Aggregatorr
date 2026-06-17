"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [adminCode, setAdminCode] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (role === "Admin" && adminCode !== "CAMPUS2026") {
      alert("Invalid Admin Code");
      return;
    }

    const { error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          role,
        },
      ]);

    if (error) {
      alert("Registration Failed");
      console.log(error);
    } else {
      alert("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");
      setRole("Student");
      setAdminCode("");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-1 font-medium text-black">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-3 rounded text-black"
            >
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          {role === "Admin" && (
            <div>
              <label className="block mb-1 font-medium text-black">
                Admin Secret Code
              </label>

              <input
                type="password"
                placeholder="Enter Admin Code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full border p-3 rounded text-black"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Register
          </button>

          <p className="text-center text-black">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}