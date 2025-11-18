// src/pages/LandingPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import handy from "../assets/h1.png";
import handy1 from "../assets/hicon1.png";
import FloatingCartButton from "../components/FloatingCartButton";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
      <FloatingCartButton />

      {/* Soft abstract shape in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] bg-red-50 rounded-[999px] rotate-[-12deg]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 pt-6 md:pt-8 w-full">
        <div className="flex items-center gap-2">
          <button className="text-3xl font-bold text-red-500">
            <img
              className="h-16 w-48 ml-[-10px] object-cover"
              src={handy}
              alt="Handy logo"
            />
          </button>
        </div>

        <div className="px-4 md:px-6 py-2 rounded-full bg-gray-100 shadow-sm text-sm md:text-base font-medium text-gray-800 border border-gray-200">
          www.handyride.ng
        </div>
      </header>

      {/* Main section fully centered */}
      <main className=" relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        
        {/* Centered icon */}
        <img
          className="-mt-72 h-84 w-84 object-contain mb-6"
          src={handy1}
          alt="Handy Icon"
        />

        {/* Centered buttons */}
        <div className="flex flex-col gap-3 w-72">
          <button
            onClick={() => navigate("/register")}
            className="w-full py-2.5 rounded-full bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors"
          >
            Sign Up
          </button>
          {/* Footer link */}
        <div className="flex gap-3  items-center justify-center w-full text-sm text-gray-600">
          <span>
          Already a member ?{" "}{" "}
          </span>
          <Link
            to="/login"
            className="font-semibold text-red-600 hover:text-red-700"
          >
            Login here
          </Link>
        </div>
        </div>
        <p className="pt-4 font-semibold text-lg ">
          Welcome to HandyRide 🚦
          Order food. Send packages. Groceries, Book a Ride. All in one place.
          Built For You. Made for the Ilorin lifestyle.
          Let’s get you Started . 
        </p>
      </main>
    </section>
  );
};

export default LandingPage;
