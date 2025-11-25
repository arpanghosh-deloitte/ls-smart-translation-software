import type { ReactNode } from "react";
import { Box, Typography} from "@mui/material";
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
       <Typography  className={styles.heading}>
        Welcome to the Deloitte Smart Translation Hub
      </Typography>
        {children}
      </Box>

      {isAuthenticated && (
        <Footer />
      )}
    </Box>
  );
};

export default AppLayout;
