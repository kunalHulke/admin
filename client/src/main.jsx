@@ .. @@
 import { StrictMode } from 'react';
 import { createRoot } from 'react-dom/client';
 import { BrowserRouter } from 'react-router-dom';
+import { Provider } from 'react-redux';
+import { store } from './store';
 import App from './App';
 import { AuthProvider } from './contexts/AuthContext';
 import './index.css';

 createRoot(document.getElementById('root')).render(
   <StrictMode>
-    <BrowserRouter>
-      <AuthProvider>
-        <App />
-      </AuthProvider>
-    </BrowserRouter>
+    <Provider store={store}>
+      <BrowserRouter>
+        <AuthProvider>
+          <App />
+        </AuthProvider>
+      </BrowserRouter>
+    </Provider>
   </StrictMode>
 );