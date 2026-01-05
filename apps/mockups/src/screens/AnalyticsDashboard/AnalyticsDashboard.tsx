import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Avatar,
  Card,
  CardContent,
} from "@jakes-dad/shared";
import {
  EmojiEvents,
  TrendingUp,
  SportsMma,
  SwapHoriz,
  Poll,
  CalendarMonth,
} from "@mui/icons-material";

// Section Navigation
const sections = [
  { id: "goats-woats", label: "Goats & Woats", icon: EmojiEvents },
  { id: "regular-season", label: "Regular Season", icon: TrendingUp },
  { id: "playoff-performance", label: "Playoffs", icon: SportsMma },
  { id: "head-to-head", label: "Head to Head", icon: SwapHoriz },
  { id: "waiver-transactions", label: "Waivers", icon: CalendarMonth },
  { id: "poll-data", label: "Poll Data", icon: Poll },
];

// Mock quick stats
const quickStats = [
  { label: "Seasons Tracked", value: "12" },
  { label: "Total Games", value: "1,440+" },
  { label: "Active Owners", value: "10" },
  { label: "Scoring", value: "0.5 PPR since 2022" },
];

// Mock GOATS data for preview - showing top 3 and bottom 3 with ties
const mockGoatsCategories = [
  {
    name: "Ring Gawd",
    goats: [
      { rank: 1, name: "Michael", value: "3 Rings" },
      { rank: 2, name: "Matt", value: "2 Rings" },
      { rank: 2, name: "Taylor", value: "2 Rings" }, // Tie for 2nd
      { rank: 3, name: "Andrew", value: "1 Ring" },
    ],
    woats: [
      { rank: 1, name: "Kyle", value: "0 Rings" },
      { rank: 1, name: "Justin", value: "0 Rings" }, // Tie for last
      { rank: 2, name: "Jake", value: "0 Rings" },
    ],
  },
  {
    name: "Win %",
    goats: [
      { rank: 1, name: "Matt", value: "58.2%" },
      { rank: 2, name: "Michael", value: "55.1%" },
      { rank: 3, name: "Taylor", value: "52.8%" },
    ],
    woats: [
      { rank: 1, name: "Justin", value: "42.1%" },
      { rank: 2, name: "Kyle", value: "44.3%" },
      { rank: 3, name: "Jake", value: "45.6%" },
    ],
  },
  {
    name: "Playoff Win %",
    goats: [
      { rank: 1, name: "Taylor", value: "66.7%" },
      { rank: 2, name: "Michael", value: "61.5%" },
      { rank: 3, name: "Matt", value: "58.3%" },
    ],
    woats: [
      { rank: 1, name: "Andrew", value: "33.3%" },
      { rank: 2, name: "Kyle", value: "40.0%" },
      { rank: 3, name: "Justin", value: "42.9%" },
    ],
  },
  {
    name: "Avg Pts/Season",
    goats: [
      { rank: 1, name: "Matt", value: "1,842 pts" },
      { rank: 2, name: "Michael", value: "1,798 pts" },
      { rank: 3, name: "Taylor", value: "1,756 pts" },
    ],
    woats: [
      { rank: 1, name: "Kyle", value: "1,654 pts" },
      { rank: 2, name: "Jake", value: "1,678 pts" },
      { rank: 3, name: "Justin", value: "1,702 pts" },
    ],
  },
];

// Section Header Component
const SectionHeader = ({
  title,
  subtitle,
  id,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  id: string;
  icon?: React.ElementType;
}) => (
  <Box id={id} sx={{ mb: 3, scrollMarginTop: "80px" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: subtitle ? 0.5 : 0 }}>
      {Icon && (
        <Icon sx={{ fontSize: { xs: 28, md: 32 }, color: "#155263" }} />
      )}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#155263",
          fontSize: { xs: "1.75rem", md: "2rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
    {subtitle && (
      <Typography
        variant="body2"
        sx={{ color: "#666", fontStyle: "italic", ml: Icon ? 5.5 : 0 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

// Mock component placeholder
const MockComponent = ({
  name,
  height = 300,
  description,
}: {
  name: string;
  height?: number;
  description: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      height,
      p: 3,
      borderRadius: 3,
      border: "2px solid #e0e0e0",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        borderColor: "#155263",
      },
    }}
  >
    <Typography
      variant="h6"
      sx={{ fontWeight: 600, color: "#155263", mb: 1, textAlign: "center" }}
    >
      {name}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "#666", fontStyle: "italic", textAlign: "center" }}
    >
      {description}
    </Typography>
  </Paper>
);

// Rank badge colors
const getRankColor = (rank: number, isGoat: boolean) => {
  if (rank === 1) return isGoat ? "#daa520" : "#dc143c";
  if (rank === 2) return isGoat ? "#c0c0c0" : "#ff6b6b";
  return isGoat ? "#cd7f32" : "#ffa07a";
};

// GOATS Preview Card - shows top 3 and bottom 3 with tie handling
const GoatsPreviewCard = ({
  category,
}: {
  category: (typeof mockGoatsCategories)[0];
}) => {
  // Calculate max entries to ensure visual balance
  const maxEntries = Math.max(category.goats.length, category.woats.length);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "2px solid #e0e0e0",
        backgroundColor: "#ffffff",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          borderColor: "#155263",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "#155263",
            textAlign: "center",
            mb: 2,
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {category.name}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, flex: 1 }}>
          {/* GOATS Column */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#155263",
                textAlign: "center",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              GOATS
            </Typography>
            <Box
              sx={{
                backgroundColor: "#155263",
                borderRadius: 2,
                p: 1,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                minHeight: maxEntries * 36,
              }}
            >
              {category.goats.map((goat, idx) => (
                <Box
                  key={`${goat.name}-${idx}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 1,
                    p: 0.75,
                    borderLeft: `3px solid ${getRankColor(goat.rank, true)}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: getRankColor(goat.rank, true),
                      minWidth: 16,
                    }}
                  >
                    #{goat.rank}
                  </Typography>
                  <Box sx={{ flex: 1, color: "#fff", minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {goat.name}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", opacity: 0.85 }}>
                      {goat.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* WOATS Column */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#666",
                textAlign: "center",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              WOATS
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                p: 1,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                border: "1px solid #e0e0e0",
                minHeight: maxEntries * 36,
              }}
            >
              {category.woats.map((woat, idx) => (
                <Box
                  key={`${woat.name}-${idx}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    p: 0.75,
                    borderLeft: `3px solid ${getRankColor(woat.rank, false)}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: getRankColor(woat.rank, false),
                      minWidth: 16,
                    }}
                  >
                    #{woat.rank}
                  </Typography>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#333",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {woat.name}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", color: "#666" }}>
                      {woat.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Component
const AnalyticsDashboard = () => {
  const [activeSection, setActiveSection] = useState("goats-woats");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          px: { xs: 2, md: 6 },
          pt: { xs: 4, md: 5 },
          pb: { xs: 3, md: 4 },
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
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 3, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "28px", md: "42px" },
              mb: 0.5,
            }}
          >
            League Analytics
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: { xs: "14px", md: "16px" },
              fontStyle: "italic",
            }}
          >
            The numbers don't lie (but they can be cherry-picked)
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, md: 3 },
            flexWrap: "wrap",
            mb: 3,
            position: "relative",
            zIndex: 1,
          }}
        >
          {quickStats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                textAlign: "center",
                px: { xs: 1.5, md: 3 },
                py: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                minWidth: { xs: "70px", md: "120px" },
              }}
            >
              <Typography
                sx={{
                  color: "#daa520",
                  fontWeight: 700,
                  fontSize: { xs: "18px", md: "24px" },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: { xs: "10px", md: "12px" },
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Section Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          {sections.map((section) => (
            <Chip
              key={section.id}
              label={section.label}
              onClick={() => scrollToSection(section.id)}
              sx={{
                backgroundColor:
                  activeSection === section.id
                    ? "#fff"
                    : "rgba(255,255,255,0.2)",
                color: activeSection === section.id ? "#155263" : "#fff",
                fontWeight: 600,
                fontSize: { xs: "12px", md: "14px" },
                height: { xs: 32, md: 36 },
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    activeSection === section.id
                      ? "#fff"
                      : "rgba(255,255,255,0.3)",
                },
              }}
            />
          ))}
        </Box>

        {/* OG Spreadsheet Link */}
        <Box sx={{ textAlign: "center", mt: 2, position: "relative", zIndex: 1 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Open OG Analytics Spreadsheet →
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* Section 1: Goats and Woats */}
        <SectionHeader
          id="goats-woats"
          title="Goats and Woats"
          subtitle="The greatest and worst across all categories"
          icon={EmojiEvents}
        />

        {/* GOATS Preview Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 2,
          }}
        >
          {mockGoatsCategories.map((category) => (
            <GoatsPreviewCard key={category.name} category={category} />
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 6,
            borderRadius: 2,
            backgroundColor: "#e6f4f8",
            border: "1px dashed #2798b7",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#155263" }}>
            <strong>Full GoatsAndWoats component</strong> will display all 7 categories with
            Modern Era toggle
          </Typography>
        </Paper>

        {/* Section 2: Regular Season Performance */}
        <SectionHeader
          id="regular-season"
          title="Regular Season Performance"
          subtitle="Season finishes and win/loss records across all years"
          icon={TrendingUp}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          <MockComponent
            name="Regular Season Heatmap"
            height={350}
            description="Finish position heatmap by year/owner with color coding"
          />
        </Box>

        <MockComponent
          name="Raw Win/Loss Records"
          height={300}
          description="Complete W/L breakdown by year for each owner"
        />
        <Box sx={{ mb: 6 }} />

        {/* Section 3: Playoff Performance */}
        <SectionHeader
          id="playoff-performance"
          title="Playoff Performance"
          subtitle="Postseason appearances, finishes, and win rates"
          icon={SportsMma}
        />

        <MockComponent
          name="Playoff Stats"
          height={400}
          description="Playoff appearances chart + finishes chart + stats table with championship rates"
        />
        <Box sx={{ mb: 6 }} />

        {/* Section 4: Head to Head Stats */}
        <SectionHeader
          id="head-to-head"
          title="Head to Head Stats"
          subtitle="Compare any two owners' matchup history"
          icon={SwapHoriz}
        />

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 3,
            border: "2px solid #daa520",
            backgroundColor: "#fffbf0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 3, textAlign: "center" }}
          >
            Head-to-Head Explorer
          </Typography>

          {/* Mock H2H UI */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {/* Owner 1 */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "3px solid #daa520",
                textAlign: "center",
                minWidth: 200,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 1,
                  backgroundColor: "#155263",
                  fontSize: "24px",
                }}
              >
                M
              </Avatar>
              <Typography sx={{ fontWeight: 700, color: "#155263" }}>
                Michael
              </Typography>
              <Typography
                sx={{ fontSize: "28px", fontWeight: 700, color: "#daa520" }}
              >
                8-5
              </Typography>
              <Typography sx={{ color: "#666", fontSize: "14px" }}>
                61.5% Win Rate
              </Typography>
            </Paper>

            {/* VS */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#155263",
                  fontSize: "24px",
                }}
              >
                VS
              </Typography>
              <Typography sx={{ color: "#666", fontSize: "14px" }}>
                13 Total Games
              </Typography>
            </Box>

            {/* Owner 2 */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "3px solid #dc143c",
                textAlign: "center",
                minWidth: 200,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 1,
                  backgroundColor: "#666",
                  fontSize: "24px",
                }}
              >
                A
              </Avatar>
              <Typography sx={{ fontWeight: 700, color: "#155263" }}>
                Andrew
              </Typography>
              <Typography
                sx={{ fontSize: "28px", fontWeight: 700, color: "#dc143c" }}
              >
                5-8
              </Typography>
              <Typography sx={{ color: "#666", fontSize: "14px" }}>
                38.5% Win Rate
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
              Full component includes owner dropdowns + Modern Era toggle + breakdown
              by regular season vs playoffs
            </Typography>
          </Box>
        </Paper>

        {/* Section 5: Waiver Transactions */}
        <SectionHeader
          id="waiver-transactions"
          title="Waiver Transactions"
          subtitle="Track spending and budget remaining throughout the season"
          icon={CalendarMonth}
        />

        <MockComponent
          name="Waiver Transactions"
          height={400}
          description="D3 line chart tracking budget remaining by week for each owner"
        />
        <Box sx={{ mb: 6 }} />

        {/* Section 6: Pre-season Poll Data */}
        <SectionHeader
          id="poll-data"
          title="Pre-season Poll Data"
          subtitle="How the league voted on team rankings before the season"
          icon={Poll}
        />

        <MockComponent
          name="Poll Data"
          height={400}
          description="Median preseason poll rankings + raw votes stacked chart by voter"
        />
        <Box sx={{ mb: 4 }} />

        {/* Footer */}
        <Box sx={{ textAlign: "center", py: 4, borderTop: "1px solid #e0e0e0" }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            "In God we trust. All others must bring data." — W. Edwards Deming
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;
