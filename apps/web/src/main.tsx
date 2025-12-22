import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@jakes-dad/shared";
import "@jakes-dad/shared/fonts.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
          <App />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
