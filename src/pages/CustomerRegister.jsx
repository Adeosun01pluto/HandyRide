// src/pages/CustomerRegister.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdDirectionsBike,
  MdCheckCircle,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";
import { FaGift } from "react-icons/fa";

const CustomerRegister = () => {
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/foods"; // where to go after signup

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    promoCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successName, setSuccessName] = useState("");

  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccessName("");

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const trimmedName = form.name.trim();

      if (trimmedName) {
        await updateProfile(cred.user, { displayName: trimmedName });
      }

      await setDoc(doc(db, "users", cred.user.uid), {
        name: trimmedName || "",
        address: form.address.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        role: "customer",
        createdAt: new Date().toISOString(),
      });

      setSuccessName(trimmedName || form.email.trim());
      setForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
      });

      // small delay to show success, then redirect
      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 900);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center px-4 py-10">
      {/* Background orbs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <MdDirectionsBike className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Create HandyRide Account
          </h1>
          <p className="text-gray-600 text-md max-w-md mx-auto">
            Register once and book rides on campus anytime. We just need a few
            details riders can use to find and reach you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 md:p-8">
          <form onSubmit={onSubmit} className="space-y-3 md:space-y-5">
            {/* Name */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdPerson className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="What should riders call you?"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLocationOn className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  placeholder="e.g. Hall name, hostel, or pickup area"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This helps riders find you faster. You can update it later if
                you move.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdPhone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone number riders can call"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be reachable by call so riders can confirm your pickups.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
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
              <label className="block text-md font-semibold text-gray-700 mb-2">
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
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 6 characters. Don’t reuse your school password.
              </p>
            </div>
            {/* Promo code */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Promo Code (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaGift className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="promoCode"
                  type="promoCode"
                  value={form.promoCode}
                  onChange={onChange}
                  placeholder="Promo Code"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 6 characters. Don’t reuse your school password.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account…</span>
                </div>
              ) : (
                "Sign Up & Continue"
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-md text-red-700 font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Success Banner */}
        {successName && (
          <div className="mt-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-5 shadow-xl flex gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MdCheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-md font-bold text-gray-900">
                Welcome, {successName} 🎉
              </h2>
              <p className="text-xs text-gray-700 mt-1">
                Your account is ready. Redirecting you into HandyRide…
              </p>
            </div>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-5 text-center text-md text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-600 hover:text-red-700"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
