// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiSearch, FiX, FiShoppingCart } from "react-icons/fi";
import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining } from "react-icons/md";
import handy from "../assets/Handy_logo1.png";
import { useSearch } from "../SearchContext";
import { useCart } from "../context/CartContext"; // ensure this path matches your project

const Navbar = () => {
  const navbarRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  const { itemsCount } = useCart();

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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/foods", icon: MdRestaurantMenu, label: "Foods" },
    { path: "/logistics", icon: MdDeliveryDining, label: "Logistics" },
    { path: "/errands", icon: MdChecklist, label: "Errands" },
    { path: "/feedback", icon: MdFeedback, label: "Feedback" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path) => {
    if (path === "/foods") return location.pathname === "/" || location.pathname === "/foods";
    return location.pathname === path;
  };

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

  return (
    <>
      <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 transition-all">
        <div className="flex items-center justify-between px-2 md:px-16 lg:px-24 xl:px-32 py-3 relative">
          {/* Logo */}
          <button onClick={() => handleNavigation("/foods")} className="text-3xl font-bold text-red-500">
            <img className="h-16 w-48 ml-[-10px] object-cover" src={handy} alt="Handy logo" />
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
                    active ? "text-red-600 bg-red-50 font-semibold" : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-red-600" : "text-gray-500"}`} />
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
                <button onClick={clearSearch} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FiX className="w-4 h-4" />
                </button>
              ) : (
                <FiSearch className="text-red-500" />
              )}
            </div>

            {/* CART BUTTON → navigates to /cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-red-400 transition"
              aria-label="Go to cart"
            >
              <FiShoppingCart className="w-5 h-5 text-red-600" />
              <span className="hidden md:inline text-sm">Cart</span>
              {itemsCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center text-xs font-semibold bg-red-600 text-white rounded-full w-5 h-5">
                  {itemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Menu toggles */}
          <div className="sm:hidden flex items-center gap-2">
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
            <button onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <FiX className="w-6 h-6 text-red-600" /> : <FiMenu className="w-6 h-6 text-red-600" />}
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
                    active ? "text-red-600 bg-red-50 font-semibold" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-red-600" : "text-gray-500"}`} />
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
                <button onClick={clearSearch} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FiX className="w-4 h-4" />
                </button>
              ) : (
                <FiSearch className="text-red-500" />
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[70px] sm:h-[80px]" />
    </>
  );
};

export default Navbar;


