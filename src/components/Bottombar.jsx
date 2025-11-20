// components/Bottombar.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdRestaurantMenu,
  MdFeedback,
  MdChecklist,
  MdDeliveryDining,
  MdLocalGroceryStore,
} from "react-icons/md";
import { LuBike } from "react-icons/lu";
import { GoPackage } from "react-icons/go";

const Bottombar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/";

  // 🔒 Don't render bottom bar on landing page
  if (isLanding) return null;

  const navItems = [
    {
      path: "/foods",
      icon: MdRestaurantMenu,
      label: "Foods",
    },
    {
      path: "/logistics",
      icon: GoPackage,
      label: "Dispatch",
    },
    {
      path: "/ride",
      icon: LuBike,
      label: "Book Ride",
    },
    {
      path: "/",
      icon: MdLocalGroceryStore,
      label: "Grocery",
    },
    {
      path: "/errands",
      icon: MdChecklist,
      label: "Errands",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Ideally move this CSS to a global file, but kept here for self-containment */}
      <style>{`
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-gradient-border {
          background: linear-gradient(
            to right,
            #4285F4,
            #DB4437,
            #F4B400,
            #0F9D58,
            #4285F4
          );
          background-size: 200% auto;
          animation: moveGradient 3s ease-in-out infinite;
        }
      `}</style>
  
      {/* Show only on mobile + small tablets: md:hidden */}
      <div className="block md:hidden">
        <div className="fixed bottom-4 left-4 right-4 z-50 h-16 rounded-2xl p-1 animated-gradient-border shadow-lg">
          <div className="grid h-full w-full grid-cols-5 rounded-xl bg-white overflow-hidden">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavigation(item.path)}
                  className={`inline-flex
                    ${active? " bg-red-500" :""} flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors duration-150 ease-in-out`}
                >
                  <IconComponent
                    className={`w-5 h-5 mb-1 transition-colors duration-150 ease-in-out ${
                      active
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-150 ease-in-out ${
                      active
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottombar;