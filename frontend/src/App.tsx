import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/Login/LoginPage";
import SignupPage from "./components/auth/SignUp/SignUp";
import AppLayout from "./components/layout/AppLayout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
