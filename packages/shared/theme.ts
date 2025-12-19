import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#155263", // Dark teal
      light: "#1e758d", // Medium teal
      dark: "#0c2f39", // Darkest teal
    },
    secondary: {
      main: "#2798b7", // Bright blue
      light: "#1e758d", // Medium teal
      dark: "#155263", // Dark teal
    },
    background: {
      default: "#ffffff", // White
      paper: "#e6e6e6", // Light gray
    },
    text: {
      primary: "#0c2f39", // Darkest teal for primary text
      secondary: "#155263", // Dark teal for secondary text
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#0c2f39",
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#155263",
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#155263",
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#1e758d",
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#1e758d",
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Jags", "Inter", sans-serif',
      color: "#155263",
      fontWeight: 400,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      letterSpacing: "0.03em",
    },
    button: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 500,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
});
