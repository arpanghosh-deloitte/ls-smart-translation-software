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
      className={styles.infoCard}
      style={{
        padding: isSignup ? "48px 40px" : "32px 28px",
        minHeight: isSignup ? "520px" : "360px",
      }}
    >
      {/* Title */}
      <Typography
        variant={isSignup ? "h4" : "h5"}
        sx={{ fontWeight: 700, mb: isSignup ? 3 : 2 }}
      >
        Welcome to the Deloitte Smart Translation Hub
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{ mb: isSignup ? 3 : 2, lineHeight: 1.55 }}
      >
        A central platform where you can efficiently translate and manage
        documents in a controlled Deloitte Environment.
      </Typography>

      {/* Access Note */}
      <Typography
        variant="body1"
        sx={{ mb: isSignup ? 4 : 2, lineHeight: 1.55 }}
      >
        Access to Smart Translation is currently limited to registered Deloitte
        users. To request access or support, please contact the translation
        support team.
      </Typography>

      {/* Help Section */}
      <Box sx={{ mt: isSignup ? 4 : 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Need help?
        </Typography>
        <Link
          href="mailto:test@deloitte.com"
          underline="hover"
          color="inherit"
          variant="body1"
        >
          test@deloitte.com
        </Link>
      </Box>

      {isSignup && (
        <Typography
          variant="body2"
          sx={{
            mt: 5,
            opacity: 0.85,
            maxWidth: 380,
            lineHeight: 1.5,
          }}
        >
          By creating an account, you will gain secure access to the Deloitte
          Smart Translation Hub where you can manage projects, upload documents,
          track processing, and initiate translation workflows.
        </Typography>
      )}
    </Paper>
  );
};

export default AuthInfoPanel;
