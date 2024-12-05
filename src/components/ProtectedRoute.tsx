import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const { userData, accessToken } = useAuth();

  if (accessToken === null && userData === null) {
    return <div>Loading...</div>; // Prevent premature redirection
  }

  return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
