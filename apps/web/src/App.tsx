import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";
import HardwareStore from "./pages/HardwareStore/HardwareStore";
import Members from "./pages/Members/Members";
import LeagueLore from "./pages/LeagueLore/LeagueLore";
import Analytics from "./pages/Analytics/Analytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

function App() {
  const queryClient = new QueryClient();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxWidth: "100vw",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <Box
          sx={{ flex: 1, width: "100%", maxWidth: "100vw", overflow: "hidden" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hardware-store" element={<HardwareStore />} />
            <Route path="/members" element={<Members />} />
            <Route path="/league-lore" element={<LeagueLore />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
      </QueryClientProvider>
      <VercelAnalytics />
    </Box>
  );
}

export default App;
