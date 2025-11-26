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
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import AuthInfoPanel from "../AuthInfoPanel";
import sharedStyles from "../AuthShared.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Signup Data:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Account created successfully! Please login.");

        navigate("/login");

        resolve(true);
      }, 1000);
    });
  };

  return (
    <Box className={sharedStyles.authWrapper}>
      {/* LEFT PANEL: Variant set to 'signup' for larger content */}
      <AuthInfoPanel variant="signup" />

      {/* RIGHT FORM PANEL */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={sharedStyles.formCard}
        noValidate // Disable default HTML validation
      >
        <Typography variant="h5" className={sharedStyles.formTitle}>
          Create an Account
        </Typography>

        <TextField
          label="Deloitte Email Id"
          type="email"
          required
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />

        {/* Password fields are separated for clarity and proper auto-complete */}
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />

        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as string}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "CREATING..." : "SIGN UP"}
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
