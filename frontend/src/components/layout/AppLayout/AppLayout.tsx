import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../../../store/authStore";
import styles from "./AppLayout.module.css";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Box className={styles.root}>
      <Box component="main" className={styles.main}>
        {children}
      </Box>

      {isAuthenticated && (
        <Box component="footer" className={styles.footer}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Deloitte Smart Translator. All rights
            reserved.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AppLayout;
