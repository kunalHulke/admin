@@ .. @@
 // Response interceptor for error handling
 adminApi.interceptors.response.use(
   (response) => response,
   (error) => {
     console.error('Admin API Error:', error.response || error.message);
-    if (error.response?.data?.error) {
-      if (!error.response.data.error.includes('already logged in')) {
-        toast.error(error.response.data.error);
-      }
-    } else if (error.message) {
-      toast.error('Network error. Please try again.');
-    }
+    // Don't show toast errors here, let components handle them
     return Promise.reject(error);
   }
 );