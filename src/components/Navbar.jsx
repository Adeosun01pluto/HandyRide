// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import {
  MdRestaurantMenu,
  MdFeedback,
  MdChecklist,
  MdDeliveryDining,
} from "react-icons/md";
import handy from "../assets/Handy_logo1.png";
import { useSearch } from "../SearchContext";
import { useCart } from "../context/CartContext";

// 🔥 Firebase auth
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navbarRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const { searchQuery, setSearchQuery } = useSearch();
  const { itemsCount } = useCart(); // still available if you ever want cart again

  // Listen for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/foods", icon: MdRestaurantMenu, label: "Foods" },
    { path: "/ride", icon: MdDeliveryDining, label: "Ride" },
    { path: "/logistics", icon: MdDeliveryDining, label: "Logistics" },
    { path: "/errands", icon: MdChecklist, label: "Errands" },
    { path: "/feedback", icon: MdFeedback, label: "Feedback" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) scrollToTop();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      setOpen(false);
      scrollToTop();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    scrollToTop();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/"); // back to landing
  };

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const userLabel = user?.displayName || user?.email || "User";

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 transition-all"
      >
        <div className="flex items-center justify-between px-2 md:px-16 lg:px-24 xl:px-32 py-3 relative">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            className="text-3xl font-bold text-red-500"
          >
            <img
              className="h-16 w-48 ml-[-10px] object-cover"
              src={handy}
              alt="Handy logo"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 ${
                    active
                      ? "text-red-600 bg-red-50 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-red-600" : "text-gray-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Desktop Search */}
            <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full relative">
              <input
                ref={desktopSearchRef}
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              ) : (
                <FiSearch className="text-red-500" />
              )}
            </div>

            {/* CART BUTTON → navigates to /cart (desktop only) */}
            {!isLanding && (
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-red-400 transition"
                aria-label="Go to cart"
              >
                {/* You can import FiShoppingCart again if you need this */}
                {/* <FiShoppingCart className="w-5 h-5 text-red-600" /> */}
                <span className="hidden md:inline text-sm">Cart</span>
                {itemsCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center text-xs font-semibold bg-red-600 text-white rounded-full w-5 h-5">
                    {itemsCount}
                  </span>
                )}
              </button>
            )}

            {/* Desktop User / Auth */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-red-700 border border-red-100 max-w-[180px]"
                  title={userLabel}
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-semibold">
                    {userInitial}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[10px] leading-none text-gray-500">
                      Logged in as
                    </span>
                    <span className="text-xs font-semibold truncate max-w-[120px]">
                      {userLabel}
                    </span>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-xs md:text-sm font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-2 px-4 py-2 rounded-full border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile: avatar + hamburger (cart removed) */}
          <div className="sm:hidden flex items-center gap-3">
            {/* 👤 Mobile profile avatar / login pill */}
            {user ? (
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white text-sm font-semibold"
                title={userLabel}
              >
                {userInitial}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 rounded-full border border-red-500 text-red-600 text-xs font-semibold hover:bg-red-50 transition"
              >
                Login
              </button>
            )}

            {/* ❌ Mobile cart commented out */}
            {/*
            {!isLanding && (
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-lg border border-gray-300 hover:border-red-400"
                aria-label="Go to cart"
              >
                <FiShoppingCart className="w-6 h-6 text-red-600" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[10px] font-semibold bg-red-600 text-white rounded-full w-4 h-4">
                    {itemsCount}
                  </span>
                )}
              </button>
            )}
            */}

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? (
                <FiX className="w-6 h-6 text-red-600" />
              ) : (
                <FiMenu className="w-6 h-6 text-red-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="sm:hidden bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full py-3 px-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "text-red-600 bg-red-50 font-semibold"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-red-600" : "text-gray-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Search */}
            <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-full mt-2 relative">
              <input
                ref={mobileSearchRef}
                className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              ) : (
                <FiSearch className="text-red-500" />
              )}
            </div>

            {/* Mobile user / auth section */}
            {user ? (
              <div className="mt-4 w-full bg-red-50 border border-red-100 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-semibold">
                    {userInitial}
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="text-gray-500">Logged in</span>
                    <span className="font-semibold truncate max-w-[140px]">
                      {userLabel}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="mt-3 w-full py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[70px] sm:h-[80px]" />
    </>
  );
};

export default Navbar;
