import styles from "./Header.module.css";
import React from "react";
import { Button, Box } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        Deloitte
        <span
          className={styles.dot}
          role="status"
          aria-label="System status indicator"
        ></span>
      </h1>

      <h1 className={styles.logo}>
        <span className={styles.appName}>Smart Translator App</span>
      </h1>
      {isAuthenticated && (
        <Box sx={{ marginLeft: "auto" }}>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleLogout}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": { borderColor: "#86BC25", color: "#86BC25" },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </header>
  );
};

export default Header;
