// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import handy from "../assets/h1.png";
import handy1 from "../assets/hicon1.png";

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
          <button
            className="text-3xl font-bold text-red-500"
          >
            <img
              className="h-16 w-48 ml-[-10px] object-cover"
              src={handy}
              alt="Handy logo"
            />
          </button>
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
                  <div className="mt-4 mb-1 flex flex-col items-center gap-2">
                      <img className="h-48 object-center w-48" src={handy} alt="" />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 w-32">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-700 transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="w-full py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-700 transition-colors"
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
