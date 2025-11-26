import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/layout/AppLayout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout/AuthLayout";
import { useAuthStore } from "./store/authStore";
import PreLoader from "./components/Loader/PreLoader";

async function minDelay<T>(
  promise: Promise<T>,
  minDuration: number
): Promise<T> {
  const [moduleExports] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, minDuration)),
  ]);

  return moduleExports;
}

const LoginPage = lazy(() =>
  minDelay(import("./components/auth/Login/LoginPage"), 1000)
);
const SignupPage = lazy(() =>
  minDelay(import("./components/auth/SignUp/SignUp"), 1000)
);
const Dashboard = lazy(() =>
  minDelay(import("./components/pages/Dashboard"), 3000)
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignupPage />
              )
            }
          />
        </Route>

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
