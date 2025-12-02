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
        background: "linear-gradient(135deg, #1d1e1c 0%, #2e302e 100%)",
        zIndex: 9999,
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

      <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
        Deloitte Smart Translation Hub
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, opacity: 0.7, color: "white" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Preloader;
