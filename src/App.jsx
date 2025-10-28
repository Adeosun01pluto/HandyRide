// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Bottombar from './components/Bottombar';
import Home from './pages/Home';
import LogisticsPage from './pages/LogisticsPage';
import ErrandsPage from './pages/ErrandsPage';
import FeedbackPage from './pages/FeedbackPage';
import RestaurantPage from './pages/RestaurantPage';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantOwnerDashboard from './pages/RestaurantOwnerDashboard';
import { SearchProvider } from './SearchContext';
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import OwnerRegister from "./pages/OwnerRegister";
import OwnerLogin from "./pages/OwnerLogin";
import AdminLogin from "./pages/AdminLogin";
import OwnerRoute from './rotues/OwnerRoute';
import OrdersPage from './pages/OrdersPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
              <Route path="/" element={<Home />} />
              <Route path="/foods" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/logistics" element={<LogisticsPage />} />
              <Route path="/errands" element={<ErrandsPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/r/:slug" element={<RestaurantPage />} />
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
              {/* <Route path="/orders" element={<OrdersPage />} /> */}

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
