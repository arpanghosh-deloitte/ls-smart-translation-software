import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/layout/AppLayout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout/AuthLayout";
import { useAuthStore } from "./store/authStore";
import PreLoader from "./components/Loader/PreLoader";


const LoginPage = lazy(() => import("./components/auth/Login/LoginPage"));
const SignupPage = lazy(() => import("./components/auth/SignUp/SignUp"));
const Dashboard = lazy(() => import("./components/contents/Dashboard"));

const AuthLayoutLazy = lazy(
  () => import("./components/layout/AuthLayout/AuthLayout")
);


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);



  return (
    //  Wrap Routes in Suspense to show a loader while chunks download
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

  return <AppRoutes />;
}

export default App;
