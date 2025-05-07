import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import AuthContext
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const ProtectedRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();

  // Wait for authentication state to load
  if (authLoading) {
    return <div>Loading...</div>; // Show a loading indicator while auth state is being determined
  }

  return currentUser ? children : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();

  // Wait for authentication state to load
  if (authLoading) {
    return <div>Loading...</div>; // Show a loading indicator while auth state is being determined
  }

  return !currentUser ? children : <Navigate to="/admin/index" replace />;
};

// App Wrapper to pass currentUser to components
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes for login/registration */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        />

        {/* Protected routes for the dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);