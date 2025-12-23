import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@jakes-dad/shared";
import {
  useHardwareByOwnerFiltered,
  useLosersByOwnerFiltered,
} from "../hooks/useHardwareByOwner";
import { MODERN_ERA_YEARS, ALL_YEARS } from "../constants/years";

const HardwareGraphs = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);

  // Get filtered data based on toggle
  const {
    data: hardwareData,
    isLoading: hardwareLoading,
    error: hardwareError,
  } = useHardwareByOwnerFiltered(modernEraOnly ? MODERN_ERA_YEARS : ALL_YEARS);

  const {
    data: losersData,
    isLoading: losersLoading,
    error: losersError,
  } = useLosersByOwnerFiltered(modernEraOnly ? MODERN_ERA_YEARS : ALL_YEARS);

  const isLoading = hardwareLoading || losersLoading;
  const error = hardwareError || losersError;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading hardware data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading hardware data: {error?.message}
      </Alert>
    );
  }

  if (
    (!hardwareData || hardwareData.length === 0) &&
    (!losersData || losersData.length === 0)
  ) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No data found.
      </Alert>
    );
  }

  // Transform data for the charts
  const hardwareChartData =
    hardwareData?.map((owner) => ({
      name:
        owner.owner_name.charAt(0).toUpperCase() + owner.owner_name.slice(1),
      "Playoff Champ": owner.num_playoff_championships,
      "Reg Szn Champ": owner.num_reg_szn_championships,
    })) || [];

  const losersChartData =
    losersData
      ?.map((owner) => ({
        name:
          owner.owner_name.charAt(0).toUpperCase() + owner.owner_name.slice(1),
        A_Ultimate_Loser: owner.num_ultimate_losers,
        B_Reg_Szn_Loser: owner.num_reg_szn_losers,
      }))
      .sort((a, b) => b["A_Ultimate_Loser"] - a["A_Ultimate_Loser"]) || [];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
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
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "#155263",
              }}
            >
              Modern Era Only
            </Typography>
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 4, lg: 6 },
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {/* Hardware Leaders Chart */}
        <Box sx={{ flex: 1, minWidth: 0, maxWidth: "100%" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 700,
              color: "#155263",
              textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
            }}
          >
            Hardware Leaders
          </Typography>

          <Box sx={{ width: "100%", height: 400, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hardwareChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 80,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#155263" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#155263" }}
                  domain={[0, "dataMax + 1"]}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "14px",
                    color: "#155263",
                  }}
                />
                <Bar
                  dataKey="Playoff Champ"
                  fill="#B8860B"
                  name="Champ"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="Reg Szn Champ"
                  fill="#DAA520"
                  name="Reg Szn Champ"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Biggest Losers Chart */}
        <Box sx={{ flex: 1, minWidth: 0, maxWidth: "100%" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 700,
              color: "#155263",
              textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
            }}
          >
            Biggest Losers
          </Typography>

          <Box sx={{ width: "100%", height: 400, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={losersChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 80,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#155263" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#155263" }}
                  domain={[0, "dataMax + 1"]}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "14px",
                    color: "#155263",
                  }}
                  formatter={(value) => {
                    if (value === "A_Ultimate_Loser") return "Ultimate Loser";
                    if (value === "B_Reg_Szn_Loser") return "Reg Szn Loser";
                    return value;
                  }}
                />
                <Bar
                  dataKey="A_Ultimate_Loser"
                  fill="#8B0000"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="B_Reg_Szn_Loser"
                  fill="#DC143C"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HardwareGraphs;
