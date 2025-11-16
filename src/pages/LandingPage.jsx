// // src/pages/LandingPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { MdDirectionsBike, MdDirectionsCar } from "react-icons/md";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
//       {/* soft glow blobs */}
//       <div className="absolute inset-0 opacity-30 pointer-events-none">
//         <div className="absolute -top-16 -left-10 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
//         <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-5xl mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-20 flex flex-col gap-12 md:flex-row items-center">
//         {/* Left */}
//         <div className="flex-1 space-y-6 animate-fadeIn">
//           <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
//             <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//               <MdDirectionsBike className="text-white" />
//             </span>
//             <span className="text-xs font-semibold tracking-wide uppercase">
//               Welcome to HandyRide
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
//             Campus rides in{" "}
//             <span className="inline-block bg-gradient-to-r from-yellow-300 to-orange-300 text-transparent bg-clip-text">
//               seconds
//             </span>
//             .
//           </h1>

//           <p className="text-white/90 text-sm md:text-base max-w-xl">
//             Book bikes or cars, choose your vibe, set your price. Fast, safe and
//             built for students. Login or create a free account to start exploring HandyRide.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => navigate("/login")}
//               className="px-6 py-3 rounded-2xl font-bold bg-white text-red-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
//             >
//               Login to Continue
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="px-6 py-3 rounded-2xl font-bold border border-white/70 text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all"
//             >
//               New here? Register
//             </button>
//           </div>

//           <div className="flex items-center gap-4 text-xs text-white/80 pt-2">
//             <div className="flex items-center gap-2">
//               <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
//                 <MdDirectionsCar size={16} />
//               </span>
//               <span>Cars & bikes available</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
//                 🚦
//               </span>
//               <span>Peak hour smart pricing</span>
//             </div>
//           </div>
//         </div>

//         {/* Right floating card */}
//         <div className="flex-1 w-full max-w-sm md:max-w-md mt-8 md:mt-0">
//           <div className="bg-white/95 text-gray-900 rounded-3xl shadow-2xl border border-white/70 p-6 md:p-7 backdrop-blur-xl">
//             <h2 className="text-lg font-bold mb-1">Start your next ride</h2>
//             <p className="text-xs text-gray-500 mb-5">
//               Create a free account to unlock HandyRide and see current ride offers.
//             </p>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-3">
//                 <span className="w-9 h-9 rounded-2xl bg-red-50 flex items-center justify-center">
//                   🏍️
//                 </span>
//                 <div>
//                   <p className="font-semibold">Instant campus pickups</p>
//                   <p className="text-gray-500 text-xs">
//                     Riders nearby accept your request in seconds.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="w-9 h-9 rounded-2xl bg-emerald-50 flex items-center justify-center">
//                   🛡️
//                 </span>
//                 <div>
//                   <p className="font-semibold">Safety focused</p>
//                   <p className="text-gray-500 text-xs">
//                     Verified riders and optional car rides when you want comfort.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => navigate("/register")}
//               className="mt-6 w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all active:scale-95"
//             >
//               Create free HandyRide account
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn { from {opacity:0; transform:translateY(8px)} to {opacity:1; transform:translateY(0)} }
//         .animate-fadeIn { animation: fadeIn .7s ease-out }
//       `}</style>
//     </section>
//   );
// };

// export default LandingPage;






















// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Soft abstract shape in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] bg-red-50 rounded-[999px] rotate-[-12deg]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 pt-6 md:pt-8">
        {/* Logo text (replace with img if you have actual logo asset) */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-red-600 flex items-center justify-center text-white font-extrabold text-xl tracking-tight">
            F
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-red-600 tracking-tight">
            HandyRide
          </span>
        </div>

        {/* Website pill */}
        <div className="px-4 md:px-6 py-2 rounded-full bg-gray-100 shadow-sm text-sm md:text-base font-medium text-gray-800 border border-gray-200">
          www.handyride.ng
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-10 md:pb-16 pt-10 md:pt-12">
        <div className="grid gap-10 lg:gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)] items-center">
          {/* Left: text & bullets */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-red-600">
              Website
              <br />
              Launch
            </h1>

            <ul className="mt-4 space-y-3 text-base md:text-lg text-gray-800">
              {[
                "Order Food",
                "Send/Receive packages within Ilorin",
                "Book Ride on Campus",
                "Grocery Shopping",
                "Errands",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle: phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone outer shell */}
              <div className="w-[230px] sm:w-[250px] md:w-[260px] h-[420px] sm:h-[440px] md:h-[460px] bg-black rounded-[40px] shadow-2xl border border-black/70 flex items-center justify-center">
                {/* Inner screen */}
                <div className="relative w-[90%] h-[88%] bg-white rounded-[32px] flex flex-col items-center justify-center gap-6">
                  {/* Notch */}
                  <div className="absolute top-3 w-24 h-4 bg-black rounded-full mx-auto left-1/2 -translate-x-1/2" />

                  {/* App logo mark */}
                  <div className="mt-8 mb-4 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-2xl">
                      F
                    </div>
                    <span className="text-sm font-bold text-red-600 tracking-wide">
                      HandyRide
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 w-32">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold shadow-md hover:bg-green-700 transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="w-full py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold shadow-md hover:bg-green-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: store badges / coming soon */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="text-red-600 font-semibold text-lg">
              Coming soon!
            </div>

            {/* Store buttons – replace with real badges if you have assets */}
            <div className="space-y-3 w-full max-w-xs">
              <button className="w-full flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2.5 shadow-md hover:bg-black/90 transition-colors">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold">
                  ▶
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wide">
                    Get it on
                  </div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2.5 shadow-md hover:bg-black/90 transition-colors">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold">
                  
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wide">
                    Download on the
                  </div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default LandingPage;
