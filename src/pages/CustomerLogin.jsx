// src/pages/CustomerLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { MdEmail, MdLock, MdDirectionsBike, MdWarning } from "react-icons/md";

const CustomerLogin = () => {
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/foods";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, form.email.trim(), form.password);
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center px-4 py-10">
      {/* bg shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <MdDirectionsBike className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Login to HandyRide
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your details to access rides, track orders, and more.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-7 md:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdEmail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Checking account…</span>
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 mt-2">
                <MdWarning className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-sm text-gray-600">
          New to HandyRide?{" "}
          <Link
            to="/register"
            className="font-semibold text-red-600 hover:text-red-700"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
