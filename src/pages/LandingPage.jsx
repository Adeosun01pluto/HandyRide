// // src/pages/LandingPage.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import handy from "../assets/h1.png";
// import handy1 from "../assets/hicon1.png";
// import FloatingCartButton from "../components/FloatingCartButton";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
//       <FloatingCartButton />

//       {/* Soft abstract shape in background */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] bg-red-50 rounded-[999px] rotate-[-12deg]" />
//       </div>
//       {/* Main section fully centered */}
//       <main className=" relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        
//         {/* Centered icon */}
//         <img
//           className="-mt-72 h-84 w-84 object-contain mb-6"
//           src={handy1}
//           alt="Handy Icon"
//         />

//         {/* Centered buttons */}
//         <div className="flex flex-col gap-3 w-72">
//           <button
//             onClick={() => navigate("/register")}
//             className="w-full py-2.5 rounded-full bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors"
//           >
//             Sign Up
//           </button>
//           {/* Footer link */}
//         <div className="flex gap-3  items-center justify-center w-full text-sm text-gray-600">
//           <span>
//           Already a member ?{" "}{" "}
//           </span>
//           <Link
//             to="/login"
//             className="font-semibold text-red-600 hover:text-red-700"
//           >
//             Login here
//           </Link>
//         </div>
//         </div>
//         <p className="pt-4 font-semibold text-lg ">
//           Welcome to HandyRide 🚦
//           Order food. Send packages. Groceries, Book a Ride. All in one place.
//           Built For You. Made for the Ilorin lifestyle.
//           Let’s get you Started . 
//         </p>
//       </main>
//     </section>
//   );
// };

// export default LandingPage;













// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handy1 from "../assets/hicon1.png";
import FloatingCartButton from "../components/FloatingCartButton";

const LandingPage = () => {
  const navigate = useNavigate();

  // ✨ TYPEWRITER TEXT
  const fullText =
    "Welcome to HandyRide 🚦 Order food. Send packages. Groceries. Book a ride — all in one place. Built for you, made for the Ilorin lifestyle. Let's get you started.";

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const speed = 28; // typing speed (lower = faster)

    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
      {/* 🔥 Local animation styles */}
      <style>{`
        @keyframes lpPageFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lpBgDrift {
          0% { transform: translateX(0) rotate(-12deg); }
          50% { transform: translateX(32px) rotate(-8deg); }
          100% { transform: translateX(0) rotate(-12deg); }
        }
        @keyframes lpFloat {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes lpFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lp-page { animation: lpPageFadeIn .7s ease-out both; }
        .lp-bg-shape { animation: lpBgDrift 14s ease-in-out infinite; }
        .lp-logo-float { animation: lpFloat 3s ease-in-out infinite; }
        .lp-fade-up-1 { animation: lpFadeUp .7s ease-out .15s both; }
        .lp-fade-up-2 { animation: lpFadeUp .7s ease-out .3s both; }

        /* Typewriter cursor blink */
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .type-cursor {
          display: inline-block;
          width: 6px;
          height: 20px;
          background: #444;
          margin-left: 2px;
          animation: cursorBlink .9s infinite;
        }
      `}</style>

      <FloatingCartButton />

      {/* Soft abstract shape in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] rounded-[999px] rotate-[-12deg] lp-bg-shape" />
      </div>

      {/* Main section fully centered */}
      <main className="lp-page relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">

        {/* Centered icon */}
        <img
          className="lp-logo-float -mt-48 md:-mt-0 h-72 scale-150 w-72 md:h-48 md:w-48 object-contain mb-8"
          src={handy1}
          alt="Handy Icon"
        />

        {/* Centered buttons */}
        <div className="lp-fade-up-1 flex flex-col gap-3 w-72 max-w-full">
          <button
            onClick={() => navigate("/register")}
            className="w-full py-2.5 rounded-full bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200"
          >
            Sign Up
          </button>

          <div className="flex gap-2 items-center justify-center w-full text-sm text-gray-600">
            <span>Already a member?</span>
            <Link
              to="/login"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Login here
            </Link>
          </div>
        </div>

        {/* 🔥 Typewriter Intro Text */}
        <p className="lp-fade-up-2 pt-6 max-w-xl text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
          {typedText}
          <span className="type-cursor"></span>
        </p>
      </main>
    </section>
  );
};

export default LandingPage;
