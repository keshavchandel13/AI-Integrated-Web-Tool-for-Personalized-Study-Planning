import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Api/Auth";
import { Mail, LockKeyhole, User } from "lucide-react";

export default function Signup({ setLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ name, email, password });
      if (res) {
        alert("Signup successful! Please login.");
        navigate("/");
      }
    } catch (err) {
      console.error("Error in signup: ", err);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-2">Create Account</h1>
      <p className="text-center text-gray-500 mb-8">Sign up to get started</p>

      <form onSubmit={submitSignup} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-indigo-400" />
            </div>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="block w-full rounded-xl border-0 bg-gray-700/50 py-3 pl-14 pr-4 text-white placeholder-gray-400 shadow-lg ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-indigo-400" />
            </div>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="block w-full rounded-xl border-0 bg-gray-700/50 py-3 pl-14 pr-4 text-white placeholder-gray-400 shadow-lg ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockKeyhole className="text-indigo-400" />
            </div>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="block w-full rounded-xl border-0 bg-gray-700/50 py-3 pl-14 pr-4 text-white placeholder-gray-400 shadow-lg ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-[.98] transition"
        >
          Signup
        </button>
      </form>

      <p className="mt-6 text-white-600 text-center text-sm">
        Already have an account?
        <button
          onClick={setLogin}
          className="ml-1 text-blue-600 hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
}
