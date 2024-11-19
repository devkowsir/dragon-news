import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuthContext();

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loading loading-ring"></div>
      </div>
    );

  if (!user) return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}${location.hash}`} />;

  return children;
};
