import {
  Box,
  Typography,
  Avatar,
  Paper,
  Switch,
  FormControlLabel,
} from "@jakes-dad/shared";
import { useState } from "react";

// Mock data representing the MemberStats interface
const mockMemberStats = [
  { owner_id: 1, name: "Jake", totalWins: 98, totalLosses: 72, winPercentage: "57.65%", hardware: 3, avatar: "/images/owner_pictures/jake.webp" },
  { owner_id: 2, name: "Andrew", totalWins: 95, totalLosses: 75, winPercentage: "55.88%", hardware: 2, avatar: "/images/owner_pictures/andrew.webp" },
  { owner_id: 3, name: "Craig", totalWins: 89, totalLosses: 81, winPercentage: "52.35%", hardware: 1, avatar: "/images/owner_pictures/craig.webp" },
  { owner_id: 4, name: "Taylor", totalWins: 85, totalLosses: 85, winPercentage: "50.00%", hardware: 1, avatar: "/images/owner_pictures/taylor.webp" },
  { owner_id: 5, name: "Dylan", totalWins: 82, totalLosses: 88, winPercentage: "48.24%", hardware: 1, avatar: "/images/owner_pictures/dylan.webp" },
  { owner_id: 6, name: "Derek", totalWins: 80, totalLosses: 90, winPercentage: "47.06%", hardware: 0, avatar: "/images/owner_pictures/derek.webp" },
  { owner_id: 7, name: "Kevin", totalWins: 78, totalLosses: 92, winPercentage: "45.88%", hardware: 1, avatar: "/images/owner_pictures/kevin.webp" },
  { owner_id: 8, name: "Dan", totalWins: 75, totalLosses: 95, winPercentage: "44.12%", hardware: 0, avatar: "/images/owner_pictures/dan.webp" },
  { owner_id: 9, name: "Mario", totalWins: 72, totalLosses: 98, winPercentage: "42.35%", hardware: 0, avatar: "/images/owner_pictures/mario.webp" },
  { owner_id: 10, name: "Wes", totalWins: 70, totalLosses: 100, winPercentage: "41.18%", hardware: 0, avatar: "/images/owner_pictures/wes.webp" },
];

const MembersRedesign = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);

  // Calculate min/max from actual data for dynamic color range
  const winPercentages = mockMemberStats.map((m) =>
    parseFloat(m.winPercentage.replace("%", ""))
  );
  const minPct = Math.min(...winPercentages);
  const maxPct = Math.max(...winPercentages);

  // Smooth gradient mapped to actual data range
  // Lowest win % = dark red, highest = deep green, middle = yellow
  const getWinPercentageColor = (percentage: string) => {
    const percent = parseFloat(percentage.replace("%", ""));

    // Normalize to 0-1 based on actual data range
    const normalized = maxPct === minPct ? 0.5 : (percent - minPct) / (maxPct - minPct);

    // Define color stops
    const darkRed = { r: 139, g: 0, b: 0 };      // #8B0000 at min
    const yellow = { r: 218, g: 165, b: 32 };    // #DAA520 at midpoint
    const deepGreen = { r: 13, g: 107, b: 13 };  // #0D6B0D at max

    let r: number, g: number, b: number;

    if (normalized <= 0.5) {
      // Interpolate from dark red to yellow (bottom half of data)
      const ratio = normalized / 0.5;
      r = darkRed.r + (yellow.r - darkRed.r) * ratio;
      g = darkRed.g + (yellow.g - darkRed.g) * ratio;
      b = darkRed.b + (yellow.b - darkRed.b) * ratio;
    } else {
      // Interpolate from yellow to deep green (top half of data)
      const ratio = (normalized - 0.5) / 0.5;
      r = yellow.r + (deepGreen.r - yellow.r) * ratio;
      g = yellow.g + (deepGreen.g - yellow.g) * ratio;
      b = yellow.b + (deepGreen.b - yellow.b) * ratio;
    }

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 6 },
          textAlign: "center",
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
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "32px", md: "48px" },
            mb: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          League Members
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: { xs: "14px", md: "16px" },
            fontStyle: "italic",
            position: "relative",
            zIndex: 1,
          }}
        >
          Ranked by all-time win percentage
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* Modern Era Toggle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <FormControlLabel
            control={
              <Switch
                checked={modernEraOnly}
                onChange={(e) => setModernEraOnly(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#2798b7",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2798b7",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#155263",
                  ml: 1,
                }}
              >
                Modern Era Only
              </Typography>
            }
          />
        </Box>

        {/* Member Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {mockMemberStats.map((member) => {
            const winPctColor = getWinPercentageColor(member.winPercentage);

            return (
              <Paper
                key={member.owner_id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "2px solid #e0e0e0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Header: Avatar + Name */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    sx={{
                      width: 72,
                      height: 72,
                      border: "3px solid #155263",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#155263",
                        fontSize: "20px",
                      }}
                    >
                      {member.name}
                    </Typography>
                  </Box>
                  {/* Hardware Badge */}
                  {member.hardware > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: "rgba(218, 165, 32, 0.15)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>🏆</Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#c5901c",
                          fontSize: "14px",
                        }}
                      >
                        {member.hardware}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Stats Section */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Overall Record */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Overall Record
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#155263",
                        fontSize: "15px",
                      }}
                    >
                      {member.totalWins} - {member.totalLosses}
                    </Typography>
                  </Box>

                  {/* Win Percentage */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      All-Time Win Pct
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: winPctColor,
                        fontSize: "16px",
                      }}
                    >
                      {member.winPercentage}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* Footer Note */}
        <Box sx={{ textAlign: "center", mt: 6, pb: 4 }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Stats from {modernEraOnly ? "Modern Era (2020+)" : "All Time (2012+)"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MembersRedesign;
