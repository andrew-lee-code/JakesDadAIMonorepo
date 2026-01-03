/**
 * Home Screen Redesign V2
 *
 * Design Philosophy:
 * - LESS text, MORE visual impact
 * - Bold typography as design element
 * - Dramatic asymmetric layouts
 * - Clean whitespace
 * - Modern sports media aesthetic
 */

import { Box, Typography, Avatar, Button } from "@jakes-dad/shared";
import { Link } from "react-router-dom";
import { homeRedesignData } from "../../data/mockData";

const tokens = {
  colors: {
    teal: {
      900: "#003f4c",
      800: "#00566a",
      700: "#006778",
      600: "#155263",
      500: "#2798b7",
      400: "#4db8d4",
      100: "#e6f4f8",
    },
    gold: {
      700: "#c5901c",
      600: "#d7a22a",
      500: "#daa520",
      400: "#e4bb4d",
      200: "#f4e7a7",
      100: "#faf3d4",
    },
    error: {
      700: "#b91c1c",
      600: "#dc143c",
      500: "#ef4444",
      100: "#fee2e2",
    },
  },
};

const { champion, ultimateLoser, personalityAwards, navigation, leagueYear } = homeRedesignData;

/**
 * Hero - Bold, minimal, impactful
 */
const Hero = () => (
  <Box
    sx={{
      pt: { xs: 8, md: 12 },
      pb: { xs: 4, md: 6 },
      textAlign: "center",
      position: "relative",
    }}
  >
    {/* Year badge - subtle */}
    <Typography
      sx={{
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "3px",
        color: "rgba(255,255,255,0.5)",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {leagueYear} Season
    </Typography>

    {/* Main title - HUGE and bold */}
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: "4rem", sm: "6rem", md: "8rem", lg: "10rem" },
        fontWeight: 900,
        color: "#ffffff",
        fontFamily: "'Jags', system-ui, sans-serif",
        letterSpacing: { xs: "-2px", md: "-4px" },
        lineHeight: 0.9,
        textShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      JAKE'S
    </Typography>
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: "4rem", sm: "6rem", md: "8rem", lg: "10rem" },
        fontWeight: 900,
        color: tokens.colors.gold[500],
        fontFamily: "'Jags', system-ui, sans-serif",
        letterSpacing: { xs: "-2px", md: "-4px" },
        lineHeight: 0.9,
        textShadow: "0 8px 32px rgba(218, 165, 32, 0.3)",
      }}
    >
      DAD
    </Typography>
  </Box>
);

/**
 * VS Section - Dramatic split screen Champion vs Loser
 */
const VersusSection = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", lg: "1fr auto 1fr" },
      gap: { xs: 0, lg: 0 },
      my: { xs: 4, md: 8 },
      mx: { xs: -2, sm: -4, md: -6 },
      minHeight: { xs: "auto", lg: "500px" },
    }}
  >
    {/* Champion Side - Gold dominant */}
    <Box
      sx={{
        background: `linear-gradient(135deg, ${tokens.colors.gold[500]} 0%, ${tokens.colors.gold[700]} 100%)`,
        p: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", lg: "flex-end" },
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "350px", lg: "auto" },
      }}
    >
      {/* Decorative diagonal */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: { xs: 0, lg: -50 },
          bottom: 0,
          width: { xs: 0, lg: "100px" },
          background: tokens.colors.gold[500],
          transform: "skewX(-8deg)",
          display: { xs: "none", lg: "block" },
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, textAlign: { xs: "center", lg: "right" } }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "rgba(0,0,0,0.4)",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Champion
        </Typography>

        <Avatar
          src={champion.avatar}
          alt={champion.name}
          sx={{
            width: { xs: 140, md: 180 },
            height: { xs: 140, md: 180 },
            border: "6px solid rgba(255,255,255,0.9)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            mx: { xs: "auto", lg: 0 },
            ml: { lg: "auto" },
            mb: 3,
          }}
        >
          {champion.name.charAt(0)}
        </Avatar>

        <Typography
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            mb: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {champion.name.toUpperCase()}
        </Typography>

        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            mb: 2,
          }}
        >
          {champion.teamName}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", lg: "flex-end" } }}>
          <StatBadge value={champion.record} light />
          <StatBadge value={`${champion.titleCount}x`} light />
        </Box>
      </Box>
    </Box>

    {/* VS Divider */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
        py: { xs: 2, lg: 0 },
        background: { xs: tokens.colors.teal[600], lg: "transparent" },
      }}
    >
      <Box
        sx={{
          width: { xs: 80, lg: 100 },
          height: { xs: 80, lg: 100 },
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: `4px solid ${tokens.colors.teal[600]}`,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", lg: "2rem" },
            fontWeight: 900,
            color: tokens.colors.teal[600],
            letterSpacing: "-1px",
          }}
        >
          VS
        </Typography>
      </Box>
    </Box>

    {/* Loser Side - Crimson/Red dominant */}
    <Box
      sx={{
        background: `linear-gradient(135deg, ${tokens.colors.error[600]} 0%, ${tokens.colors.error[700]} 100%)`,
        p: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", lg: "flex-start" },
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "350px", lg: "auto" },
      }}
    >
      {/* Decorative diagonal */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: { xs: 0, lg: -50 },
          bottom: 0,
          width: { xs: 0, lg: "100px" },
          background: tokens.colors.error[600],
          transform: "skewX(-8deg)",
          display: { xs: "none", lg: "block" },
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, textAlign: { xs: "center", lg: "left" } }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "rgba(0,0,0,0.4)",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Last Place
        </Typography>

        <Avatar
          src={ultimateLoser.avatar}
          alt={ultimateLoser.name}
          sx={{
            width: { xs: 140, md: 180 },
            height: { xs: 140, md: 180 },
            border: "6px solid rgba(255,255,255,0.9)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            mx: { xs: "auto", lg: 0 },
            mb: 3,
            filter: "grayscale(30%)",
          }}
        >
          {ultimateLoser.name.charAt(0)}
        </Avatar>

        <Typography
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            mb: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {ultimateLoser.name.toUpperCase()}
        </Typography>

        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            mb: 2,
          }}
        >
          {ultimateLoser.teamName}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", lg: "flex-start" } }}>
          <StatBadge value={ultimateLoser.record} light />
          <StatBadge value={`${ultimateLoser.loserCount}L`} light />
        </Box>
      </Box>
    </Box>
  </Box>
);

/**
 * StatBadge - Minimal stat display
 */
const StatBadge = ({ value, light = false }: { value: string; light?: boolean }) => (
  <Box
    sx={{
      px: 2,
      py: 1,
      borderRadius: "6px",
      backgroundColor: light ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
      backdropFilter: "blur(4px)",
    }}
  >
    <Typography
      sx={{
        fontSize: "0.9rem",
        fontWeight: 700,
        color: light ? "#ffffff" : tokens.colors.teal[600],
      }}
    >
      {value}
    </Typography>
  </Box>
);

/**
 * Awards Section - Compact, icon-driven, minimal text
 */
const AwardsSection = () => (
  <Box
    sx={{
      py: { xs: 6, md: 10 },
      px: { xs: 2, md: 4 },
    }}
  >
    {/* Section title */}
    <Typography
      sx={{
        fontSize: { xs: "2rem", md: "3rem" },
        fontWeight: 900,
        color: "#ffffff",
        textAlign: "center",
        letterSpacing: "-1px",
        mb: 6,
      }}
    >
      AWARDS
    </Typography>

    {/* Award cards - horizontal scroll on mobile, grid on desktop */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: { xs: 2, md: 3 },
        maxWidth: "1000px",
        mx: "auto",
      }}
    >
      {personalityAwards.map((award) => (
        <AwardCard key={award.id} award={award} />
      ))}
    </Box>
  </Box>
);

/**
 * AwardCard - Compact visual card
 */
const AwardCard = ({ award }: { award: (typeof personalityAwards)[0] }) => (
  <Box
    sx={{
      position: "relative",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
      },
    }}
  >
    {/* Color bar top */}
    <Box
      sx={{
        height: "4px",
        backgroundColor: award.accentColor,
      }}
    />

    <Box sx={{ p: { xs: 2, md: 2.5 }, textAlign: "center" }}>
      {/* Avatar with colored ring */}
      <Avatar
        src={award.avatar}
        alt={award.winner}
        sx={{
          width: { xs: 56, md: 72 },
          height: { xs: 56, md: 72 },
          mx: "auto",
          mb: 1.5,
          border: `3px solid ${award.accentColor}`,
          boxShadow: `0 4px 12px ${award.accentColor}40`,
        }}
      >
        {award.winner.charAt(0)}
      </Avatar>

      {/* Award title - short */}
      <Typography
        sx={{
          fontSize: { xs: "0.65rem", md: "0.7rem" },
          fontWeight: 700,
          letterSpacing: "1px",
          color: award.accentColor,
          textTransform: "uppercase",
          mb: 0.5,
        }}
      >
        {award.title}
      </Typography>

      {/* Winner name */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          fontWeight: 700,
          color: tokens.colors.teal[600],
        }}
      >
        {award.winner}
      </Typography>
    </Box>
  </Box>
);

/**
 * Navigation - Minimal elegant grid
 */
const NavSection = () => (
  <Box
    sx={{
      py: { xs: 4, md: 8 },
      px: { xs: 2, md: 4 },
    }}
  >
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: { xs: 1.5, md: 2 },
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      {navigation.map((item) => {
        const isExternal = item.external;
        const commonSx = {
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "12px",
          py: { xs: 2.5, md: 3 },
          px: 2,
          textAlign: "center" as const,
          textDecoration: "none",
          transition: "all 0.2s ease",
          display: "block",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgba(255,255,255,0.3)",
            transform: "translateY(-2px)",
          },
        };

        const content = (
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.5px",
            }}
          >
            {item.label}
          </Typography>
        );

        return isExternal ? (
          <Box
            key={item.path}
            component="a"
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            sx={commonSx}
          >
            {content}
          </Box>
        ) : (
          <Box
            key={item.path}
            component={Link}
            to={item.path}
            sx={commonSx}
          >
            {content}
          </Box>
        );
      })}
    </Box>
  </Box>
);

/**
 * Back button
 */
const BackButton = () => (
  <Box sx={{ position: "fixed", top: 16, left: 16, zIndex: 1000 }}>
    <Button
      component={Link}
      to="/"
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "rgba(255,255,255,0.9)",
        color: tokens.colors.teal[600],
        fontWeight: 600,
        fontSize: "0.75rem",
        px: 2,
        py: 1,
        borderRadius: "8px",
        textTransform: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        "&:hover": {
          backgroundColor: "#ffffff",
        },
      }}
    >
      Back
    </Button>
  </Box>
);

/**
 * Footer - Minimal
 */
const Footer = () => (
  <Box sx={{ textAlign: "center", py: 6 }}>
    <Typography
      sx={{
        fontSize: "0.7rem",
        color: "rgba(255,255,255,0.3)",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      Est. 2015
    </Typography>
  </Box>
);

/**
 * Main Component
 */
const HomeRedesignV2 = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${tokens.colors.teal[800]} 0%, ${tokens.colors.teal[600]} 50%, ${tokens.colors.teal[800]} 100%)`,
        overflow: "hidden",
      }}
    >
      <BackButton />

      <Box
        component="main"
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Hero />
        <VersusSection />
        <AwardsSection />
        <NavSection />
        <Footer />
      </Box>
    </Box>
  );
};

export default HomeRedesignV2;