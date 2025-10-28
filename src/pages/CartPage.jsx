// // src/pages/CartPage.jsx
// import React, { useMemo } from "react";
// import { FiMinus, FiPlus, FiTrash2, FiCopy, FiRefreshCcw } from "react-icons/fi";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const CartPage = () => {
//   const {
//     items,
//     total,
//     addToCart,
//     decrementFromCart,
//     removeFromCart,
//     clearCart,
//     orderId,
//     refreshOrderId,
//   } = useCart();

//   const whatsappHref = useMemo(() => {
//     const lines =
//       items.length === 0
//         ? "Cart is empty."
//         : items
//             .map(
//               (i) =>
//                 `- ${i.name} x${i.quantity} = ₦${(i.price * i.quantity).toLocaleString()}`
//             )
//             .join("\n");

//     const text =
//       `ORDER #: ${orderId}\n` +
//       `---------------------\n` +
//       `${lines}\n` +
//       `---------------------\n` +
//       `Total: ₦${total.toLocaleString()}`;

//     return `https://wa.me/+2349118347755?text=${encodeURIComponent(text)}`;
//   }, [items, total, orderId]);

//   const copyPretext = async () => {
//     const lines =
//       items.length === 0
//         ? "Cart is empty."
//         : items
//             .map(
//               (i) =>
//                 `- ${i.name} x${i.quantity} = ₦${(i.price * i.quantity).toLocaleString()}`
//             )
//             .join("\n");
//     const text =
//       `ORDER #: ${orderId}\n` +
//       `---------------------\n` +
//       `${lines}\n` +
//       `---------------------\n` +
//       `Total: ₦${total.toLocaleString()}`;
//     try {
//       await navigator.clipboard.writeText(text);
//       alert("Order pretext copied!");
//     } catch {
//       alert("Could not copy. Please copy manually.");
//     }
//   };

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Your Cart</h1>
//         <Link to="/foods" className="text-red-600 hover:underline">&larr; Continue shopping</Link>
//       </div>

//       <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
//         <span className="font-medium">Order #:</span>
//         <code className="bg-gray-100 rounded px-2 py-1">{orderId}</code>
//         <button
//           onClick={refreshOrderId}
//           className="inline-flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-gray-50"
//           title="Generate a new order number"
//         >
//           <FiRefreshCcw /> New ID
//         </button>
//         <button
//           onClick={copyPretext}
//           className="inline-flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-gray-50"
//           title="Copy order pretext"
//         >
//           <FiCopy /> Copy pretext
//         </button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 mt-6">
//         {/* Items */}
//         <div className="md:col-span-2 bg-white rounded-xl shadow border">
//           {items.length === 0 ? (
//             <div className="p-6 text-gray-500">Your cart is empty.</div>
//           ) : (
//             <ul className="divide-y">
//               {items.map((i) => (
//                 <li key={`${i.restaurantId}::${i.id}`} className="p-4 flex gap-4 items-center">
//                   <img
//                     src={i.image || "https://via.placeholder.com/80x80?text=No+Img"}
//                     alt={i.name}
//                     className="w-20 h-20 rounded object-cover border"
//                   />
//                   <div className="flex-1">
//                     <div className="font-semibold">{i.name}</div>
//                     <div className="text-xs text-gray-500">Unit: ₦{i.price.toLocaleString()}</div>
//                     <div className="mt-2 flex items-center gap-2">
//                       <button
//                         onClick={() => decrementFromCart(i.id, i.restaurantId)}
//                         className="p-1 border rounded"
//                         aria-label="Decrease quantity"
//                       >
//                         <FiMinus />
//                       </button>
//                       <span className="text-sm font-semibold">{i.quantity}</span>
//                       <button
//                         onClick={() =>
//                           addToCart({
//                             id: i.id,
//                             restaurantId: i.restaurantId,
//                             name: i.name,
//                             price: i.price,
//                             image: i.image,
//                             quantity: 1,
//                           })
//                         }
//                         className="p-1 border rounded"
//                         aria-label="Increase quantity"
//                       >
//                         <FiPlus />
//                       </button>
//                       <button
//                         onClick={() => removeFromCart(i.id, i.restaurantId)}
//                         className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded"
//                         aria-label="Remove item"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="font-bold">₦{(i.price * i.quantity).toLocaleString()}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Summary */}
//         <div className="bg-white rounded-xl shadow border p-4 h-fit sticky top-24">
//           <h2 className="font-semibold mb-3">Summary</h2>
//           <div className="flex items-center justify-between text-sm mb-2">
//             <span>Subtotal</span>
//             <span className="font-medium">₦{total.toLocaleString()}</span>
//           </div>
//           {/* Add delivery fee or promos here if needed */}
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={clearCart}
//               className="w-1/3 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50"
//             >
//               Clear
//             </button>
//             <a
//               href={whatsappHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-2/3 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm text-center"
//             >
//               Checkout via WhatsApp
//             </a>
//           </div>

//           <p className="mt-3 text-[12px] text-gray-500">
//             The WhatsApp message includes your <strong>Order #{orderId}</strong> so support can quickly find your order.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;






















































// src/pages/CartPage.jsx
import React, { useMemo } from "react";
import { FiMinus, FiPlus, FiTrash2, FiCopy, FiRefreshCcw, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
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

  const whatsappHref = useMemo(() => {
    const lines =
      items.length === 0
        ? "Cart is empty."
        : items
            .map(
              (i) =>
                `- ${i.name} x${i.quantity} = ₦${(i.price * i.quantity).toLocaleString()}`
            )
            .join("\n");

    const text =
      `ORDER #: ${orderId}\n` +
      `---------------------\n` +
      `${lines}\n` +
      `---------------------\n` +
      `Total: ₦${total.toLocaleString()}`;

    return `https://wa.me/+2349118347755?text=${encodeURIComponent(text)}`;
  }, [items, total, orderId]);

  const copyPretext = async () => {
    const lines =
      items.length === 0
        ? "Cart is empty."
        : items
            .map(
              (i) =>
                `- ${i.name} x${i.quantity} = ₦${(i.price * i.quantity).toLocaleString()}`
            )
            .join("\n");
    const text =
      `ORDER #: ${orderId}\n` +
      `---------------------\n` +
      `${lines}\n` +
      `---------------------\n` +
      `Total: ₦${total.toLocaleString()}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Order pretext copied!");
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
                  <h1 className="text-xl md:text-3xl font-black text-gray-900">Your Cart</h1>
                  <p className="text-gray-600 text-sm">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
                </div>
              </div>
              <Link 
                to="/foods" 
                className="text-sm md:text-md  inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors duration-300 group"
              >
                <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order ID Section */}
            <div className="flex flex-wrap items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Order ID:</span>
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
                title="Copy order pretext"
              >
                <FiCopy className="w-4 h-4" />
                <span>Copy Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8">
        <div className=" mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
                  <Link
                    to="/foods"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <span>Browse Restaurants</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((i, idx) => (
                    <div
                      key={`${i.restaurantId}::${i.id}`}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="p-5 md:p-6 flex gap-5 items-center">
                        {/* Image */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={i.image || "https://via.placeholder.com/80x80?text=No+Img"}
                            alt={i.name}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                            {i.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>Unit Price:</span>
                            <span className="font-semibold text-gray-900">₦{i.price.toLocaleString()}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                              <button
                                onClick={() => decrementFromCart(i.id, i.restaurantId)}
                                className="w-9 h-9 flex items-center justify-center bg-white hover:bg-red-50 rounded-full transition-all duration-300 text-gray-700 hover:text-red-600 shadow-sm"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="text-base font-bold text-gray-900 w-8 text-center">
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
                                className="w-9 h-9 flex items-center justify-center bg-white hover:bg-red-50 rounded-full transition-all duration-300 text-gray-700 hover:text-red-600 shadow-sm"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(i.id, i.restaurantId)}
                              className="w-9 h-9 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-all duration-300"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500 font-medium mb-1">Subtotal</p>
                          <p className="text-2xl font-black text-gray-900">
                            ₦{(i.price * i.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm md:text-md text-gray-600 font-medium">Subtotal</span>
                    <span className="text-md md:text-xl font-bold text-gray-900">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-900 font-bold text-lg">Total</span>
                    <span className="text-lg md:text-3xl font-black text-red-600">₦{total.toLocaleString()}</span>
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
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Checkout via WhatsApp</span>
                  </a>

                  <button
                    onClick={clearCart}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {/* Info Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <span className="font-semibold">Note:</span> Your WhatsApp message includes Order <strong>#{orderId}</strong> so our support team can quickly process your order.
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