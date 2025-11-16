// src/routes/RiderRoute.jsx (or wherever you keep it)
import React from "react";
import { Navigate } from "react-router-dom";

const RiderRoute = ({ children }) => {
  let rider = null;

  // Safely read + parse rider info from localStorage
  try {
    const stored = localStorage.getItem("currentRider");
    rider = stored ? JSON.parse(stored) : null;
  } catch (e) {
    rider = null;
  }

  // Basic checks – tweak to match your actual rider shape
  const isLoggedIn = !!rider;
  const isRider =
    rider?.role === "rider" || rider?.isRider === true || rider?.type === "rider";

  if (!isLoggedIn || !isRider) {
    // No rider logged in OR user is not a rider → send to rider login
    return <Navigate to="/rider-login" replace />;
  }

  return children;
};

export default RiderRoute;
