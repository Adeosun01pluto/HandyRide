// // src/pages/OwnerRegister.jsx
// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth } from "../lib/firebase";
// import { db } from "../lib/firebase";
// import { generateOwnerCode } from "../utils/ownerCode";

// const OwnerRegister = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     restaurantName: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [ownerCode, setOwnerCode] = useState("");
//   const [error, setError] = useState("");

//   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setOwnerCode("");

//     try {
//       const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
//       const uid = cred.user.uid;

//       const code = generateOwnerCode(form.restaurantName);
//       await setDoc(doc(db, "owners", uid), {
//         email: form.email,
//         restaurantName: form.restaurantName,
//         ownerCode: code,
//         status: "pending",
//         createdAt: new Date().toISOString(),
//       });

//       setOwnerCode(code);
//       setForm({ email: "", password: "", restaurantName: "" });
//     } catch (err) {
//       setError(err.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-10 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Restaurant Owner - Register</h1>
//       <p className="text-gray-600 text-sm mb-6">
//         Create your owner account. We’ll generate an <b>Owner Code</b> tied to your restaurant name.
//         Share that code with the Admin so they can create and activate your restaurant.
//       </p>

//       <form onSubmit={onSubmit} className="bg-white rounded-xl shadow border p-4 space-y-3">
//         <input
//           name="restaurantName"
//           value={form.restaurantName}
//           onChange={onChange}
//           placeholder="Restaurant Name"
//           className="border p-2 rounded w-full"
//           required
//         />
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
//         <button
//           disabled={loading}
//           className="bg-red-600 text-white py-2 rounded w-full"
//         >
//           {loading ? "Creating..." : "Create Owner Account"}
//         </button>
//         {error && <p className="text-sm text-red-600">{error}</p>}
//       </form>

//       {ownerCode && (
//         <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
//           <h2 className="font-semibold">Owner Code (give this to the Admin):</h2>
//           <code className="block bg-white border rounded p-2 mt-2">{ownerCode}</code>
//           <p className="text-xs text-gray-600 mt-2">
//             The Admin must create your restaurant using this code before you can log in to your dashboard.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerRegister;





























// src/pages/OwnerRegister.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../lib/firebase";
import { db } from "../lib/firebase";
import { generateOwnerCode } from "../utils/ownerCode";
import { MdRestaurant, MdEmail, MdLock, MdCheckCircle } from "react-icons/md";

const OwnerRegister = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    restaurantName: "",
  });
  const [loading, setLoading] = useState(false);
  const [ownerCode, setOwnerCode] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOwnerCode("");

    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;

      const code = generateOwnerCode(form.restaurantName);
      await setDoc(doc(db, "owners", uid), {
        email: form.email,
        restaurantName: form.restaurantName,
        ownerCode: code,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      setOwnerCode(code);
      setForm({ email: "", password: "", restaurantName: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center px-4 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <MdRestaurant className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Restaurant Owner</h1>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
            Create your owner account. We'll generate an <span className="font-semibold text-gray-900">Owner Code</span> tied to your restaurant name.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Restaurant Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdRestaurant className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="restaurantName"
                  value={form.restaurantName}
                  onChange={onChange}
                  placeholder="Enter your restaurant name"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a secure password"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Owner Account"
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Success Message with Owner Code */}
        {ownerCode && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-8 shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MdCheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Account Created Successfully!</h2>
                <p className="text-sm text-gray-700">Share this code with the Admin to activate your restaurant</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-green-300 p-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Owner Code:</p>
              <code className="block bg-gray-50 border-2 border-gray-300 rounded-lg p-4 text-center text-2xl font-mono font-bold text-gray-900 select-all">
                {ownerCode}
              </code>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-semibold">Important:</span> The Admin must create your restaurant using this code before you can access your dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Info Note */}
        {!ownerCode && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-sm text-blue-800 leading-relaxed">
              After registration, you'll receive an <span className="font-semibold">Owner Code</span>. Share it with the Admin so they can create and activate your restaurant in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerRegister