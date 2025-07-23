import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { UserRole, ProviderStatus } from "../types";
import {
  adminLogin as apiAdminLogin,
  adminLogout as apiAdminLogout,
  addUser as apiAddUser,
  addProvider as apiAddProvider,
  approveOrRejectRequest,
} from "../services/api";
import { adminSocketService } from "../services/socket";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on initial render
  useEffect(() => {
    // Check if user is already authenticated via cookies
    // This would typically be done by checking a /me endpoint
    // For now, we'll assume user needs to login
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiAdminLogin({ email, password });
      if (!response.id || !response.email) {
        throw new Error("Invalid response: missing admin data");
      }
      const userData = {
        id: response.id, // Use response directly
        name: response.email,
        email: response.email,
        role: UserRole.ADMIN,
        createdAt: new Date().toISOString(),
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      adminSocketService.connect(response._id);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      if (userData.role === UserRole.USER) {
        await apiAddUser({
          fullName: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber || "1234567890",
          password: userData.password,
        });
        toast.success("User created successfully!");
      } else {
        throw new Error("Invalid registration type");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register provider function
  const registerProvider = async (providerData) => {
    setIsLoading(true);
    try {
      await apiAddProvider({
        name: providerData.name,
        email: providerData.email,
        password: providerData.password,
        phoneNumber: providerData.phone,
      });
      toast.success("Provider created successfully!");
    } catch (error) {
      console.error("Provider registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Approve provider function
  const approveProvider = async (providerId) => {
    setIsLoading(true);
    try {
      await approveOrRejectRequest({
        requestId: providerId,
        status: "approved",
      });
      toast.success("Provider approved successfully!");
    } catch (error) {
      console.error("Approve provider error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Deny provider function
  const denyProvider = async (providerId) => {
    setIsLoading(true);
    try {
      await approveOrRejectRequest({
        requestId: providerId,
        status: "rejected",
      });
      toast.success("Provider rejected successfully!");
    } catch (error) {
      console.error("Deny provider error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiAdminLogout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      adminSocketService.disconnect();
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout locally even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      adminSocketService.disconnect();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        registerProvider,
        approveProvider,
        denyProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
