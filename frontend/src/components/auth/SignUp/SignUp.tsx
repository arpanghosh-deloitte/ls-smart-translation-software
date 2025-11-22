import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

import AuthInfoPanel from "../AuthInfoPanel";
import sharedStyles from "../AuthShared.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      id: "new-user-id",
      name: "New User",
      email: "new.user@deloitte.com",
    });
  };

  return (
    <Box className={sharedStyles.authWrapper}>
      <AuthInfoPanel variant="signup" />

      <Box
        component="form"
        onSubmit={handleSubmit}
        className={sharedStyles.formCard}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Create an Account
        </Typography>

        <TextField fullWidth margin="normal" label="Full Name" />
        <TextField
          fullWidth
          margin="normal"
          label="Deloitte Email"
          type="email"
        />
        <TextField fullWidth margin="normal" label="Username" />

        <TextField fullWidth label="Password" margin="normal" type="password" />

        <TextField
          fullWidth
          label="Confirm Password"
          margin="normal"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((p) => !p)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            backgroundColor: "#86BC25",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#6E9F1C" },
          }}
        >
          SIGN UP
        </Button>

        <Typography className={sharedStyles.switchText}>
          Already have an account?
          <span
            className={sharedStyles.link}
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
