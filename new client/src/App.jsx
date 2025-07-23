import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./contexts/AuthContext";
import { UserRole } from "./types";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderRegister from "./pages/ProviderRegister";

// Dashboard Pages
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProvidersManagement from "./pages/Dashboard/ProvidersManagement";
import UsersManagement from "./pages/Dashboard/UsersManagement";
import ProviderDashboard from "./pages/Dashboard/ProviderDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";

// Layouts
import DashboardLayout from "./components/Layout/DashboardLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationsPage from "./pages/Dashboard/NotificationsPage";
import AdminProfilePage from "./pages/Dashboard/AdminProfilePage";

function App() {
  const { user } = useAuth();

  // Helper function to determine the appropriate dashboard based on user role
  const getDashboardForRole = () => {
    if (!user) return <Navigate to="/login" />;

    switch (user.role) {
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.PROVIDER:
        return <ProviderDashboard />;
      case UserRole.USER:
        return <UserDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/provider" element={<ProviderRegister />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Index route - redirects to the appropriate dashboard based on role */}
          <Route index element={getDashboardForRole()} />

          {/* Admin-only routes */}
          <Route
            path="providers"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <ProvidersManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <UsersManagement />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />

        {/* Redirect root to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;