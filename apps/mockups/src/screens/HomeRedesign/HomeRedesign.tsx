/**
 * Home Screen Redesign Mockup
 *
 * Design Goals:
 * - More personality, less "AI slop"
 * - Sarcastic, irreverent tone reflecting league culture
 * - Strong visual hierarchy with champion vs loser contrast
 * - Personality awards that tell stories, not just display names
 * - Navigation with character (witty descriptions)
 *
 * Design System Compliance:
 * - Jaguars colors: teal (#155263), gold (#daa520)
 * - 4px spacing grid
 * - WCAG 2.1 AA accessibility
 * - Mobile-first responsive design
 */

import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
} from "@jakes-dad/shared";
import { Link } from "react-router-dom";
import { homeRedesignData } from "../../data/mockData";

// Design tokens from the design system
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
    gray: {
      900: "#0a0a0a",
      700: "#2d2d2d",
      600: "#4a4a4a",
      500: "#666666",
      400: "#999999",
      200: "#e0e0e0",
      100: "#f5f5f5",
    },
  },
  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(0, 0, 0, 0.1)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.15)",
    xl: "0 12px 48px rgba(0, 0, 0, 0.2)",
    gold: "0 4px 16px rgba(218, 165, 32, 0.4)",
    error: "0 4px 16px rgba(220, 20, 60, 0.3)",
  },
};

const { champion, ultimateLoser, personalityAwards, navigation, recentDrama, tagline, leagueYear } = homeRedesignData;

/**
 * HeroSection - Main title with attitude
 */
const HeroSection = () => (
  <Box
    component="header"
    sx={{
      textAlign: "center",
      mb: { xs: 6, md: 8 },
      pt: { xs: 2, md: 4 },
    }}
  >
    {/* League Name - Big, bold, unapologetic */}
    <Typography
      variant="h1"
      component="h1"
      sx={{
        fontSize: { xs: "3rem", sm: "4rem", md: "5rem", lg: "6rem" },
        fontWeight: 800,
        color: "#ffffff",
        textShadow: "0 4px 12px rgba(0,0,0,0.4)",
        fontFamily: "'Jags', system-ui, sans-serif",
        letterSpacing: { xs: "2px", md: "4px" },
        lineHeight: 1.1,
        mb: 1,
      }}
    >
      JAKE'S DAD
    </Typography>

    {/* Tagline - The sarcastic edge */}
    <Typography
      variant="subtitle1"
      sx={{
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        color: tokens.colors.gold[400],
        fontStyle: "italic",
        letterSpacing: "1px",
        mb: 2,
        opacity: 0.95,
      }}
    >
      "{tagline}"
    </Typography>

    {/* Season indicator */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "rgba(255,255,255,0.15)",
        px: 3,
        py: 1,
        borderRadius: "24px",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: tokens.colors.gold[500],
          boxShadow: "0 0 8px rgba(218, 165, 32, 0.6)",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Season {leagueYear}
      </Typography>
    </Box>
  </Box>
);

/**
 * ChampionCard - Glorifying the winner with appropriate smugness
 */
const ChampionCard = () => (
  <Paper
    elevation={0}
    sx={{
      position: "relative",
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderRadius: "20px",
      border: `4px solid ${tokens.colors.gold[500]}`,
      boxShadow: tokens.shadows.xl,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
      },
    }}
  >
    {/* Gold ribbon accent */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        background: `linear-gradient(90deg, ${tokens.colors.gold[700]}, ${tokens.colors.gold[500]}, ${tokens.colors.gold[700]})`,
      }}
    />

    {/* Crown badge */}
    <Box
      sx={{
        position: "absolute",
        top: "-2px",
        right: "20px",
        backgroundColor: tokens.colors.gold[500],
        color: "#ffffff",
        px: 2,
        py: 0.75,
        borderRadius: "0 0 12px 12px",
        fontWeight: 700,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
        boxShadow: tokens.shadows.gold,
      }}
    >
      {leagueYear} CHAMPION
    </Box>

    <Box sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 5, sm: 6 } }}>
      {/* Champion avatar with ring count */}
      <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
        <Avatar
          src={champion.avatar}
          alt={champion.name}
          sx={{
            width: { xs: 120, sm: 140, md: 160 },
            height: { xs: 120, sm: 140, md: 160 },
            border: `5px solid ${tokens.colors.gold[500]}`,
            boxShadow: tokens.shadows.gold,
          }}
        >
          {champion.name.charAt(0)}
        </Avatar>

        {/* Ring count badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: tokens.colors.gold[600],
            color: "#ffffff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            border: "3px solid #ffffff",
            boxShadow: tokens.shadows.sm,
          }}
          aria-label={`${champion.titleCount} championships`}
        >
          {champion.titleCount}x
        </Box>
      </Box>

      {/* Champion info */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: tokens.colors.teal[600],
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
          mb: 0.5,
        }}
      >
        {champion.name}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: tokens.colors.gold[700],
          fontWeight: 600,
          fontSize: "1rem",
          mb: 2,
        }}
      >
        {champion.teamName}
      </Typography>

      {/* Stats row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <StatPill label="Record" value={champion.record} />
        <StatPill label="Seed" value={`#${champion.playoffSeed}`} />
        <StatPill label="Final" value={champion.championshipScore} />
      </Box>

      {/* Roast quote */}
      <Box
        sx={{
          backgroundColor: tokens.colors.gold[100],
          borderRadius: "12px",
          px: 3,
          py: 2,
          borderLeft: `4px solid ${tokens.colors.gold[500]}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: tokens.colors.gray[600],
            fontStyle: "italic",
            fontSize: "0.875rem",
          }}
        >
          "{champion.roastQuote}"
        </Typography>
      </Box>
    </Box>
  </Paper>
);

/**
 * LoserCard - Shaming the loser with appropriate cruelty
 */
const LoserCard = () => (
  <Paper
    elevation={0}
    sx={{
      position: "relative",
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderRadius: "20px",
      border: `4px solid ${tokens.colors.error[600]}`,
      boxShadow: tokens.shadows.xl,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
      },
    }}
  >
    {/* Shame stripe */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        background: `repeating-linear-gradient(
          90deg,
          ${tokens.colors.error[600]},
          ${tokens.colors.error[600]} 10px,
          ${tokens.colors.error[500]} 10px,
          ${tokens.colors.error[500]} 20px
        )`,
      }}
    />

    {/* Toilet badge */}
    <Box
      sx={{
        position: "absolute",
        top: "-2px",
        right: "20px",
        backgroundColor: tokens.colors.error[600],
        color: "#ffffff",
        px: 2,
        py: 0.75,
        borderRadius: "0 0 12px 12px",
        fontWeight: 700,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
        boxShadow: tokens.shadows.error,
      }}
    >
      ULTIMATE LOSER
    </Box>

    <Box sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 5, sm: 6 } }}>
      {/* Loser avatar - slightly grayed */}
      <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
        <Avatar
          src={ultimateLoser.avatar}
          alt={ultimateLoser.name}
          sx={{
            width: { xs: 120, sm: 140, md: 160 },
            height: { xs: 120, sm: 140, md: 160 },
            border: `5px solid ${tokens.colors.error[600]}`,
            boxShadow: tokens.shadows.error,
            filter: "grayscale(20%)",
          }}
        >
          {ultimateLoser.name.charAt(0)}
        </Avatar>

        {/* L count badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: tokens.colors.error[600],
            color: "#ffffff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            border: "3px solid #ffffff",
            boxShadow: tokens.shadows.sm,
          }}
          aria-label={`${ultimateLoser.loserCount} toilet bowl losses`}
        >
          {ultimateLoser.loserCount}L
        </Box>
      </Box>

      {/* Loser info */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: tokens.colors.teal[600],
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
          mb: 0.5,
        }}
      >
        {ultimateLoser.name}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: tokens.colors.error[600],
          fontWeight: 600,
          fontSize: "1rem",
          mb: 2,
        }}
      >
        {ultimateLoser.teamName}
      </Typography>

      {/* Stats row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <StatPill label="Record" value={ultimateLoser.record} variant="error" />
        <StatPill label="Toilet Bowl" value={ultimateLoser.toiletBowlScore} variant="error" />
      </Box>

      {/* Shame quote */}
      <Box
        sx={{
          backgroundColor: tokens.colors.error[100],
          borderRadius: "12px",
          px: 3,
          py: 2,
          borderLeft: `4px solid ${tokens.colors.error[600]}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: tokens.colors.gray[600],
            fontStyle: "italic",
            fontSize: "0.875rem",
          }}
        >
          "{ultimateLoser.shameQuote}"
        </Typography>
      </Box>
    </Box>
  </Paper>
);

/**
 * StatPill - Small stat display
 */
const StatPill = ({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "error";
}) => (
  <Box
    sx={{
      textAlign: "center",
      backgroundColor: variant === "error" ? tokens.colors.error[100] : tokens.colors.gray[100],
      px: 2,
      py: 1,
      borderRadius: "8px",
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: tokens.colors.gray[500],
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        display: "block",
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: variant === "error" ? tokens.colors.error[700] : tokens.colors.teal[600],
        fontWeight: 700,
        fontSize: "0.85rem",
      }}
    >
      {value}
    </Typography>
  </Box>
);

/**
 * PersonalityAwardCard - Individual award with flair
 */
const PersonalityAwardCard = ({
  award,
}: {
  award: (typeof personalityAwards)[0];
}) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3 },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "16px",
      border: `3px solid ${award.accentColor}`,
      boxShadow: tokens.shadows.md,
      transition: "all 0.3s ease",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      "&:hover": {
        transform: "translateY(-2px) scale(1.02)",
        boxShadow: `0 8px 24px ${award.accentColor}30`,
      },
    }}
  >
    {/* Award title with emoji context */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        backgroundColor: award.accentColor,
        color: "#ffffff",
        px: 2,
        py: 0.75,
        borderRadius: "20px",
        alignSelf: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {award.title}
      </Typography>
    </Box>

    {/* Winner avatar */}
    <Avatar
      src={award.avatar}
      alt={award.winner}
      sx={{
        width: 64,
        height: 64,
        mx: "auto",
        mb: 1.5,
        border: `3px solid ${award.accentColor}`,
        boxShadow: `0 2px 8px ${award.accentColor}40`,
      }}
    >
      {award.winner.charAt(0)}
    </Avatar>

    {/* Winner name */}
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: tokens.colors.teal[600],
        fontSize: "1.1rem",
        textAlign: "center",
      }}
    >
      {award.winner}
    </Typography>

    {/* Team name */}
    <Typography
      variant="body2"
      sx={{
        color: award.accentColor,
        fontWeight: 500,
        fontSize: "0.8rem",
        textAlign: "center",
        mb: 1.5,
      }}
    >
      {award.teamName}
    </Typography>

    {/* Award subtitle */}
    <Typography
      variant="caption"
      sx={{
        color: tokens.colors.gray[500],
        fontSize: "0.75rem",
        textAlign: "center",
        fontStyle: "italic",
        mb: 1,
      }}
    >
      {award.subtitle}
    </Typography>

    {/* Reason - the fun part */}
    <Box
      sx={{
        mt: "auto",
        pt: 1.5,
        borderTop: `1px dashed ${tokens.colors.gray[200]}`,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: tokens.colors.gray[600],
          fontSize: "0.8rem",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {award.reason}
      </Typography>
    </Box>
  </Paper>
);

/**
 * DramaTickerSection - Recent league drama
 */
const DramaTicker = () => (
  <Box
    sx={{
      backgroundColor: "rgba(0,0,0,0.2)",
      py: 1.5,
      px: 2,
      borderRadius: "8px",
      mb: 4,
      overflow: "hidden",
    }}
    role="marquee"
    aria-label="Recent league news"
  >
    <Box
      sx={{
        display: "flex",
        gap: 4,
        animation: "scroll 20s linear infinite",
        "@keyframes scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        whiteSpace: "nowrap",
      }}
    >
      {/* Double the items for seamless loop */}
      {[...recentDrama, ...recentDrama].map((item, index) => (
        <Typography
          key={index}
          variant="body2"
          component="span"
          sx={{
            color: tokens.colors.gold[400],
            fontSize: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            "&::after": {
              content: '"*"',
              color: tokens.colors.gold[500],
            },
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  </Box>
);

/**
 * NavigationSection - Links with personality
 */
const NavigationSection = () => (
  <Box
    component="nav"
    aria-label="Main navigation"
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(5, 1fr)",
      },
      gap: 2,
      maxWidth: "1200px",
      mx: "auto",
    }}
  >
    {navigation.map((item) => {
      const isExternal = item.external;
      const linkProps = isExternal
        ? {
            component: "a" as const,
            href: item.path,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {
            component: Link,
            to: item.path,
          };

      return (
        <Button
          key={item.path}
          {...linkProps}
          variant="contained"
          sx={{
            backgroundColor: "rgba(255,255,255,0.95)",
            color: tokens.colors.teal[600],
            py: 2.5,
            px: 3,
            borderRadius: "16px",
            textTransform: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            boxShadow: tokens.shadows.md,
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            minHeight: "100px",
            "&:hover": {
              backgroundColor: "#ffffff",
              border: `2px solid ${tokens.colors.teal[600]}`,
              transform: "translateY(-4px)",
              boxShadow: tokens.shadows.lg,
            },
            "&:focus-visible": {
              outline: `3px solid ${tokens.colors.teal[400]}`,
              outlineOffset: "2px",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: tokens.colors.teal[600],
            }}
          >
            {item.label}
            {isExternal && (
              <Box
                component="span"
                sx={{ ml: 0.5, fontSize: "0.8rem", opacity: 0.7 }}
                aria-hidden="true"
              >
                (external link)
              </Box>
            )}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: tokens.colors.gray[500],
              fontSize: "0.75rem",
              fontStyle: "italic",
            }}
          >
            {item.description}
          </Typography>
        </Button>
      );
    })}
  </Box>
);

/**
 * BackToMockupsButton - Navigation back to mockups index
 */
const BackToMockupsButton = () => (
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
        fontSize: "0.8rem",
        px: 2,
        py: 1,
        borderRadius: "8px",
        textTransform: "none",
        boxShadow: tokens.shadows.sm,
        "&:hover": {
          backgroundColor: "#ffffff",
        },
      }}
    >
      Back to Mockups
    </Button>
  </Box>
);

/**
 * HomeRedesign - Main component
 */
const HomeRedesign = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${tokens.colors.teal[600]} 0%, ${tokens.colors.teal[500]} 50%, ${tokens.colors.teal[600]} 100%)`,
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <BackToMockupsButton />

      {/* Main content container */}
      <Box
        component="main"
        sx={{
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* Hero */}
        <HeroSection />

        {/* Drama ticker */}
        <DramaTicker />

        {/* Champion vs Loser Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <ChampionCard />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <LoserCard />
          </Box>
        </Box>

        {/* Personality Awards Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Personality Awards
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              mb: 4,
              fontStyle: "italic",
            }}
          >
            Because stats only tell half the story
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {personalityAwards.map((award) => (
              <PersonalityAwardCard key={award.id} award={award} />
            ))}
          </Box>
        </Box>

        {/* Navigation Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Explore the League
          </Typography>
          <NavigationSection />
        </Box>

        {/* Footer tagline */}
        <Box sx={{ textAlign: "center", mt: 8, pb: 4 }}>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem",
            }}
          >
            Est. 2015 - Still somehow friends
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeRedesign;