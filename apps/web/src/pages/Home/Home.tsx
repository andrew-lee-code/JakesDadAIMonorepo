import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Button,
} from "@jakes-dad/shared";
import { Link } from "react-router-dom";
import { useCurrentChampions } from "../../hooks/useCurrentChampions";

const Home = () => {
  const { data: champions, isLoading, error } = useCurrentChampions();
  console.log(champions);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#ffffff" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error || !champions) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#ffffff" }}>
          Error loading champions
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      {/* Welcome Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            fontWeight: 700,
            color: "#ffffff",
            mb: 2,
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            fontFamily: "'Jags', system-ui, sans-serif",
            letterSpacing: "2px",
          }}
        >
          JAKE'S DAD
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            color: "#ffffff",
            opacity: 0.9,
            fontWeight: 300,
          }}
        >
          Fantasy Football League
        </Typography>
      </Box>

      {/* Champions Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Reigning Champion */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              border: "3px solid #DAA520",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Chip
              label="2025 CHAMPION"
              sx={{
                backgroundColor: "#DAA520",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                px: 2,
              }}
            />

            <Avatar
              src={champions.champion?.avatar}
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 120, sm: 150, md: 180 },
                mx: "auto",
                mb: 3,
                border: "4px solid #DAA520",
                boxShadow: "0 4px 16px rgba(218, 165, 32, 0.4)",
              }}
            >
              {champions.champion?.name?.charAt(0)}
            </Avatar>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#155263",
                mb: 1,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              {champions.champion?.name}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontStyle: "italic",
              }}
            >
              Playoff Champion
            </Typography>
          </Paper>
        </Box>

        {/* Reigning Loser */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              border: "3px solid #DC143C",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Chip
              label="2025 ULTIMATE LOSER"
              sx={{
                backgroundColor: "#DC143C",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                px: 2,
              }}
            />

            <Avatar
              src={champions.ultimateLoser?.avatar}
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 120, sm: 150, md: 180 },
                mx: "auto",
                mb: 3,
                border: "4px solid #DC143C",
                boxShadow: "0 4px 16px rgba(220, 20, 60, 0.4)",
              }}
            >
              {champions.ultimateLoser?.name?.charAt(0)}
            </Avatar>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#155263",
                mb: 1,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              {champions.ultimateLoser?.name}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontStyle: "italic",
              }}
            >
              Last Place Finisher
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* League Personality Awards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          maxWidth: "800px",
          mx: "auto",
          mt: 4,
        }}
      >
        {/* League Sweetheart */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 3,
              border: "2px solid #FF69B4",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <Chip
              label="LEAGUE SWEETHEART"
              sx={{
                backgroundColor: "#FF69B4",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.75rem",
                mb: 2,
                px: 1.5,
              }}
            />

            <Avatar
              src="/images/owner_pictures/craig.webp"
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                mx: "auto",
                mb: 2,
                border: "3px solid #FF69B4",
                boxShadow: "0 2px 8px rgba(255, 105, 180, 0.3)",
              }}
            >
              M
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#155263",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              Craig
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              Sxy Bane
            </Typography>
          </Paper>
        </Box>

        {/* Most Bitchy */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 3,
              border: "2px solid #8B4513",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <Chip
              label="MOST BITCHY"
              sx={{
                backgroundColor: "#8B4513",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.75rem",
                mb: 2,
                px: 1.5,
              }}
            />

            <Avatar
              src="/images/owner_pictures/taylor.webp"
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                mx: "auto",
                mb: 2,
                border: "3px solid #8B4513",
                boxShadow: "0 2px 8px rgba(139, 69, 19, 0.3)",
              }}
            >
              C
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#155263",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              Taylor
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              Complains A Lot
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
          maxWidth: "1000px",
          mx: "auto",
          flexWrap: "wrap",
        }}
      >
        <Button
          component={Link}
          to="/hardware-store"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#155263",
            fontWeight: 700,
            fontSize: "1.1rem",
            px: 4,
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            width: { xs: "280px", md: "220px" },
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          🏆 Hardware Store
        </Button>

        <Button
          component={Link}
          to="/members"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#155263",
            fontWeight: 700,
            fontSize: "1.1rem",
            px: 4,
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            width: { xs: "280px", md: "220px" },
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          👥 League Members
        </Button>
        <Button
          component={Link}
          to="/analytics"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#155263",
            fontWeight: 700,
            fontSize: "1.1rem",
            px: 4,
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            width: { xs: "280px", md: "220px" },
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          📊 Analytics
        </Button>
        <Button
          component={Link}
          to="/league-lore"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#155263",
            fontWeight: 700,
            fontSize: "1.1rem",
            px: 4,
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            width: { xs: "280px", md: "220px" },
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          📚 League Lore
        </Button>
        <Button
          component="a"
          href="https://docs.google.com/document/d/1pJQ_SrG_yooaJzuMaXOznfc_lNiDYxmY/edit"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#155263",
            fontWeight: 700,
            fontSize: "1.1rem",
            px: 4,
            py: 2,
            borderRadius: 3,
            textTransform: "none",
            whiteSpace: "nowrap",
            width: { xs: "280px", md: "220px" },
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          📋 By-Laws
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
