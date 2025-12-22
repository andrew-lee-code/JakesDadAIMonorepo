import { Box, Typography, Button, Paper } from "@mui/material";
import GoatsAndWoats from "../../components/GoatsAndWoats";
import RegularSeasonHeatmap from "../../components/RegularSeasonHeatmap";
import PlayoffStats from "../../components/PlayoffStats";
import HeadToHeadExplorer from "../../components/HeadToHeadExplorer";
import RawWinLossRecords from "../../components/RawWinLossRecords";
import PollData from "../../components/PollData";
import WaiverTransactions from "../../components/WaiverTransactions";

const Analytics = () => {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: 4,
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#e6e6e6",
        background: "linear-gradient(135deg, #e6e6e6 0%, #ffffff 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1kR5JwB_aS3irGJySGrrFOmXafrBnnUP_b-81JBWK15k/edit?gid=0#gid=0",
              "_blank",
              "noopener,noreferrer"
            )
          }
          sx={{
            px: 2,
            py: 0.5,
            fontSize: { xs: "0.7rem", sm: "0.8rem" },
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 1.5,
            borderWidth: 1.5,
            "&:hover": {
              borderWidth: 1.5,
              backgroundColor: "rgba(21, 82, 99, 0.04)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Open OG Analytics Spreadsheet
        </Button>
      </Box>

      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
          color: "#155263",
          textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
        }}
      >
        Analytics
      </Typography>

      {/* GOATS and WOATS Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <GoatsAndWoats />
      </Paper>

      {/* Regular Season Heatmap Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RegularSeasonHeatmap />
      </Paper>
      {/* Head-to-Head Explorer Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeadToHeadExplorer />
      </Paper>
      {/* Playoff Stats Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <PlayoffStats />
      </Paper>

      {/* Poll Data Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <PollData />
      </Paper>

      {/* Waiver Transactions Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <WaiverTransactions />
      </Paper>

      {/* Raw Win/Loss Records Panel */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RawWinLossRecords />
      </Paper>
    </Box>
  );
};

export default Analytics;
