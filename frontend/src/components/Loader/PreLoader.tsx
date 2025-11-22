import { Box, CircularProgress, Typography } from "@mui/material";

const Preloader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F4",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4.2}
        sx={{
          color: "#86BC25",
          mb: 3,
        }}
      />

      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1D1E1C" }}>
        Deloitte Smart Translation Hub
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Preloader;
