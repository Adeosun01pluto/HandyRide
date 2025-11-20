// src/components/Explore.jsx
import React, { useEffect, useMemo, useState } from "react";
import { MdDeliveryDining, MdLocationOn, MdRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { useRestaurants } from "../hooks/useRestaurants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const Explore = () => {
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { searchQuery } = useSearch();
  const { restaurants, loading } = useRestaurants();
  const [user, setUser] = useState(null);

  // NEW: tab state → "all" | "unilorin" | "smallBiz"
  const [activeTab, setActiveTab] = useState("all");

  // 🎬 Animated text slideshow options
  const slideshowTexts = [
    "🍕 Pizza, Burgers & More...",
    "🍛 Jollof Rice Special",
    "🍗 Fried Chicken & Grills",
    "🍜 Noodles & Pasta",
    "🥗 Fresh Salads",
    "🍰 Desserts & Drinks",
    "🌮 Shawarma & Wraps",
    "🍲 Local Delicacies",
  ];

  const filteredRestaurants = useMemo(() => {
    const list = restaurants || [];
    if (!searchQuery?.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.cuisine?.toLowerCase().includes(q) ||
        r.location?.toLowerCase().includes(q)
    );
  }, [restaurants, searchQuery]);

  // 🔹 Apply tab filter on top of search filter
  const tabFilteredRestaurants = useMemo(() => {
    const list = filteredRestaurants || [];
    const norm = (v) => (v || "").toLowerCase();

    if (activeTab === "unilorin") {
      return list.filter((r) =>
        norm(r.location).includes("unilorin campus")
      );
    }

    if (activeTab === "smallBiz") {
      return list.filter((r) => norm(r.location).includes("small biz"));
    }

    // "all"
    return list;
  }, [filteredRestaurants, activeTab]);

  // Listen for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // 🔹 Derive greeting name: first name from displayName, else email local-part
  const greetingName = (() => {
    if (!user) return "";
    if (user.displayName && user.displayName.trim().length > 0) {
      return user.displayName.trim().split(" ")[0];
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return "";
  })();

  return (
    <section className="animate-fadeIn min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      {/* Header with enhanced design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-orange-500">
        <div className="relative px-4 md:px-10 lg:px-20 py-8 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* 🔥 Personalized heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-4 tracking-tight">
              {greetingName ? (
                <>
                  Welcome, <span className="capitalize">{greetingName}{" "} 🙌</span>
                </>
              ) : (
                "Welcome 🙌"
              )}
            </h1>
            <h1 className="text-xl md:text-3xl font-medium text-white mb-3 sm:mb-4 tracking-tight">
              Wetin you wan chop today? Pick a Restaurant we go deliver am
            </h1>

            {/* 🎬 Animated Text Slideshow - Horizontal Loop */}
            <div className="relative h-8 sm:h-10 md:h-12 overflow-hidden">
              <div className="flex animate-scroll-left whitespace-nowrap">
                {[...slideshowTexts, ...slideshowTexts, ...slideshowTexts].map(
                  (text, index) => (
                    <p
                      key={index}
                      className="text-base sm:text-lg md:text-2xl font-bold text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 inline-block mx-3"
                    >
                      {text}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-gray-900">
              {searchQuery ? (
                <>
                  Results for{" "}
                  <span className="text-red-600">"{searchQuery}"</span>
                </>
              ) : (
                "All Restaurants"
              )}
            </h2>

            {/* 🔹 Tabs for All / Unilorin Campus / Small Biz */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Restaurants" },
                { id: "unilorin", label: "Unilorin Campus" },
                { id: "smallBiz", label: "Small Biz" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                      isActive
                        ? "bg-red-600 text-white border-red-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {searchQuery && (
              <div className="mt-3 inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                {tabFilteredRestaurants.length} restaurant
                {tabFilteredRestaurants.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading delicious options...
              </p>
            </div>
          ) : tabFilteredRestaurants.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdRestaurant className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No restaurants found
              </h3>
              <p className="text-gray-500 text-lg">
                Try searching with different keywords or switch tabs
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {tabFilteredRestaurants.map((r, idx) => (
                <Link
                  key={r.id}
                  to={`/r/${r.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Image Container */}
                  <div className="relative h-32 md:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={r.image || fallbackImage}
                      alt={r.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover overlay badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-xs font-bold text-red-600">
                        View Menu
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                      {r.name}
                    </h3>

                    {/* Location */}
                    {r.location && (
                      <div className="flex items-center gap-2 text-gray-600 mb-1 md:mb-2">
                        <div className="w-5 h-5 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors duration-300">
                          <MdLocationOn className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                        </div>
                        <span className="text-[12px] md:text-sm font-medium">
                          {r.location}
                        </span>
                      </div>
                    )}

                    {/* Delivery Info */}
                    {r.deliveryAmount && (
                      <div className="flex items-center gap-2 pt-1 md:pt-3 border-t border-gray-100">
                        <div className="w-5 h-5 md:w-8 md:h-8 bg-red-50 rounded-lg flex items-center justify-center">
                          <MdDeliveryDining className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[12px] md:text-sm">
                          <span className="text-gray-500 font-light">
                            Delivery from
                          </span>
                          <span className="font-bold text-red-600">
                            {r.deliveryAmount}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section - Enhanced */}
          <div className="mt-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MdRestaurant className="w-10 h-10 text:white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Can&apos;t Find Your Favorite?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                No worries! We can deliver from any restaurant in Ilorin
              </p>

              <a
                href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20order%20from%20a%20restaurant%20not%20listed.%20Restaurant%20name:%20[Please%20specify]%20-%20Food%20items:%20[Please%20specify]%20-%20Delivery%20address:%20[Please%20specify]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-red-600 font-bold text-sm  md:text-lg py-4 px-8 rounded-full hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span>Order from Any Restaurant</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <p className="text-white/80 text-sm mt-6 max-w-md mx-auto">
                Simply tell us the restaurant name and what you&apos;d like to
                order
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideInDown {
          animation: slideInDown 0.7s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out 0.3s both;
        }
        .animate-fadeInUp {
          opacity: 0;
        }
        .animate-scroll-left {
          animation: scrollLeft 10s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Explore;




































