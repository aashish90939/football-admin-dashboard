import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("authToken"); // Retrieve token

  // Check if token exists
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

// This component checks for the presence of a token in localStorage.
// If the token is not present, it redirects the user to the login page.
// If the token is present, it renders the child routes using <Outlet />.
// need token validation with backend for production use.
