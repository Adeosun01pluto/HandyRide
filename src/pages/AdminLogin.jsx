// // src/pages/AdminLogin.jsx
// import React, { useState } from "react";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth, db } from "../lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
//       const uid = cred.user.uid;

//       // Verify admin membership
//       const adminDoc = await getDoc(doc(db, "admins", uid));
//       if (!adminDoc.exists()) {
//         await signOut(auth);
//         setError("Unauthorized. This account is not an admin.");
//         return;
//       }

//       navigate("/admin", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-10 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
//       <p className="text-gray-600 text-sm mb-6">Admins only. You add admins manually in Firestore at <code>admins/&lbrace;uid&rbrace;</code>.</p>

//       <form onSubmit={onSubmit} className="bg-white rounded-xl shadow border p-4 space-y-3">
//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={onChange}
//           placeholder="Email"
//           className="border p-2 rounded w-full"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={onChange}
//           placeholder="Password"
//           className="border p-2 rounded w-full"
//           required
//         />
//         <button disabled={loading} className="bg-red-600 text-white py-2 rounded w-full">
//           {loading ? "Checking…" : "Login"}
//         </button>
//         {error && <p className="text-sm text-red-600">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
















// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings, MdEmail, MdLock, MdWarning, MdShield } from "react-icons/md";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;

      // Verify admin membership
      const adminDoc = await getDoc(doc(db, "admins", uid));
      if (!adminDoc.exists()) {
        await signOut(auth);
        setError("Unauthorized. This account is not an admin.");
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl mb-4 shadow-2xl">
            <MdAdminPanelSettings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-black mb-3">Admin Access</h1>
          <p className="text-gray-700 leading-relaxed">
            Authorized personnel only
          </p>
        </div>

        {/* Form Card with Frosted Glass Effect */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <MdShield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Secure Login</h2>
              <p className="text-xs text-gray-600">Administrator dashboard access</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
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
                  placeholder="admin@email.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none bg-white"
                  required
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
                  placeholder="Enter admin password"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none bg-white"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Access Admin Dashboard"
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <MdWarning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Info Note with Frosted Glass */}
        <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <p className="text-sm text-gray-200 leading-relaxed">
            <span className="font-semibold text-white">Admin Access:</span> Admins are manually added in Firestore at <code className="bg-black/30 px-2 py-1 rounded text-xs font-mono">admins/{'{uid}'}</code>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <MdShield className="w-4 h-4" />
          <span>Secured by Firebase Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;