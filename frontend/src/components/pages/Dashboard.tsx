import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../../store/authStore"; // Adjust path if needed

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      {/* Debug Title */}
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Dashboard Loaded Successfully ✅
      </Typography>

      {/* User Info Debug */}
      <Typography variant="body1" sx={{ mt: 2, mb: 4, color: "text.primary" }}>
        Welcome back, <strong>{user?.name || "User"}</strong>!
        <br />
        (Email: {user?.email || "No email found"})
      </Typography>

      {/* Visual Divider for Layout Check */}
      <Box
        sx={{
          border: "2px dashed #ccc",
          p: 5,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.primary">
          Main Content Area
        </Typography>
        <Typography variant="body2">
          The Header should be visible above.
          <br />
          The Footer should be visible below.
          <br />
          This box handles the scrollable content.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
