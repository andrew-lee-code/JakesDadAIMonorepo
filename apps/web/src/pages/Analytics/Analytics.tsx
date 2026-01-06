import { useState } from "react";
import { Box, Paper } from "@jakes-dad/shared";
import {
  EmojiEvents,
  TrendingUp,
  SportsMma,
  SwapHoriz,
  CalendarMonth,
  Poll,
} from "@mui/icons-material";
import { DashboardHero, DashboardSection } from "../../components/analytics";
import GoatsAndWoats from "../../components/GoatsAndWoats";
import RegularSeasonHeatmap from "../../components/RegularSeasonHeatmap";
import PlayoffStats from "../../components/PlayoffStats";
import HeadToHeadExplorer from "../../components/HeadToHeadExplorer";
import RawWinLossRecords from "../../components/RawWinLossRecords";
import PollData from "../../components/PollData";
import WaiverTransactions from "../../components/WaiverTransactions";

const SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/1kR5JwB_aS3irGJySGrrFOmXafrBnnUP_b-81JBWK15k/edit?gid=0#gid=0";

const quickStats = [
  { label: "Seasons Tracked", value: "12" },
  { label: "Total Games", value: "1,440+" },
  { label: "Active Owners", value: "10" },
  { label: "PPR Since 2022", value: "0.5" },
];

const sections = [
  { id: "goats-woats", label: "Goats & Woats" },
  { id: "regular-season", label: "Regular Season" },
  { id: "playoff-performance", label: "Playoffs" },
  { id: "head-to-head", label: "Head to Head" },
  { id: "waiver-transactions", label: "Waivers" },
  { id: "poll-data", label: "Poll Data" },
];

const Analytics = () => {
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
      <DashboardHero
        title="League Analytics"
        quickStats={quickStats}
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        spreadsheetUrl={SPREADSHEET_URL}
      />

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
        <DashboardSection
          id="goats-woats"
          title="Goats and Woats"
          subtitle="The greatest and worst across all categories"
          icon={EmojiEvents}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <GoatsAndWoats />
          </Paper>
        </DashboardSection>

        {/* Section 2: Regular Season Performance */}
        <DashboardSection
          id="regular-season"
          title="Regular Season Performance"
          subtitle="Season finishes and win/loss records across all years"
          icon={TrendingUp}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <RegularSeasonHeatmap />
            <RawWinLossRecords />
          </Paper>
        </DashboardSection>

        {/* Section 3: Playoff Performance */}
        <DashboardSection
          id="playoff-performance"
          title="Playoff Performance"
          subtitle="Postseason appearances, finishes, and win rates"
          icon={SportsMma}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <PlayoffStats />
          </Paper>
        </DashboardSection>

        {/* Section 4: Head to Head Stats */}
        <DashboardSection
          id="head-to-head"
          title="Head to Head Stats"
          subtitle="Compare any two owners' matchup history"
          icon={SwapHoriz}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "2px solid #daa520",
            }}
          >
            <HeadToHeadExplorer />
          </Paper>
        </DashboardSection>

        {/* Section 5: Waiver Transactions */}
        <DashboardSection
          id="waiver-transactions"
          title="Waiver Transactions"
          subtitle="Track spending and budget remaining throughout the season"
          icon={CalendarMonth}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <WaiverTransactions />
          </Paper>
        </DashboardSection>

        {/* Section 6: Pre-season Poll Data */}
        <DashboardSection
          id="poll-data"
          title="Pre-season Poll Data"
          subtitle="How the league voted on team rankings before the season"
          icon={Poll}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <PollData />
          </Paper>
        </DashboardSection>
      </Box>
    </Box>
  );
};

export default Analytics;
