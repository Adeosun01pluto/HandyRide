// src/pages/RestaurantPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRestaurantBySlug } from "../hooks/useRestaurantBySlug";
import { useCart } from "../context/CartContext";
import {
  MdLocationOn,
  MdAccessTime,
  MdDeliveryDining,
  MdArrowBack,
  MdShoppingCart,
  MdAdd,
  MdRemove,
} from "react-icons/md";

const RestaurantPage = () => {
  const { slug } = useParams();
  const { restaurant, menu, loading } = useRestaurantBySlug(slug);
  const { addToCart, updateQuantity, cart } = useCart();

  // tracks which item we already "added" (for UI state)
  const [addedItems, setAddedItems] = useState({});
  // 🧿 active category tab: "All" or a category name
  const [activeCategory, setActiveCategory] = useState("All");

  const getItemQuantity = (itemId) => {
    const cartItem = cart?.find((item) => item.id === itemId);
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
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
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
      setAddedItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">
            Loading restaurant...
          </p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Restaurant Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the restaurant you're looking for.
          </p>
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

  // 🖼️ Restaurant banner image – with fallback
  const restaurantImage =
    restaurant.coverImage ||
    restaurant.image ||
    restaurant.photoUrl ||
    "https://via.placeholder.com/1200x600?text=Restaurant+Image";

  // 🧩 Group menu items by category; items without category go into "Others"
  const buildGroupedMenu = (menuArray) => {
    const groups = {};

    (menuArray || []).forEach((item) => {
      const rawCat =
        item.category ||
        item.categoryName ||
        item.categoryId ||
        item.categoryLabel ||
        "";
      const catName = String(rawCat || "").trim();
      const key = catName || "Others"; // fallback category

      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    let keys = Object.keys(groups);
    // Put "Others" last if it exists
    keys.sort((a, b) => {
      if (a === "Others") return 1;
      if (b === "Others") return -1;
      return a.localeCompare(b);
    });

    return { groupedMenu: groups, categoryKeys: keys };
  };

  const { groupedMenu, categoryKeys } = buildGroupedMenu(menu);

  // Tabs: All + categories
  const tabs = ["All", ...categoryKeys];

  // Which categories to render for current tab
  const categoriesToRender =
    activeCategory === "All"
      ? categoryKeys
      : categoryKeys.filter((c) => c === activeCategory);

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

          {/* Restaurant Header Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 md:mb-12">
            {/* TOP: Restaurant Image Banner */}
            <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
              <img
                src={restaurantImage}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 md:left-8 right-4">
                <div className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 mb-2">
                  <span className="text-xs font-semibold text-white/80">
                    Now Available on Handy
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  {restaurant.name}
                </h1>
              </div>
            </div>

            {/* BOTTOM: Gradient Info Section */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 md:p-10">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {restaurant.location && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdLocationOn className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">
                          Location
                        </p>
                        <p className="text-white font-semibold">
                          {restaurant.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {restaurant.operatingHours && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdAccessTime className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">
                          Hours
                        </p>
                        <p className="text-white font-semibold">
                          {restaurant.operatingHours}
                        </p>
                      </div>
                    </div>
                  )}

                  {restaurant.deliveryAmount && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MdDeliveryDining className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">
                          Delivery From
                        </p>
                        <p className="text-white font-semibold">
                          {restaurant.deliveryAmount}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Menu
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                <span className="text-gray-500 font-medium whitespace-nowrap">
                  {menu.length} items
                </span>
              </div>

              {/* 🗂 Category Tabs */}
              {tabs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {tabs.map((tab) => {
                    const isActive = activeCategory === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveCategory(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
                          isActive
                            ? "bg-red-600 text-white border-red-600 shadow-md"
                            : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                        }`}
                      >
                        {tab === "All" ? "All Items" : tab}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Categories Content */}
            {categoriesToRender.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No menu items available.
              </div>
            ) : (
              categoriesToRender.map((categoryName) => {
                const items = groupedMenu[categoryName] || [];
                if (!items.length) return null;

                return (
                  <div key={categoryName} className="mb-10">
                    {/* Category Header (hidden when viewing All? Optional) */}
                    {activeCategory === "All" && (
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                          {categoryName}
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 bg-red-50 text-red-600 rounded-full">
                          {items.length} item{items.length > 1 ? "s" : ""}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                      </div>
                    )}

                    {/* Category Grid – 2 items per row on small screens */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                      {items.map((m, idx) => {
                        const quantity = getItemQuantity(m.id);
                        const isInCart = quantity > 0;

                        return (
                          <div
                            key={m.id}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            {/* Item Image */}
                            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              <img
                                src={
                                  m.image ||
                                  "https://via.placeholder.com/600x400?text=No+Image"
                                }
                                alt={m.name}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                                {m.name}
                              </h4>

                              {m.description && (
                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                                  {m.description}
                                </p>
                              )}

                              {/* Price and Add Button */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div>
                                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mb-1">
                                    Price
                                  </p>
                                  <span className="text-lg sm:text-xl font-black text-gray-900">
                                    ₦{Number(m.price || 0).toLocaleString()}
                                  </span>
                                </div>

                                {!isInCart ? (
                                  <button
                                    onClick={() => handleAddToCart(m)}
                                    className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                                  >
                                    <MdShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Add</span>
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-1 sm:gap-2 bg-red-600 rounded-full shadow-lg">
                                    <button
                                      onClick={() => handleDecrement(m.id)}
                                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white hover:bg-red-700 rounded-full transition-colors duration-300"
                                    >
                                      <MdRemove className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <span className="w-7 sm:w-8 text-center text-white font-bold text-xs sm:text-sm">
                                      {quantity}
                                    </span>
                                    <button
                                      onClick={() => handleIncrement(m.id)}
                                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white hover:bg-red-700 rounded-full transition-colors duration-300"
                                    >
                                      <MdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
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
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
