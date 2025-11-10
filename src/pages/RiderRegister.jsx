// src/pages/RiderRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { BiChevronLeft } from "react-icons/bi";
import { MdDirectionsBike, MdDirectionsCar } from "react-icons/md";

export default function RiderRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [notice, setNotice]   = useState("");

  const [form, setForm] = useState({
    name: "",
    matric: "",
    department: "",
    level: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
  });

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();

      // 1) Create Firebase Auth account
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const uid = cred.user.uid;

      // 2) Create rider profile at riders/{uid}
      const riderDoc = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        // Student info
        matric: form.matric.trim(),
        department: form.department.trim(),
        level: form.level,

        // Vehicle
        vehicleType: form.vehicleType,
        vehicleNumber: form.vehicleNumber,
        licenseNumber: form.licenseNumber,

        // Status/Meta
        status: "pending",                 // admin will flip to "approved"
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

        // Profile extras
        profile: {
          photo: "",
          bio: "",
          nearestBusStop: "",
        },

        // For bookkeeping later
        acceptedOrders: [], // keep an array of order ids this rider accepts
      };

      await setDoc(doc(db, "riders", uid), riderDoc);

      // 3) Sign the new user out (since they’re pending) and send to login
      await signOut(auth);

      setNotice(
        "Registration successful! Your account is pending verification by admin."
      );

      // Give a brief visual success then navigate
      setTimeout(() => navigate("/rider-login"), 900);
    } catch (err) {
      console.error(err);
      // Nicer auth error messages
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err?.code === "auth/invalid-email"
          ? "Please enter a valid email address."
          : err?.code === "auth/operation-not-allowed"
          ? "Email/password accounts are disabled in your project."
          : err?.code === "auth/weak-password"
          ? "Password is too weak."
          : "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center text-white">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
        >
          <BiChevronLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">Rider Registration</h1>
        <div className="w-10" />
      </div>

      {/* Form container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6 animate-fadeIn">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-3xl mb-3 shadow-lg">
              🏍️
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Join HandyRide Riders</h2>
            <p className="text-sm text-gray-500">Fast, trusted, and verified student transport.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          {notice && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm text-center">
              {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <Section title="Personal Information">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
              <Input
                label="Matric Number"
                value={form.matric}
                onChange={(e) => set("matric", e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Department"
                  value={form.department}
                  onChange={(e) => set("department", e.target.value)}
                  required
                />
                <Select
                  label="Level"
                  value={form.level}
                  onChange={(e) => set("level", e.target.value)}
                  options={["100", "200", "300", "400", "500", "600"]}
                  required
                />
              </div>
            </Section>

            {/* Contact */}
            <Section title="Contact Information">
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
              />
            </Section>

            {/* Vehicle */}
            <Section title="Vehicle Details">
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Vehicle Type"
                  value={form.vehicleType}
                  onChange={(e) => set("vehicleType", e.target.value)}
                  options={[
                    "Motorcycle",
                    "Car",
                    "Tricycle",
                  ]}
                />
                <Input
                  label="Vehicle Number"
                  value={form.vehicleNumber}
                  onChange={(e) => set("vehicleNumber", e.target.value)}
                />
              </div>
              <Input
                label="License Number"
                value={form.licenseNumber}
                onChange={(e) => set("licenseNumber", e.target.value)}
              />
              {form.vehicleType && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 border border-red-100">
                    {form.vehicleType === "Car" ? (
                      <MdDirectionsCar className="text-red-600" />
                    ) : (
                      <MdDirectionsBike className="text-red-600" />
                    )}
                  </span>
                  <span>Selected: {form.vehicleType}</span>
                </div>
              )}
            </Section>

            {/* Password */}
            <Section title="Security">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </Section>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
            >
              {loading ? "Creating Account…" : "Register as Rider"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Already registered?{" "}
              <span
                onClick={() => navigate("/rider-login")}
                className="text-red-600 font-semibold cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* tiny animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        .animate-fadeIn { animation: fadeIn .6s ease-out }
      `}</style>
    </div>
  );
}

/* -----------------------------
   Reusable UI Components
------------------------------ */

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
        {title}
      </h4>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
      />
    </div>
  );
}

function Select({ label, options = [], ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...props}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
