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

const SignupPage = () => {
  // const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form data validation and submission logic goes here.
    login({
      id: "new-user-id",
      name: "New User",
      email: "new.user@deloitte.com",
    });
  };

  return (
    <Box className={sharedStyles.authWrapper}>
      {/* LEFT PANEL: Variant set to 'signup' for larger content */}
      <AuthInfoPanel variant="signup" />

      {/* RIGHT FORM PANEL */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={sharedStyles.formCard}
        noValidate // Disable default HTML validation
      >
        <Typography variant="h5" className={sharedStyles.formTitle}>
          Create an Account
        </Typography>

        <TextField label="Full Name" autoComplete="name" />
        <TextField label="Deloitte Email" type="email" autoComplete="email" />

        {/* Password fields are separated for clarity and proper auto-complete */}
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
        />

        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePassword}
                  edge="end"
                  // Icon color is styled via global CSS and theme
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
          size="large" 
          fullWidth 
          className={sharedStyles.submitButton}
        >
          SIGN UP
        </Button>

        <Typography className={sharedStyles.switchText}>
          Already have an account?
        
          <Link to="/login" className={sharedStyles.link}>
            {" "}
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
