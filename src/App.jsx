// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Bottombar from "./components/Bottombar";
import Home from "./pages/Home";
import LogisticsPage from "./pages/LogisticsPage";
import ErrandsPage from "./pages/ErrandsPage";
import FeedbackPage from "./pages/FeedbackPage";
import RestaurantPage from "./pages/RestaurantPage";
import AdminDashboard from "./pages/AdminDashboard";
import RestaurantOwnerDashboard from "./pages/RestaurantOwnerDashboard";
import { SearchProvider } from "./SearchContext";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import OwnerRegister from "./pages/OwnerRegister";
import OwnerLogin from "./pages/OwnerLogin";
import AdminLogin from "./pages/AdminLogin";
import OwnerRoute from "./rotues/OwnerRoute";
import RiderRoute from "./routes/RiderRoute";
import OrdersPage from "./pages/OrdersPage";
import RidePage from "./pages/RidePage";
import RideStatusPage from "./pages/RideStatusPage";
import RiderOrdersPage from "./pages/RiderOrdersPage";
import RiderLogin from "./pages/RiderLogin";
import RiderRegister from "./pages/RiderRegister";
import RiderDashboard from "./pages/RiderDashboard";
import RiderVehicleRegister from "./pages/RiderVehicleRegister";

// NEW imports
import LandingPage from "./pages/LandingPage";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerRoute from "./routes/CustomerRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <ScrollToTop />
            <Navbar />

            <Routes>
              {/* Public landing & auth */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<CustomerLogin />} />
              <Route path="/register" element={<CustomerRegister />} />

              {/* Customer-protected app pages */}
              <Route
                path="/foods"
                element={
                  <CustomerRoute>
                    <Home />
                  </CustomerRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <CustomerRoute>
                    <CartPage />
                  </CustomerRoute>
                }
              />
              <Route
                path="/logistics"
                element={
                  <CustomerRoute>
                    <LogisticsPage />
                  </CustomerRoute>
                }
              />
              <Route
                path="/errands"
                element={
                  <CustomerRoute>
                    <ErrandsPage />
                  </CustomerRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <CustomerRoute>
                    <FeedbackPage />
                  </CustomerRoute>
                }
              />
              <Route
                path="/r/:slug"
                element={
                  <CustomerRoute>
                    <RestaurantPage />
                  </CustomerRoute>
                }
              />

              {/* Ride flow – protected for customers */}
              <Route
                path="/ride"
                element={
                  <CustomerRoute>
                    <RidePage />
                  </CustomerRoute>
                }
              />
              <Route
                path="/ride-status/:orderId"
                element={
                  <CustomerRoute>
                    <RideStatusPage />
                  </CustomerRoute>
                }
              />

              {/* Admin / Owner / Rider routes (keep their own auth logic) */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/owner"
                element={
                  <OwnerRoute>
                    <RestaurantOwnerDashboard />
                  </OwnerRoute>
                }
              />
              <Route path="/owner-register" element={<OwnerRegister />} />
              <Route path="/owner-login" element={<OwnerLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              <Route path="/ride-orders" element={<OrdersPage />} />

              <Route
                path="/rider-orders"
                element={
                  <RiderRoute>
                    <RiderOrdersPage />
                  </RiderRoute>
                }
              />
              <Route path="/rider-login" element={<RiderLogin />} />
              <Route path="/rider-register" element={<RiderRegister />} />
              <Route
                path="/rider-dashboard"
                element={
                  <RiderRoute>
                    <RiderDashboard />
                  </RiderRoute>
                }
              />
            </Routes>

            <Footer />
            <Bottombar />
          </div>
          <Analytics />
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
