import { Paper, Typography, Link, Box } from "@mui/material";
import styles from "./AuthShared.module.css";

interface Props {
  variant?: "login" | "signup";
}

const AuthInfoPanel = ({ variant = "login" }: Props) => {
  const isSignup = variant === "signup";

  return (
    <Paper
      elevation={0}
      className={`${styles.infoCard} ${
        isSignup ? styles.signupPadding : styles.loginPadding
      }`}
    >
      {/* Title */}
      <Typography variant={isSignup ? "h4" : "h5"} className={styles.heading}>
        Welcome to the Deloitte Smart Translation Hub
      </Typography>

      {/* Description */}
      <Typography variant="body1" className={styles.description}>
        A central platform where you can efficiently translate and manage
        documents in a controlled Deloitte Environment.
      </Typography>

      {/* Access Note */}
      <Typography variant="body1" className={styles.accessNote}>
        Access to Smart Translation is currently limited to registered Deloitte
        users. To request access or support, please contact the translation
        support team.
      </Typography>

      {/* Help Section - Optimized */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, color: "black" }}>
          Mail Id:
        </Typography>
        <Link
          href="mailto:test@deloitte.com"
          underline="hover"
          sx={{ color: "#86BC25", fontWeight: 500 }}
          variant="body1"
        >
          test@deloitte.com
        </Link>
      </Box>

      {/* --- MOBILE ONLY HINT --- */}
      {/* This will only appear on mobile devices due to CSS */}
      <Typography variant="body1" className={styles.mobileScrollHint}>
        Scroll down to Login/SignUp
      </Typography>

      {/* Signup Footer Note */}
      {isSignup && (
        <Typography variant="body2" className={styles.footerNote}>
          **By creating an account, you will gain secure access to the Deloitte
          Smart Translation Hub where you can manage projects, upload documents,
          track processing, and initiate translation workflows.
        </Typography>
      )}
    </Paper>
  );
};

export default AuthInfoPanel;
