import { Routes, Route, Link } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@jakes-dad/shared";

// Import screens here as they are created
import { HomeRedesign } from "./screens/HomeRedesign";
import { HardwareStoreRedesign } from "./screens/HardwareStoreRedesign";

const MockupIndex = () => {
  // List of available mockups - add new mockups here
  const mockups: Array<{ name: string; path: string; description: string }> = [
    {
      name: "Home Screen Redesign",
      path: "/home-redesign",
      description: "Redesigned home screen with more personality and less 'AI slop'",
    },
    {
      name: "Hardware Store Redesign",
      path: "/hardware-store-redesign",
      description: "Enhanced UX for the Hardware Hall of Fame with trophy vibes",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
        py: 6,
        px: 4,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            mb: 2,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          UX Mockups
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 6,
            textAlign: "center",
          }}
        >
          Interactive mockups for Jake's Dad fantasy football features
        </Typography>

        {mockups.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" sx={{ color: "#155263", mb: 2 }}>
              No mockups yet
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Create mockups in <code>src/screens/</code> and register them in{" "}
              <code>App.tsx</code>
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {mockups.map((mockup) => (
              <Paper
                key={mockup.path}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#155263", fontWeight: 600 }}
                  >
                    {mockup.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {mockup.description}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  to={mockup.path}
                  variant="contained"
                  sx={{
                    backgroundColor: "#155263",
                    "&:hover": { backgroundColor: "#0d3d4a" },
                  }}
                >
                  View
                </Button>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MockupIndex />} />
      <Route path="/home-redesign" element={<HomeRedesign />} />
      <Route path="/hardware-store-redesign" element={<HardwareStoreRedesign />} />
    </Routes>
  );
};

export default App;