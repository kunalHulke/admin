@@ .. @@
 import React, { useState } from "react";
 import { useNavigate, Link } from "react-router-dom";
+import { useDispatch } from "react-redux";
 import { useAuth } from "../../contexts/AuthContext";
+import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
+import { adminLogin } from "../../services/api";
+import { UserRole } from "../../types";

 const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

-  const { login } = useAuth();
+  const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
     setIsSubmitting(true);
+    dispatch(loginStart());
+    
     try {
-      await login(email, password);
-      navigate("/dashboard");
+      const response = await adminLogin({ email, password });
+      
+      // Check if status is 200 (success)
+      if (response && response.id) {
+        const userData = {
+          id: response.id,
+          name: response.email,
+          email: response.email,
+          role: UserRole.ADMIN,
+          createdAt: new Date().toISOString(),
+        };
+        
+        // Set user in Redux store
+        dispatch(loginSuccess(userData));
+        
+        // Store in localStorage for persistence
+        localStorage.setItem("user", JSON.stringify(userData));
+        
+        // Navigate to admin dashboard
+        navigate("/dashboard");
+      } else {
+        // If response doesn't have proper structure, stay on login
+        setError("Invalid login response. Please try again.");
+        dispatch(loginFailure("Invalid login response"));
+        navigate("/login");
+      }
     } catch (err) {
-      setError(
-        err.message || "Failed to login. Please check your credentials."
-      );
+      const errorMessage = err.response?.data?.error || err.message || "Failed to login. Please check your credentials.";
+      setError(errorMessage);
+      dispatch(loginFailure(errorMessage));
+      // Stay on login page on error
+      navigate("/login");
     } finally {
       setIsSubmitting(false);
     }
   };