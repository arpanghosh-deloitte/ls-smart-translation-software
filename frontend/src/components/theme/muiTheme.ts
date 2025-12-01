import { createTheme, responsiveFontSizes } from "@mui/material";

// Define core colors based on Deloitte branding
const colors = {
  deloitteGreen: "#86BC25", // Primary Color
  darkBackground: "#1D1E1C", // Dark Theme Background
  lightText: "#FFFFFF", // Standard White Text
  darkText: "#1A1A1A", // Standard Dark Text
};

// 1. Initial Theme Creation
let theme = createTheme({
  palette: {
    mode: "dark", // Set default mode to dark since the initial screen is dark/glass
    primary: {
      main: colors.deloitteGreen,
      contrastText: colors.darkText, // Ensures black text on green button
    },
    secondary: {
      main: colors.darkBackground,
      contrastText: colors.lightText,
    },
    background: {
      default: colors.darkBackground,
      paper: "rgba(255, 255, 255, 0.05)", // Subtle dark paper for internal cards/modals
    },
    text: {
      primary: colors.darkText, // Default text is white
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    body1: {
      lineHeight: 1.6,
    },
  },

  // 2. Global Component Overrides (Most Important for Optimization)
  components: {
    // A. TextField (Inputs) Optimization
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Enforce consistent style
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          // Removes the need for margin="normal" in every component
          margin: "12px 0",
        },
      },
    },

    // B. Button Optimization
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Standard for modern sleek UI
      },
      styleOverrides: {
        root: {
          textTransform: "uppercase", // Enforce all caps
          fontWeight: 600,
          borderRadius: 4,
          padding: "10px 24px",
        },
        containedPrimary: {
          // Apply the hover color previously defined in CSS, but here for the Theme
          "&:hover": {
            backgroundColor: "#6E9F1C", // Darker Green on Hover
          },
        },
      },
    },

    // C. Paper Optimization (for the AuthInfoPanel, etc.)
    MuiPaper: {
      styleOverrides: {
        root: {
          // Ensure Paper inherits the dark/glass background style correctly
          backgroundColor: "transparent",
        },
      },
    },

    // D. Link/A Tag Optimization
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.deloitteGreen, // Default link color is brand green
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

// 3. Responsive Typography (Critical for MNC/Enterprise Apps)
// Automatically adjusts font sizes based on viewport width (vw)
theme = responsiveFontSizes(theme);

export default theme;
