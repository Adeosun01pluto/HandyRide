// // src/pages/RestaurantPage.jsx
// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { useRestaurantBySlug } from "../hooks/useRestaurantBySlug";
// import { useCart } from "../context/CartContext";

// const RestaurantPage = () => {
//   const { slug } = useParams();
//   const { restaurant, menu, loading } = useRestaurantBySlug(slug);
//   const { addToCart } = useCart();

//   if (loading) return <div className="p-6">Loading…</div>;
//   if (!restaurant) return <div className="p-6">Restaurant not found.</div>;

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-6">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">{restaurant.name}</h1>
//           <p className="text-gray-500 text-sm">
//             {restaurant.location} • {restaurant.operatingHours} • From {restaurant.deliveryAmount}
//           </p>
//         </div>
//         {restaurant.whatsappLink && (
//           <a
//             href={restaurant.whatsappLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             Order via WhatsApp
//           </a>
//         )}
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 mt-6">
//         {menu.map((m) => (
//           <div key={m.id} className="bg-white rounded-lg shadow p-3">
//             <div className="h-40 w-full overflow-hidden rounded">
//               <img
//                 src={m.image || "https://via.placeholder.com/600x400?text=No+Image"}
//                 alt={m.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="mt-3 font-semibold">{m.name}</h3>
//             <p className="text-sm text-gray-600 line-clamp-3">{m.description}</p>
//             <div className="mt-2 flex items-center justify-between">
//               <span className="font-bold">₦{Number(m.price || 0).toLocaleString()}</span>
//               <button
//                 onClick={() =>
//                   addToCart({
//                     id: m.id,
//                     restaurantId: restaurant.id,
//                     name: m.name,
//                     price: Number(m.price || 0),
//                     image: m.image,
//                     quantity: 1,
//                   })
//                 }
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded"
//               >
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8">
//         <Link to="/foods" className="text-red-600 hover:underline">&larr; Back to restaurants</Link>
//       </div>
//     </div>
//   );
// };

// export default RestaurantPage;




































// src/pages/RestaurantPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRestaurantBySlug } from "../hooks/useRestaurantBySlug";
import { useCart } from "../context/CartContext";
import { MdLocationOn, MdAccessTime, MdDeliveryDining, MdArrowBack, MdShoppingCart, MdAdd, MdRemove } from "react-icons/md";

const RestaurantPage = () => {
  const { slug } = useParams();
  const { restaurant, menu, loading } = useRestaurantBySlug(slug);
  const { addToCart, updateQuantity, cart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const getItemQuantity = (itemId) => {
    const cartItem = cart?.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      restaurantId: restaurant.id,
      name: item.name,
      price: Number(item.price || 0),
      image: item.image,
      quantity: 1,
    });
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
  };

  const handleIncrement = (itemId) => {
    const currentQty = getItemQuantity(itemId);
    updateQuantity(itemId, currentQty + 1);
  };

  const handleDecrement = (itemId) => {
    const currentQty = getItemQuantity(itemId);
    if (currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    } else {
      updateQuantity(itemId, 0);
      setAddedItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the restaurant you're looking for.</p>
          <Link
            to="/foods"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            <MdArrowBack />
            <span>Back to Restaurants</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/foods"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-300 group mb-6"
          >
            <MdArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Restaurants</span>
          </Link>

          {/* Restaurant Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 md:mb-12">
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-12">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                  <span className="text-white text-sm font-semibold">Now Available</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {restaurant.name}
                </h1>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {restaurant.location && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdLocationOn className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">Location</p>
                        <p className="text-white font-semibold">{restaurant.location}</p>
                      </div>
                    </div>
                  )}

                  {restaurant.operatingHours && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdAccessTime className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">Hours</p>
                        <p className="text-white font-semibold">{restaurant.operatingHours}</p>
                      </div>
                    </div>
                  )}

                  {restaurant.deliveryAmount && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdDeliveryDining className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">Delivery From</p>
                        <p className="text-white font-semibold">{restaurant.deliveryAmount}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Menu</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              <span className="text-gray-500 font-medium">{menu.length} items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {menu.map((m, idx) => {
                const quantity = getItemQuantity(m.id);
                const isInCart = quantity > 0;

                return (
                  <div
                    key={m.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={m.image || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={m.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                        {m.name}
                      </h3>
                      
                      {m.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {m.description}
                        </p>
                      )}

                      {/* Price and Add Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1">Price</p>
                          <span className="text-2xl font-black text-gray-900">
                            ₦{Number(m.price || 0).toLocaleString()}
                          </span>
                        </div>
                        
                        {!isInCart ? (
                          <button
                            onClick={() => handleAddToCart(m)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            <MdShoppingCart className="w-5 h-5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-red-600 rounded-full shadow-lg">
                            <button
                              onClick={() => handleDecrement(m.id)}
                              className="w-10 h-10 flex items-center justify-center text-white hover:bg-red-700 rounded-full transition-colors duration-300"
                            >
                              <MdRemove className="w-5 h-5" />
                            </button>
                            <span className="w-8 text-center text-white font-bold">
                              {quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(m.id)}
                              className="w-10 h-10 flex items-center justify-center text-white hover:bg-red-700 rounded-full transition-colors duration-300"
                            >
                              <MdAdd className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;