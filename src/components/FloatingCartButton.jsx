// // // src/components/FloatingCartButton.jsx
// // import React from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { FiShoppingCart } from "react-icons/fi";
// // import { useCart } from "../context/CartContext";

// // const FloatingCartButton = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { itemsCount } = useCart();

// //   const isLanding = location.pathname === "/";
// //   const isCartPage = location.pathname === "/cart";

// //   // Hide on landing page and on the cart page itself
// //   if (isLanding || isCartPage) return null;

// //   return (
// //     <button
// //       onClick={() => navigate("/cart")}
// //       aria-label="Go to cart"
// //       className="
// //         fixed
// //         bottom-20 right-4
// //         sm:bottom-6 sm:right-6
// //         z-40
// //         flex items-center justify-center
// //         w-14 h-14
// //         rounded-full
// //         bg-red-600 text-white
// //         shadow-xl
// //         hover:bg-red-700
// //         active:scale-95
// //         transition-all
// //       "
// //     >
// //       <FiShoppingCart className="w-6 h-6" />
// //       {itemsCount > 0 && (
// //         <span
// //           className="
// //             absolute -top-1 -right-1
// //             inline-flex items-center justify-center
// //             text-xs font-bold
// //             bg-white text-red-600
// //             rounded-full
// //             w-5 h-5
// //             border border-red-600
// //           "
// //         >
// //           {itemsCount}
// //         </span>
// //       )}
// //     </button>
// //   );
// // };

// // export default FloatingCartButton;












// // src/components/FloatingCartButton.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FiShoppingCart } from "react-icons/fi";
// import { useCart } from "../context/CartContext";

// const FloatingCartButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { itemsCount } = useCart();

//   // 🧲 Draggable state
//   const [position, setPosition] = useState({ x: null, y: null });
//   const [isDragging, setIsDragging] = useState(false);

//   const btnRef = useRef(null);
//   const dragOffsetRef = useRef({ x: 0, y: 0 });

//   // 🧠 Animation CSS (bouncy / floating)
//   const floatStyles = `
//     @keyframes floatBounce {
//       0% {
//         transform: translateY(0);
//         box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
//       }
//       50% {
//         transform: translateY(-6px);
//         box-shadow: 0 18px 32px rgba(0, 0, 0, 0.24);
//       }
//       100% {
//         transform: translateY(0);
//         box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
//       }
//     }

//     .floating-cart-animate {
//       animation: floatBounce 2.6s ease-in-out infinite;
//     }

//     .floating-cart-animate.dragging {
//       animation: none; /* stop animation while dragging */
//     }
//   `;

//   const handleClick = () => {
//     if (isDragging) return; // avoid accidental click right after drag
//     navigate("/cart");
//   };

//   const handlePointerDown = (e) => {
//     if (!btnRef.current) return;

//     e.preventDefault();

//     const rect = btnRef.current.getBoundingClientRect();
//     dragOffsetRef.current = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     };

//     setIsDragging(true);
//   };

//   useEffect(() => {
//     if (!isDragging) return;

//     const handlePointerMove = (e) => {
//       const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
//       const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
//       if (clientX == null || clientY == null) return;

//       const vw = window.innerWidth;
//       const vh = window.innerHeight;

//       const btnSize = 56; // ≈ w-14/h-14
//       const padding = 8;

//       let nextX = clientX - dragOffsetRef.current.x;
//       let nextY = clientY - dragOffsetRef.current.y;

//       // Keep inside viewport
//       nextX = Math.max(padding, Math.min(vw - btnSize - padding, nextX));
//       nextY = Math.max(padding, Math.min(vh - btnSize - padding, nextY));

//       setPosition({ x: nextX, y: nextY });
//     };

//     const handlePointerUp = () => {
//       setIsDragging(false);
//     };

//     window.addEventListener("pointermove", handlePointerMove);
//     window.addEventListener("pointerup", handlePointerUp);
//     window.addEventListener("pointercancel", handlePointerUp);

//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//       window.removeEventListener("pointerup", handlePointerUp);
//       window.removeEventListener("pointercancel", handlePointerUp);
//     };
//   }, [isDragging]);

//   // 👉 Only decide visibility *after* all hooks
//   const isLanding = location.pathname === "/";
//   const isCartPage = location.pathname === "/cart";
//   if (isLanding || isCartPage) {
//     return null;
//   }

//   const useCustomPosition = position.x !== null && position.y !== null;

//   return (
//     <>
//       <style>{floatStyles}</style>
//       <button
//         ref={btnRef}
//         onClick={handleClick}
//         onPointerDown={handlePointerDown}
//         aria-label="Go to cart"
//         className={`
//           fixed
//           z-40
//           flex items-center justify-center
//           w-14 h-14
//           rounded-full
//           bg-red-600 text-white
//           hover:bg-red-700
//           active:scale-95
//           transition-transform transition-colors
//           ${isDragging ? "cursor-grabbing" : "cursor-grab"}
//           floating-cart-animate
//           ${isDragging ? "dragging" : ""}
//         `}
//         style={
//           useCustomPosition
//             ? {
//                 top: position.y,
//                 left: position.x,
//               }
//             : {
//                 bottom: "5.5rem", // ~ bottom-20
//                 right: "1rem", // ~ right-4
//               }
//         }
//       >
//         <FiShoppingCart className="w-6 h-6" />
//         {itemsCount > 0 && (
//           <span
//             className="
//               absolute -top-1 -right-1
//               inline-flex items-center justify-center
//               text-xs font-bold
//               bg-white text-red-600
//               rounded-full
//               w-5 h-5
//               border border-red-600
//             "
//           >
//             {itemsCount}
//           </span>
//         )}
//       </button>
//     </>
//   );
// };

// export default FloatingCartButton;





































// src/components/FloatingCartButton.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const FloatingCartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemsCount } = useCart();

  // 🧲 Draggable state
  const [position, setPosition] = useState({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);

  const btnRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const draggedRef = useRef(false); // 👉 tracks if this interaction was a drag

  // 🧠 Animation CSS (bouncy / floating)
  const floatStyles = `
    @keyframes floatBounce {
      0% {
        transform: translateY(0);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
      }
      50% {
        transform: translateY(-6px);
        box-shadow: 0 18px 32px rgba(0, 0, 0, 0.24);
      }
      100% {
        transform: translateY(0);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
      }
    }

    .floating-cart-animate {
      animation: floatBounce 2.6s ease-in-out infinite;
    }

    .floating-cart-animate.dragging {
      animation: none; /* stop animation while dragging */
    }
  `;

  const handleClick = () => {
    // If the last interaction was a drag, ignore this click
    if (draggedRef.current) {
      draggedRef.current = false; // reset for next interaction
      return;
    }
    navigate("/cart");
  };

  const handlePointerDown = (e) => {
    if (!btnRef.current) return;

    e.preventDefault();

    const rect = btnRef.current.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    draggedRef.current = false; // new interaction starts as non-drag
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX == null || clientY == null) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const btnSize = 56; // ≈ w-14/h-14
      const padding = 8;

      let nextX = clientX - dragOffsetRef.current.x;
      let nextY = clientY - dragOffsetRef.current.y;

      // Mark as drag once movement is noticeable
      const dx = nextX - (position.x ?? (vw - btnSize - padding));
      const dy = nextY - (position.y ?? (vh - btnSize - padding));
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        draggedRef.current = true;
      }

      // Keep inside viewport
      nextX = Math.max(padding, Math.min(vw - btnSize - padding, nextX));
      nextY = Math.max(padding, Math.min(vh - btnSize - padding, nextY));

      setPosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, position.x, position.y]);

  // 👉 Only decide visibility *after* all hooks
  const isLanding = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  if (isLanding || isCartPage) {
    return null;
  }

  const useCustomPosition = position.x !== null && position.y !== null;

  return (
    <>
      <style>{floatStyles}</style>
      <button
        ref={btnRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        aria-label="Go to cart"
        className={`
          fixed
          z-40
          flex items-center justify-center
          w-14 h-14
          rounded-full
          bg-red-600 text-white
          hover:bg-red-700
          active:scale-95
          transition-transform transition-colors
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          floating-cart-animate
          ${isDragging ? "dragging" : ""}
        `}
        style={
          useCustomPosition
            ? {
                top: position.y,
                left: position.x,
              }
            : {
                bottom: "5.5rem", // ~ bottom-20
                right: "1rem", // ~ right-4
              }
        }
      >
        <FiShoppingCart className="w-6 h-6" />
        {itemsCount > 0 && (
          <span
            className="
              absolute -top-1 -right-1
              inline-flex items-center justify-center
              text-xs font-bold
              bg-white text-red-600
              rounded-full
              w-5 h-5
              border border-red-600
            "
          >
            {itemsCount}
          </span>
        )}
      </button>
    </>
  );
};

export default FloatingCartButton;
