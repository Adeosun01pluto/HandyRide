// // // src/pages/LandingPage.jsx
// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import handy from "../assets/h1.png";
// // import handy1 from "../assets/hicon1.png";
// // import FloatingCartButton from "../components/FloatingCartButton";

// // const LandingPage = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
// //       <FloatingCartButton />

// //       {/* Soft abstract shape in background */}
// //       <div className="pointer-events-none absolute inset-0">
// //         <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] bg-red-50 rounded-[999px] rotate-[-12deg]" />
// //       </div>
// //       {/* Main section fully centered */}
// //       <main className=" relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        
// //         {/* Centered icon */}
// //         <img
// //           className="-mt-72 h-84 w-84 object-contain mb-6"
// //           src={handy1}
// //           alt="Handy Icon"
// //         />

// //         {/* Centered buttons */}
// //         <div className="flex flex-col gap-3 w-72">
// //           <button
// //             onClick={() => navigate("/register")}
// //             className="w-full py-2.5 rounded-full bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors"
// //           >
// //             Sign Up
// //           </button>
// //           {/* Footer link */}
// //         <div className="flex gap-3  items-center justify-center w-full text-sm text-gray-600">
// //           <span>
// //           Already a member ?{" "}{" "}
// //           </span>
// //           <Link
// //             to="/login"
// //             className="font-semibold text-red-600 hover:text-red-700"
// //           >
// //             Login here
// //           </Link>
// //         </div>
// //         </div>
// //         <p className="pt-4 font-semibold text-lg ">
// //           Welcome to HandyRide 🚦
// //           Order food. Send packages. Groceries, Book a Ride. All in one place.
// //           Built For You. Made for the Ilorin lifestyle.
// //           Let’s get you Started . 
// //         </p>
// //       </main>
// //     </section>
// //   );
// // };

// // export default LandingPage;













// // src/pages/LandingPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import handy1 from "../assets/hicon1.png";
// import FloatingCartButton from "../components/FloatingCartButton";

// const LandingPage = () => {
//   const navigate = useNavigate();
//   // 🎬 Animated text slideshow options
//   const slideshowTexts = [
//     "🍕 Pizza, Burgers & More...",
//     "🍛 Jollof Rice Special",
//     "🍗 Fried Chicken & Grills",
//     "🍜 Noodles & Pasta",
//     "🥗 Fresh Salads",
//     "🍰 Desserts & Drinks",
//     "🌮 Shawarma & Wraps",
//     "🍲 Local Delicacies",
//   ];
//   // ✨ TYPEWRITER TEXT
//   const fullText =
//     "Welcome to HandyRide 🚦 Order food. Send packages. Groceries. Book a ride — all in one place. Built for you, made for the Ilorin lifestyle. Let's get you started.";

//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     let i = 0;
//     const speed = 28; // typing speed (lower = faster)

//     const interval = setInterval(() => {
//       if (i < fullText.length) {
//         setTypedText(fullText.substring(0, i + 1));
//         i++;
//       } else {
//         clearInterval(interval);
//       }
//     }, speed);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
//       {/* 🎬 Animated Text Slideshow - Horizontal Loop */}
//             <div className="mt-6 text-red-400 h-8 sm:h-10 md:h-12 overflow-hidden">
//               <div className="flex animate-scroll-left whitespace-nowrap">
//                 {[...slideshowTexts, ...slideshowTexts, ...slideshowTexts].map(
//                   (text, index) => (
//                     <p
//                       key={index}
//                       className="text-base sm:text-lg md:text-2xl font-bold   backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 inline-block mx-3"
//                     >
//                       {text}
//                     </p>
//                   )
//                 )}
//               </div>
//             </div>
//       {/* 🔥 Local animation styles */}
//       <style>{`
//       @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideInDown {
//           from { opacity: 0; transform: translateY(-50px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(50px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeInLeft {
//           from { opacity: 0; transform: translateX(-30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes scrollLeft {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
//         .animate-slideInDown {
//           animation: slideInDown 0.7s ease-out;
//         }
//         .animate-slideInUp {
//           animation: slideInUp 0.6s ease-out 0.2s both;
//         }
//         .animate-fadeInLeft {
//           animation: fadeInLeft 0.6s ease-out 0.3s both;
//         }
//         .animate-fadeInUp {
//           opacity: 0;
//         }
//         .animate-scroll-left {
//           animation: scrollLeft 10s linear infinite;
//         }
//         .animate-scroll-left:hover {
//           animation-play-state: paused;
//         }
//         @keyframes lpPageFadeIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes lpBgDrift {
//           0% { transform: translateX(0) rotate(-12deg); }
//           50% { transform: translateX(32px) rotate(-8deg); }
//           100% { transform: translateX(0) rotate(-12deg); }
//         }
//         @keyframes lpFloat {
//           0% { transform: translateY(0) scale(1); }
//           50% { transform: translateY(-8px) scale(1.02); }
//           100% { transform: translateY(0) scale(1); }
//         }
//         @keyframes lpFadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .lp-page { animation: lpPageFadeIn .7s ease-out both; }
//         .lp-bg-shape { animation: lpBgDrift 14s ease-in-out infinite; }
//         .lp-logo-float { animation: lpFloat 3s ease-in-out infinite; }
//         .lp-fade-up-1 { animation: lpFadeUp .7s ease-out .15s both; }
//         .lp-fade-up-2 { animation: lpFadeUp .7s ease-out .3s both; }

//         /* Typewriter cursor blink */
//         @keyframes cursorBlink {
//           0%, 49% { opacity: 1; }
//           50%, 100% { opacity: 0; }
//         }
//         .type-cursor {
//           display: inline-block;
//           width: 6px;
//           height: 20px;
//           background: #444;
//           margin-left: 2px;
//           animation: cursorBlink .9s infinite;
//         }
//       `}</style>

//       <FloatingCartButton />

//       {/* Soft abstract shape in background */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -right-40 top-1/4 w-[600px] h-[260px] rounded-[999px] rotate-[-12deg] lp-bg-shape" />
//       </div>

//       {/* Main section fully centered */}
//       <main className="lp-page relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">

//         {/* Centered icon */}
//         <img
//           className="lp-logo-float -mt-48 md:-mt-0 h-72 scale-150 w-72 md:h-48 md:w-48 object-contain mb-8"
//           src={handy1}
//           alt="Handy Icon"
//         />

//         {/* Centered buttons */}
//         <div className="lp-fade-up-1 flex flex-col gap-3 w-72 max-w-full">
//           <button
//             onClick={() => navigate("/register")}
//             className="w-full py-2.5 rounded-full bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200"
//           >
//             Sign Up
//           </button>

//           <div className="flex gap-2 items-center justify-center w-full text-sm text-gray-600">
//             <span>Already a member?</span>
//             <Link
//               to="/login"
//               className="font-semibold text-red-600 hover:text-red-700"
//             >
//               Login here
//             </Link>
//           </div>
//         </div>

//         {/* 🔥 Typewriter Intro Text */}
//         <p className="lp-fade-up-2 pt-6 max-w-xl text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
//           {typedText}
//           <span className="type-cursor"></span>
//         </p>
//       </main>
//     </section>
//   );
// };

// export default LandingPage;




































import React, { useMemo } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiCopy,
  FiRefreshCcw,
  FiShoppingCart,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    items,
    total,
    addToCart,
    decrementFromCart,
    removeFromCart,
    clearCart,
    orderId,
    refreshOrderId,
  } = useCart();

  // 🔹 Build rich WhatsApp message including order + delivery template
  const buildWhatsAppText = () => {
    const lines =
      items.length === 0
        ? "Cart is empty."
        : items
            .map(
              (i) =>
                `- ${i.name} x${i.quantity} = ₦${(
                  i.price * i.quantity
                ).toLocaleString()}`
            )
            .join("\n");

    return `Hello Handy Foods & Errands!
I’d like to place a food order from the Handy app.

Order Summary:
ORDER #: ${orderId}
---------------------
${lines}
---------------------
Total: ₦${total.toLocaleString()}

Delivery Details (please fill in):
Receiver’s Name: —
Receiver’s Address: —
Receiver’s Phone Number: —
Preferred Delivery Time: —
Sender’s Phone Number: —
Additional Notes (If any): —

Kindly assign a rider for pickup.
Thank you!`;
  };

  const whatsappHref = useMemo(() => {
    const text = buildWhatsAppText();
    return `https://wa.me/+2349118347755?text=${encodeURIComponent(text)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, total, orderId]);

  const copyPretext = async () => {
    const text = buildWhatsAppText();
    try {
      await navigator.clipboard.writeText(text);
      alert("Order details copied! Paste in WhatsApp to complete your request.");
    } catch {
      alert("Could not copy. Please copy manually.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 md:px-10 lg:px-20 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <FiShoppingCart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-black text-gray-900">
                    Your Cart
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {items.length} item
                    {items.length !== 1 ? "s" : ""} in your cart
                  </p>
                </div>
              </div>
              <Link
                to="/foods"
                className="text-sm md:text-md inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors duration-300 group"
              >
                <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order ID Section */}
            <div className="flex flex-wrap items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                Order ID:
              </span>
              <code className="bg-white rounded-lg px-4 py-2 font-mono text-sm font-bold text-gray-900 border border-gray-200">
                {orderId}
              </code>
              <button
                onClick={refreshOrderId}
                className="inline-flex items-center gap-2 text-sm bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                title="Generate a new order number"
              >
                <FiRefreshCcw className="w-4 h-4" />
                <span>New ID</span>
              </button>
              <button
                onClick={copyPretext}
                className="inline-flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                title="Copy order details"
              >
                <FiCopy className="w-4 h-4" />
                <span>Copy Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 md:px-10 lg:px-20 py-8">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 w-full">
            {/* Cart Items */}
            <div className="lg:col-span-2 w-full">
              {items.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some delicious items to get started!
                  </p>
                  <Link
                    to="/foods"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <span>Browse Restaurants</span>
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* List Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                    <div className="col-span-5">Item</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* List Items */}
                  <div className="divide-y divide-gray-100">
                    {items.map((i) => (
                      <div
                        key={`${i.restaurantId}::${i.id}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {/* Item Info */}
                        <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                          <img
                            src={
                              i.image ||
                              "https://via.placeholder.com/60x60?text=No+Img"
                            }
                            alt={i.name}
                            className="w-16 h-16 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
                              {i.name}
                            </h3>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-1 md:col-span-2 flex md:items-center md:justify-center">
                          <div className="flex items-center gap-2 md:block">
                            <span className="text-xs text-gray-500 md:hidden">
                              Unit Price:
                            </span>
                            <span className="font-semibold text-gray-900 text-sm md:text-base">
                              ₦{i.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-span-1 md:col-span-3 flex items-center md:justify-center gap-2">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                            <button
                              onClick={() =>
                                decrementFromCart(i.id, i.restaurantId)
                              }
                              className="w-8 h-8 flex items-center justify-center bg-white hover:bg-red-50 rounded-full transition-all duration-300 text-gray-700 hover:text-red-600"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold text-gray-900 w-8 text-center">
                              {i.quantity}
                            </span>
                            <button
                              onClick={() =>
                                addToCart({
                                  id: i.id,
                                  restaurantId: i.restaurantId,
                                  name: i.name,
                                  price: i.price,
                                  image: i.image,
                                  quantity: 1,
                                })
                              }
                              className="w-8 h-8 flex items-center justify-center bg:white hover:bg-red-50 rounded-full transition-all duration-300 text-gray-700 hover:text-red-600"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(i.id, i.restaurantId)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-all duration-300"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                          <div className="flex items-center gap-2 md:block md:text-right">
                            <span className="text-xs text-gray-500 md:hidden">
                              Subtotal:
                            </span>
                            <span className="text-base md:text-lg font-bold text-gray-900">
                              ₦{(i.price * i.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm md:text-md text-gray-600 font-medium">
                      Subtotal
                    </span>
                    <span className="text-md md:text-xl font-bold text-gray-900">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-900 font-bold text-lg">
                      Total
                    </span>
                    <span className="text-lg md:text-3xl font-black text-red-600">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                    </svg>
                    <span>Checkout via WhatsApp</span>
                  </a>

                  <button
                    onClick={clearCart}
                    className="w-full flex items:center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {/* Info Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <span className="font-semibold">Note:</span> Your WhatsApp
                    message includes your <strong>Order #{orderId}</strong> and
                    a delivery template so our team can confirm quickly and
                    assign a rider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
