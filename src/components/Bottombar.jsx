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


















































// // components/Bottombar.js
// import React from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining } from 'react-icons/md'

// const Bottombar = () => {
//  const navigate = useNavigate()
//  const location = useLocation()

//  const navItems = [
//   {
//    path: '/foods',
//    icon: MdRestaurantMenu,
//    label: 'Foods'
//   },
//   {
//    path: '/logistics',
//    icon: MdDeliveryDining,
//    label: 'Logistics'
//   },
//   {
//    path: '/errands',
//    icon: MdChecklist,
//    label: 'Errands'
//   },
//   {
//    path: '/feedback',
//    icon: MdFeedback,
//    label: 'Feedback'
//   }
//  ]

//  const handleNavigation = (path) => {
//   navigate(path)
//  }

//  const isActive = (path) => {
//   if (path === '/foods') {
//    return location.pathname === '/' || location.pathname === '/foods'
//   }
//   return location.pathname === path
//  }

//  return (
//   <>
//    {/* This <style> tag defines the animation. 
//     Ideally, this CSS should be in your global CSS file (e.g., index.css),
//     but it's placed here to keep the component self-contained.
//    */}
//    <style>{`
//     @keyframes moveGradient {
//      0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//      100% { background-position: 0% 50%; }
//     }

//     .animated-gradient-border {
//      background: linear-gradient(
//       to right, 
//       #4285F4, /* Blue */
//       #DB4437, /* Red */
//       #F4B400, /* Yellow */
//       #0F9D58, /* Green */
//       #4285F4 /* Blue (to loop smoothly) */
//      );
//      background-size: 200% auto;
//           /* Made animation slightly longer and bidirectional */
//      animation: moveGradient 3s ease-in-out infinite; 
//     }
//    `}</style>

//   <div className="block sm:hidden">
//     {/* This is the new "floating" wrapper.
//           - It's inset from the edges using `bottom-4 left-4 right-4`.
//           - `shadow-lg` provides the floating lift.
//           - `rounded-2xl` gives it the modern pill shape.
//           - `p-0.5` creates the "border" by revealing the gradient background.
//           - `animated-gradient-border` applies the gradient animation to this wrapper.
//     */}
//    <div className="fixed bottom-4 left-4 right-4 z-50 h-16 rounded-2xl p-1 animated-gradient-border shadow-lg">
    
//         {/* This is the inner content div.
//           - It has the solid background color.
//           - Its border radius (`rounded-xl`) is slightly smaller than the wrapper's 
//             (`rounded-2xl`), which looks clean with the padding.
//           - `overflow-hidden` ensures the button hover effects, etc.,
//             are clipped by the rounded corners.
//         */}
//     <div className="grid h-full w-full grid-cols-4 rounded-xl bg-white overflow-hidden">
//      {navItems.map((item) => {
//       const IconComponent = item.icon
//       const active = isActive(item.path)
     
//       return (
//        <button
//         key={item.path}
//         type="button"
//         onClick={() => handleNavigation(item.path)}
//         className={`inline-flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors duration-150 ease-in-out`}
//        >
//         <IconComponent
//          className={`w-5 h-5 mb-1 transition-colors duration-150 ease-in-out ${
//           active
//            ? 'text-red-600 dark:text-red-500'
//            : 'text-gray-500 dark:text-gray-400'
//          } `}
//         />
//         <span
//          className={`text-sm transition-colors duration-150 ease-in-out ${
//           active
//            ? 'text-red-600 dark:text-red-500'
//            : 'text-gray-500 dark:text-gray-400'
//          } `}
//         >
//          {item.label}
//         </span>
//        </button>
//       )
//       })}
//     </div>
//    </div>
//   </div>
//   </>
// )
// }

// export default Bottombar