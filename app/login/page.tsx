"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .eq("role", role)
      .single();

    if (error || !data) {
      alert("Invalid Email, Password or Role");
      return;
    }

    localStorage.setItem("userRole", data.role);
    localStorage.setItem("userName", data.name);

    alert("Login Successful");

   setTimeout(() => {
        window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Campus Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded text-black"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-3 rounded text-black"
            required
          />

          <div>
            <label className="block mb-1 font-medium text-black">
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border p-3 rounded text-black"
            >
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>

          <p className="text-center text-black">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-semibold"
            >
              Register
            </a>
          </p>

        </form>
      </div>
    </main>
  );
}