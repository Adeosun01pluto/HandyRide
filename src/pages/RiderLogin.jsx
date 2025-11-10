// src/pages/RiderLogin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { BiChevronLeft } from "react-icons/bi";

export default function RiderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already signed in, go straight to rider-orders
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snap = await getDoc(doc(db, "riders", user.uid));
          const rider = snap.exists() ? snap.data() : null;
          if (!rider) return; // stay on page if rider profile missing
          // Cache minimal rider info for UI (headers, etc.)
          localStorage.setItem(
            "currentRider",
            JSON.stringify({
              id: user.uid,
              name: rider.name || user.displayName || "Rider",
              email: rider.email || user.email || "",
              phone: rider.phone || "",
              vehicleType: rider.vehicleType || "",
              vehicleNumber: rider.vehicleNumber || "",
              status: rider.status || "pending",
            })
          );
          if (rider.status === "approved") {
            navigate("/rider-orders", { replace: true });
          }
        } catch (_) {}
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = getAuth();
      // 1) Sign in with Firebase Auth (this is what RiderOrdersPage listens for)
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 2) Load rider profile
      const snap = await getDoc(doc(db, "riders", user.uid));
      if (!snap.exists()) {
        setError("Rider profile not found. Please contact admin.");
        setLoading(false);
        return;
      }
      const rider = snap.data();

      // 3) Status checks
      if (rider.status === "pending") {
        setError("Your account is pending admin verification. Please wait for approval.");
        setLoading(false);
        return;
      }
      if (rider.status !== "approved") {
        setError("Your account is not active. Please contact the admin.");
        setLoading(false);
        return;
      }

      // 4) Cache minimal rider info for UI
      localStorage.setItem(
        "currentRider",
        JSON.stringify({
          id: user.uid,
          name: rider.name || user.displayName || "Rider",
          email: rider.email || user.email || "",
          phone: rider.phone || "",
          vehicleType: rider.vehicleType || "",
          vehicleNumber: rider.vehicleNumber || "",
          status: rider.status || "approved",
        })
      );

      // 5) Go to orders (Accept will now see getAuth().currentUser)
      navigate("/rider-orders", { replace: true });
    } catch (err) {
      console.error(err);
      // Common auth errors → nicer messages
      const msg =
        err?.code === "auth/invalid-email"
          ? "Invalid email."
          : err?.code === "auth/user-not-found"
          ? "No rider found with this email."
          : err?.code === "auth/wrong-password"
          ? "Incorrect password."
          : "Login failed. Please check your details and connection.";
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
        <h1 className="flex-1 text-center font-bold text-lg">Rider Login</h1>
        <div className="w-10" />
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 animate-fadeIn">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-3xl mb-3 shadow-lg">
              🚗
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back, Rider</h2>
            <p className="text-sm text-gray-500">Sign in to continue your HandyRide journey.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
            >
              {loading ? "Signing In…" : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/rider-register")}
                className="text-red-600 font-semibold cursor-pointer hover:underline"
              >
                Register here
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

/* Reusable Input */
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
