import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  EmojiEventsIcon,
  PeopleIcon,
  AnalyticsIcon,
  AutoStoriesIcon,
  DescriptionIcon,
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
          background:
            "linear-gradient(135deg, #003f4c 0%, #155263 50%, #2798b7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              border: "4px solid #DAA520",
              borderRadius: "50%",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
              mx: "auto",
              mb: 3,
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: 300 }}>
            Loading the champions...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !champions) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #003f4c 0%, #155263 50%, #2798b7 100%)",
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
        background:
          "linear-gradient(135deg, #003f4c 0%, #155263 50%, #2798b7 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.03) 35px,
            rgba(255, 255, 255, 0.03) 70px
          )`,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              display: "inline-block",
              mb: 3,
              position: "relative",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem", lg: "7rem" },
                fontWeight: 900,
                background:
                  "linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Jags', system-ui, sans-serif",
                letterSpacing: { xs: "2px", md: "6px" },
                position: "relative",
                filter: "drop-shadow(0 8px 24px rgba(218, 165, 32, 0.5))",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: { xs: -6, md: -12 },
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: { xs: 3, md: 5 },
                  background:
                    "linear-gradient(90deg, transparent, #DAA520, transparent)",
                  borderRadius: 4,
                },
              }}
            >
              JAKE'S DAD
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: { xs: "2px", md: "4px" },
              textTransform: "uppercase",
              opacity: 0.9,
              mb: 2,
            }}
          >
            Fantasy Football League
          </Typography>
        </Box>

        {/* Main Champions Showcase */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            gap: { xs: 3, md: 4 },
            maxWidth: 1400,
            mx: "auto",
            mb: { xs: 4, md: 6 },
          }}
        >
          {/* Champion - Larger, Left/Top */}
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, sm: 5, md: 6 },
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                borderRadius: { xs: 4, md: 6 },
                border: "4px solid #DAA520",
                boxShadow:
                  "0 20px 60px rgba(218, 165, 32, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background:
                    "linear-gradient(90deg, #FFD700, #DAA520, #FFD700)",
                },
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 70px rgba(218, 165, 32, 0.4)",
                },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 4,
                  px: 3,
                  py: 1.5,
                  backgroundColor: "#DAA520",
                  borderRadius: 50,
                  boxShadow: "0 4px 12px rgba(218, 165, 32, 0.3)",
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    letterSpacing: "1.5px",
                  }}
                >
                  2025 CHAMPION
                </Typography>
              </Box>

              <Avatar
                src={champions.champion?.avatar}
                sx={{
                  width: { xs: 140, sm: 180, md: 220 },
                  height: { xs: 140, sm: 180, md: 220 },
                  mx: "auto",
                  mb: 4,
                  border: "5px solid #DAA520",
                  boxShadow:
                    "0 8px 32px rgba(218, 165, 32, 0.4), inset 0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {champions.champion?.name?.charAt(0)}
              </Avatar>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 1,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  letterSpacing: "1px",
                }}
              >
                {champions.champion?.name}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                Playoff Champion
              </Typography>
            </Paper>
          </Box>

          {/* Ultimate Loser - Smaller, Right/Bottom */}
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                borderRadius: { xs: 4, md: 5 },
                border: "4px solid #DC143C",
                boxShadow: "0 16px 48px rgba(220, 20, 60, 0.25)",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background:
                    "linear-gradient(90deg, #DC143C, #8B0000, #DC143C)",
                },
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 56px rgba(220, 20, 60, 0.35)",
                },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                  px: 2.5,
                  py: 1,
                  backgroundColor: "#DC143C",
                  borderRadius: 50,
                  boxShadow: "0 4px 12px rgba(220, 20, 60, 0.3)",
                  mx: "auto",
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    letterSpacing: "1px",
                  }}
                >
                  ULTIMATE LOSER
                </Typography>
              </Box>

              <Avatar
                src={champions.ultimateLoser?.avatar}
                sx={{
                  width: { xs: 100, sm: 120, md: 140 },
                  height: { xs: 100, sm: 120, md: 140 },
                  mx: "auto",
                  mb: 3,
                  border: "4px solid #DC143C",
                  boxShadow: "0 6px 24px rgba(220, 20, 60, 0.3)",
                  filter: "grayscale(20%)",
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
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                }}
              >
                {champions.ultimateLoser?.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontStyle: "italic",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Toilet Bowl Loser
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* League Personality Awards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2.5, sm: 3 },
            maxWidth: 900,
            mx: "auto",
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* League Sweetheart */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 3,
              border: "2px solid #DAA520",
              boxShadow: "0 8px 24px rgba(255, 105, 180, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(255, 105, 180, 0.3)",
              },
            }}
          >
            <Chip
              label="LEAGUE SWEETHEART"
              sx={{
                backgroundColor: "#DAA520",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.75rem",
                mb: 2,
                px: 2,
                boxShadow: "0 2px 8px rgba(255, 105, 180, 0.3)",
              }}
            />

            <Avatar
              src="/images/owner_pictures/paul.webp"
              sx={{
                width: { xs: 70, sm: 90 },
                height: { xs: 70, sm: 90 },
                mx: "auto",
                mb: 2,
                border: "3px solid #DAA520",
                boxShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
              }}
            >
              P
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#155263",
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                mb: 0.5,
              }}
            >
              Paul
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              Revived Punishments
            </Typography>
          </Paper>

          {/* League Villain */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 3,
              border: "2px solid #DC143C",
              boxShadow: "0 8px 24px rgba(139, 69, 19, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(139, 69, 19, 0.3)",
              },
            }}
          >
            <Chip
              label="LEAGUE VILLAIN"
              sx={{
                backgroundColor: "#DC143C",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.75rem",
                mb: 2,
                px: 2,
                boxShadow: "0 2px 8px rgba(139, 69, 19, 0.3)",
              }}
            />

            <Avatar
              src="/images/owner_pictures/justin.webp"
              sx={{
                width: { xs: 70, sm: 90 },
                height: { xs: 70, sm: 90 },
                mx: "auto",
                mb: 2,
                border: "3px solid #DC143C",
                boxShadow: "0 4px 16px rgba(139, 69, 19, 0.3)",
              }}
            >
              J
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#155263",
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                mb: 0.5,
              }}
            >
              Justin
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              Authoritarian Commish
            </Typography>
          </Paper>
        </Box>

        {/* Navigation Section */}
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 3, sm: 3, md: 4 },
            }}
          >
            {/* Hardware Store */}
            <Paper
              component={Link}
              to="/hardware-store"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                borderRadius: 3,
                border: "2px solid rgba(21, 82, 99, 0.1)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #DAA520, #FFD700)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#DAA520",
                  boxShadow: "0 16px 40px rgba(218, 165, 32, 0.25)",
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .nav-title": {
                    color: "#DAA520",
                  },
                  "& .nav-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <EmojiEventsIcon
                className="nav-icon"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "#DAA520",
                  mb: 2,
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                className="nav-title"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  color: "#155263",
                  mb: 1,
                  transition: "color 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                Hardware Store
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.6,
                }}
              >
                Championship trophies & league history
              </Typography>
            </Paper>

            {/* League Members */}
            <Paper
              component={Link}
              to="/members"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                borderRadius: 3,
                border: "2px solid rgba(21, 82, 99, 0.1)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #155263, #2798b7)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#155263",
                  boxShadow: "0 16px 40px rgba(21, 82, 99, 0.25)",
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .nav-title": {
                    color: "#155263",
                  },
                  "& .nav-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <PeopleIcon
                className="nav-icon"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "#155263",
                  mb: 2,
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                className="nav-title"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  color: "#155263",
                  mb: 1,
                  transition: "color 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                League Members
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.6,
                }}
              >
                Team rosters & all time win percentages
              </Typography>
            </Paper>

            {/* Analytics */}
            <Paper
              component={Link}
              to="/analytics"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                borderRadius: 3,
                border: "2px solid rgba(21, 82, 99, 0.1)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#2563eb",
                  boxShadow: "0 16px 40px rgba(37, 99, 235, 0.25)",
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .nav-title": {
                    color: "#2563eb",
                  },
                  "& .nav-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <AnalyticsIcon
                className="nav-icon"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "#2563eb",
                  mb: 2,
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                className="nav-title"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  color: "#155263",
                  mb: 1,
                  transition: "color 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                Analytics
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.6,
                }}
              >
                Stats, trends & deep insights
              </Typography>
            </Paper>

            {/* League Lore */}
            <Paper
              component={Link}
              to="/league-lore"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                borderRadius: 3,
                border: "2px solid rgba(21, 82, 99, 0.1)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#10b981",
                  boxShadow: "0 16px 40px rgba(16, 185, 129, 0.25)",
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .nav-title": {
                    color: "#10b981",
                  },
                  "& .nav-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <AutoStoriesIcon
                className="nav-icon"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "#10b981",
                  mb: 2,
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                className="nav-title"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  color: "#155263",
                  mb: 1,
                  transition: "color 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                League Lore
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.6,
                }}
              >
                Historical moments & deep lore
              </Typography>
            </Paper>

            {/* By-Laws */}
            <Paper
              component="a"
              href="https://docs.google.com/document/d/1pJQ_SrG_yooaJzuMaXOznfc_lNiDYxmY/edit"
              target="_blank"
              rel="noopener noreferrer"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                borderRadius: 3,
                border: "2px solid rgba(21, 82, 99, 0.1)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#f59e0b",
                  boxShadow: "0 16px 40px rgba(245, 158, 11, 0.25)",
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .nav-title": {
                    color: "#f59e0b",
                  },
                  "& .nav-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <DescriptionIcon
                className="nav-icon"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "#f59e0b",
                  mb: 2,
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                className="nav-title"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  color: "#155263",
                  mb: 1,
                  transition: "color 0.3s ease",
                  letterSpacing: "0.5px",
                }}
              >
                By-Laws
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.6,
                }}
              >
                Official rules & league constitution
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Footer Tagline */}
        <Box sx={{ textAlign: "center", mt: { xs: 8, md: 12 }, pb: 4 }}>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              fontStyle: "italic",
              letterSpacing: "0.5px",
            }}
          >
            Est. 2012 • Jacksonville, FL
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
