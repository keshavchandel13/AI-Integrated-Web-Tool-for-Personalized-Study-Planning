import React, { useState } from "react";
import { login } from "../../Api/Auth";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import {AuthContext} from "../../context/authcontext"
import { useContext } from "react";

export default function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const res = await login({ email, password });
      if (res.user) {
        loginContext(res.user)
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/home");
      }
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center  mb-2">Welcome Back</h1>
      <p className="text-center text-gray-500 mb-8">Login to your account</p>

      <form onSubmit={submitLogin} className="space-y-6">
        <div>
          <label className="block mb-1 bold  font-medium">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              < Mail className="text-indigo-400 " />
            </div>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="block w-full rounded-xl border-0 bg-gray-700/50 py-3 pl-14 pr-4 text-white placeholder-gray-400 shadow-lg ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-200 ease-in-out sm:text-sm sm:leading-6"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 bold font-medium">Password</label>
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
              className="block w-full rounded-xl border-0 bg-gray-700/50 py-3 pl-14 pr-4 text-white placeholder-gray-400 shadow-lg ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-200 ease-in-out sm:text-sm sm:leading-6"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-[.98] transition disabled:bg-blue-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-white-600 text-center text-sm">
        Don't have an account?
        <button
          onClick={setLogin}
          className="ml-1 text-blue-600 hover:underline font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
