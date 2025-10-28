// src/routes/OwnerRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthOwner } from "../hooks/useAuthOwner";

export default function OwnerRoute({ children }) {
  const { loading, canAccess, redirectTo, message } = useAuthOwner();

  if (loading) return <div className="p-6">Checking owner access…</div>;
  if (!canAccess) return <Navigate to={redirectTo} replace state={{ message }} />;

  return children;
}
