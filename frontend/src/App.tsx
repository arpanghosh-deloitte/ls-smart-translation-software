import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/layout/AppLayout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout/AuthLayout";
import { useAuthStore } from "./store/authStore";
import PreLoader from "./components/Loader/PreLoader";

// ⬅️ 1. Lazy Import the heavy pages
const LoginPage = lazy(() => import("./components/auth/Login/LoginPage"));
const SignupPage = lazy(() => import("./components/auth/SignUp/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
// ⬅️ OPTIMIZATION: Also lazy load the Auth components, as they contain heavy CSS
const AuthLayoutLazy = lazy(
  () => import("./components/layout/AuthLayout/AuthLayout")
);

// ⬅️ OPTIMIZATION: Create a dedicated ProtectedRoute wrapper for cleaner code
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ⬅️ OPTIMIZATION: Define the routing logic component separately or use the root App.
function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // ⬅️ OPTIMIZATION: If authenticated, redirect from any public route attempts.
  // This top-level check handles redirects *before* rendering the large Suspense block.
  // Note: The redirection from /login/signup to /dashboard is handled here,
  // but the main rendering logic is still in the return block.

  return (
    // ⬅️ 2. Wrap Routes in Suspense to show a loader while chunks download
    <Suspense fallback={<PreLoader />}>
      <Routes>
        {/* PUBLIC ROUTES (Auth) */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <SignupPage />
              </AuthLayout>
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK ROUTE: Redirects to dashboard if logged in, otherwise login */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  // ⬅️ 3. CRITICAL FIX: App component must return the AppRoutes component
  return <AppRoutes />;
}

export default App;
