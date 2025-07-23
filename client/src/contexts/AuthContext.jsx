@@ .. @@
 import React, { createContext, useContext, useState, useEffect } from "react";
+import { useSelector, useDispatch } from "react-redux";
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
+import { loginSuccess, logout as logoutAction } from "../store/slices/authSlice";

 const AuthContext = createContext(undefined);

 export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
     throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
 };

 export const AuthProvider = ({ children }) => {
-  const [user, setUser] = useState(null);
-  const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
+  const dispatch = useDispatch();
+  
+  // Get user state from Redux
+  const { user, isAuthenticated } = useSelector((state) => state.auth);

   // Load user data from localStorage on initial render
   useEffect(() => {
-    // Check if user is already authenticated via cookies
-    // This would typically be done by checking a /me endpoint
-    // For now, we'll assume user needs to login
+    const storedUser = localStorage.getItem("user");
+    if (storedUser) {
+      try {
+        const userData = JSON.parse(storedUser);
+        dispatch(loginSuccess(userData));
+      } catch (error) {
+        console.error("Error parsing stored user data:", error);
+        localStorage.removeItem("user");
+      }
+    }
     setIsLoading(false);
-  }, []);
+  }, [dispatch]);

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
-      setUser(userData);
-      setIsAuthenticated(true);
+      dispatch(loginSuccess(userData));
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

@@ .. @@
   // Logout function
   const logout = async () => {
     try {
       await apiAdminLogout();
-      setUser(null);
-      setIsAuthenticated(false);
+      dispatch(logoutAction());
       localStorage.removeItem("user");
       adminSocketService.disconnect();
       toast.success("Logout successful!");
     } catch (error) {
       console.error("Logout error:", error);
       // Still logout locally even if API call fails
-      setUser(null);
-      setIsAuthenticated(false);
+      dispatch(logoutAction());
       localStorage.removeItem("user");
       adminSocketService.disconnect();
     }
   };