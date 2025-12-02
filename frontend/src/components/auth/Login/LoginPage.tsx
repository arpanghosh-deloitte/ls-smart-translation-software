import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useCallback } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

import AuthInfoPanel from "../AuthInfoPanel";
import sharedStyles from "../AuthShared.module.css";


const LoginPage = () => {
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      id: "user-id",
      name: "Test User",
      email: "test@deloitte.com",
    });
  };

  return (
    <Box className={sharedStyles.authWrapper}>
      <AuthInfoPanel variant="login" />

      <Box
        component="form"
        onSubmit={handleSubmit}
        className={sharedStyles.formCard}
        noValidate
      >
        <Typography variant="h5" className={sharedStyles.formTitle}>
          Login
        </Typography>

        <TextField label="Deloitte Email Id" required autoComplete="username" />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePassword}
                  edge="end"
                  // Ensure visibility icon is visible on dark background
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={sharedStyles.submitButton} // Custom margin added via CSS
        >
          LOGIN
        </Button>

        <Typography className={sharedStyles.switchText}>
          New to Smart Translator?
          <Link to="/signup" className={sharedStyles.link}>
            {" "}
            Create an Account
          </Link>
        </Typography>
        <Typography className={sharedStyles.switchText}>
          <Link to="#" className={sharedStyles.link}>
          {" "}
          Forgot Password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
