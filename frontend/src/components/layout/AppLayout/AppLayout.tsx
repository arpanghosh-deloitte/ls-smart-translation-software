import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material"; // Removed unused Typography
import { useAuthStore } from "../../../store/authStore";
import styles from "./AppLayout.module.css";
import Footer from "../../theme/Footer";
import Header from "../../theme/Header";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Box className={styles.root}>
      <Header />

      <Box component="main" className={styles.main}>
        <Box sx={{ px: 5, pt: 3, pb: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
            Welcome to the Deloitte Smart Translation Hub
          </Typography>
        </Box>
        <Box className={styles.contentPadding}>{children}</Box>
      </Box>

      {isAuthenticated && <Footer />}
    </Box>
  );
};

export default AppLayout;
