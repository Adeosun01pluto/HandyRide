// // src/pages/OwnerLogin.jsx
// import React, { useState } from "react";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth, db } from "../lib/firebase";
// import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const OwnerLogin = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [notice, setNotice] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setNotice("");

//     try {
//       const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
//       const uid = cred.user.uid;

//       // get owner's ownerCode
//       const ownerDoc = await getDoc(doc(db, "owners", uid));
//       if (!ownerDoc.exists()) {
//         await signOut(auth);
//         setError("No owner profile found. Please register first.");
//         return;
//       }
//       const ownerCode = ownerDoc.data().ownerCode;

//       // check if a restaurant exists for this ownerCode
//     const rq = query(
//       collection(db, "restaurants"),
//       where("ownerCode", "==", ownerCode),
//       where("status", "==", "confirmed"),
//       limit(1)
//     );
//       const rs = await getDocs(rq);

//       if (rs.empty) {
//         // not activated
//         await signOut(auth);
//         setNotice(
//           "Your access isn’t activated yet. Please share your Owner Code with the Admin and try again after they create your restaurant."
//         );
//         return;
//       }

//       // activated: go to owner dashboard (or to public page if you prefer)
//       navigate("/owner", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-10 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Restaurant Owner - Login</h1>
//       <p className="text-gray-600 text-sm mb-6">
//         You’ll be able to access your dashboard only after the Admin activates your restaurant using your Owner Code.
//       </p>

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
//         {notice && <p className="text-sm text-amber-600">{notice}</p>}
//       </form>
//     </div>
//   );
// };

// export default OwnerLogin;











































// // src/pages/OwnerLogin.jsx
// import React, { useState } from "react";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth, db } from "../lib/firebase";
// import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { MdRestaurant, MdEmail, MdLock, MdWarning } from "react-icons/md";

// const OwnerLogin = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [notice, setNotice] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setNotice("");

//     try {
//       const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
//       const uid = cred.user.uid;

//       // get owner's ownerCode
//       const ownerDoc = await getDoc(doc(db, "owners", uid));
//       if (!ownerDoc.exists()) {
//         await signOut(auth);
//         setError("No owner profile found. Please register first.");
//         return;
//       }
//       const ownerCode = ownerDoc.data().ownerCode;

//       // check if a restaurant exists for this ownerCode
//       const rq = query(
//         collection(db, "restaurants"),
//         where("ownerCode", "==", ownerCode),
//         where("status", "==", "confirmed"),
//         limit(1)
//       );
//       const rs = await getDocs(rq);

//       if (rs.empty) {
//         // not activated
//         await signOut(auth);
//         setNotice(
//           "Your access isn't activated yet. Please share your Owner Code with the Admin and try again after they create your restaurant."
//         );
//         return;
//       }

//       // activated: go to owner dashboard (or to public page if you prefer)
//       navigate("/owner", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center px-4 py-12">
//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
//       </div>

//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
//             <MdRestaurant className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-black text-gray-900 mb-3">Owner Login</h1>
//           <p className="text-gray-600 leading-relaxed">
//             Access your restaurant dashboard
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
//           <form onSubmit={onSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <MdEmail className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={onChange}
//                   placeholder="your@email.com"
//                   className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <MdLock className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={onChange}
//                   placeholder="Enter your password"
//                   className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Checking...</span>
//                 </div>
//               ) : (
//                 "Login to Dashboard"
//               )}
//             </button>

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
//                 <MdWarning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-red-700 font-medium">{error}</p>
//               </div>
//             )}

//             {/* Notice Message */}
//             {notice && (
//               <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3">
//                 <MdWarning className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-amber-800 font-medium">{notice}</p>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Info Note */}
//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
//           <p className="text-sm text-blue-800 leading-relaxed">
//             <span className="font-semibold">Note:</span> You can only access your dashboard after the Admin activates your restaurant using your Owner Code.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerLogin;




























// src/pages/OwnerLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdRestaurant, MdEmail, MdLock, MdWarning } from "react-icons/md";

const OwnerLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ prevent bubbling like in register

    if (loading) return; // ✅ prevent double submit

    setLoading(true);
    setError("");
    setNotice("");

    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;

      // ✅ force fresh token to avoid auth race
      await cred.user.getIdToken(true);

      // get owner's ownerCode
      const ownerDoc = await getDoc(doc(db, "owners", uid));
      if (!ownerDoc.exists()) {
        await signOut(auth);
        setError("No owner profile found. Please register first.");
        return;
      }
      const ownerCode = ownerDoc.data().ownerCode;

      // check if a restaurant exists for this ownerCode
      const rq = query(
        collection(db, "restaurants"),
        where("ownerCode", "==", ownerCode),
        where("status", "==", "confirmed"),
        limit(1)
      );
      const rs = await getDocs(rq);

      if (rs.empty) {
        await signOut(auth);
        setNotice(
          "Your access isn't activated yet. Please share your Owner Code with the Admin and try again after they create your restaurant."
        );
        return;
      }

      // activated: go to owner dashboard
      navigate("/owner", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center px-4 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <MdRestaurant className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Owner Login</h1>
          <p className="text-gray-600 leading-relaxed">
            Access your restaurant dashboard
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
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
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
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
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                  required
                  disabled={loading}
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
                  <span>Checking...</span>
                </div>
              ) : (
                "Login to Dashboard"
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <MdWarning className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Notice Message */}
            {notice && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3">
                <MdWarning className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium">{notice}</p>
              </div>
            )}
          </form>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-sm text-blue-800 leading-relaxed">
            <span className="font-semibold">Note:</span> You can only access your dashboard after the Admin activates your restaurant using your Owner Code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
