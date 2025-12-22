import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import { usePlayoffStats } from "../hooks/usePlayoffStats";

const PlayoffStats = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);
  const {
    data: playoffData,
    isLoading,
    error,
  } = usePlayoffStats(modernEraOnly);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading playoff stats: {error.message}
      </Alert>
    );
  }

  const { appearances, finishes, statsTable } = playoffData;

  // Get color for win percentage cell
  const getWinPercentageColor = (percentage: number): string => {
    if (percentage >= 0.7) return "#1b5e20"; // Dark green
    if (percentage >= 0.6) return "#2e7d32"; // Medium-dark green
    if (percentage >= 0.5) return "#4caf50"; // Medium green
    if (percentage >= 0.4) return "#8bc34a"; // Light green
    if (percentage >= 0.3) return "#ffc107"; // Amber
    return "#f44336"; // Red
  };

  // Get color for championship rate cell
  const getChampionshipRateColor = (rate: number): string => {
    if (rate >= 0.5) return "#1b5e20"; // Dark green
    if (rate >= 0.33) return "#2e7d32"; // Medium-dark green
    if (rate >= 0.25) return "#4caf50"; // Medium green
    if (rate >= 0.15) return "#8bc34a"; // Light green
    if (rate > 0) return "#ffc107"; // Amber
    return "#b71c1c"; // Dark red
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 700,
          color: "#155263",
          fontSize: { xs: "2rem", sm: "2.5rem" },
        }}
      >
        PLAYOFF STATS
      </Typography>

      {/* Modern Era Toggle */}
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: { xs: 2, md: 4 } }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={modernEraOnly}
              onChange={(e) => setModernEraOnly(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#155263",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#155263",
                },
              }}
            />
          }
          label="Modern Era Only"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontWeight: 600,
              color: "#155263",
            },
          }}
        />
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 4 },
          mb: { xs: 1.5, md: 6 },
        }}
      >
        {/* Playoff Appearances Chart */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#155263",
              mb: { xs: 1, md: 2 },
            }}
          >
            Playoff Appearances
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={appearances}
              margin={{ top: 20, right: 15, left: 15, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="owner_name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Bar dataKey="appearances" fill="#2798b7" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Playoff Finishes Chart */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#155263",
              mb: { xs: 1, md: 2 },
            }}
          >
            Playoff Finishes
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={finishes}
              margin={{ top: 20, right: 15, left: 15, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="owner_name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Legend />
              <Bar
                dataKey="first_place"
                stackId="a"
                fill="#fbc02d"
                name="1st Place"
              />
              <Bar
                dataKey="second_place"
                stackId="a"
                fill="#9e9e9e"
                name="2nd Place"
              />
              <Bar
                dataKey="third_place"
                stackId="a"
                fill="#ff9800"
                name="3rd Place"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Stats Table */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 4px 12px rgba(21, 82, 99, 0.15)",
            borderRadius: 2,
          }}
        >
          <Table sx={{ minWidth: { xs: 450, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    padding: { xs: "8px 4px", sm: "16px" },
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#f5f5f5",
                    borderRight: "2px solid #e0e0e0",
                    zIndex: 10,
                    width: { xs: "80px", sm: "120px" },
                    minWidth: { xs: "80px", sm: "120px" },
                    maxWidth: { xs: "80px", sm: "120px" },
                  }}
                >
                  OWNER
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.6rem", sm: "0.875rem" },
                    padding: { xs: "6px 4px", sm: "16px" },
                    borderRight: "1px solid #e0e0e0",
                    width: { xs: "50px", sm: "80px" },
                  }}
                >
                  GAMES
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.6rem", sm: "0.875rem" },
                    padding: { xs: "8px 2px", sm: "16px" },
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  W
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.6rem", sm: "0.875rem" },
                    padding: { xs: "8px 2px", sm: "16px" },
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  L
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.6rem", sm: "0.875rem" },
                    padding: { xs: "8px 2px", sm: "16px" },
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  WIN %
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    fontSize: { xs: "0.5rem", sm: "0.875rem" },
                    padding: { xs: "8px 2px", sm: "16px" },
                  }}
                >
                  CHAMP %
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statsTable.map((row, index) => (
                <TableRow
                  key={row.owner_name}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fafafa",
                    },
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#155263",
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      padding: { xs: "8px 4px", sm: "16px" },
                      position: "sticky",
                      left: 0,
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                      borderRight: "2px solid #e0e0e0",
                      zIndex: 9,
                      width: { xs: "80px", sm: "120px" },
                      minWidth: { xs: "80px", sm: "120px" },
                      maxWidth: { xs: "80px", sm: "120px" },
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    {row.owner_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      padding: { xs: "6px 4px", sm: "16px" },
                      borderRight: "1px solid #e0e0e0",
                      width: { xs: "50px", sm: "80px" },
                    }}
                  >
                    {row.total_games}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      padding: { xs: "8px 2px", sm: "16px" },
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {row.wins}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      padding: { xs: "8px 2px", sm: "16px" },
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {row.losses}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: getWinPercentageColor(
                        row.win_percentage
                      ),
                      color: row.win_percentage >= 0.4 ? "#ffffff" : "#000000",
                      fontWeight: 600,
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      padding: { xs: "8px 2px", sm: "16px" },
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {(row.win_percentage * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: getChampionshipRateColor(
                        row.championship_rate
                      ),
                      color:
                        row.championship_rate >= 0.15 ? "#ffffff" : "#000000",
                      fontWeight: 600,
                      fontSize: { xs: "0.6rem", sm: "0.875rem" },
                      padding: { xs: "8px 2px", sm: "16px" },
                    }}
                  >
                    {row.championship_rate > 0
                      ? (row.championship_rate * 100).toFixed(0)
                      : 0}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PlayoffStats;
