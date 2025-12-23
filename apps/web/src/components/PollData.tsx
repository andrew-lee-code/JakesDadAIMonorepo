import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  FormControlLabel,
  Switch,
  useMediaQuery,
  useTheme,
} from "@jakes-dad/shared";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ErrorBar,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { usePollData } from "../hooks/usePollData";

const PollData = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [includeNflBot, setIncludeNflBot] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: pollData,
    rawVoteData,
    isLoading,
    error,
  } = usePollData(selectedYear, includeNflBot);

  // Generate year options (only 2025)
  const yearOptions = [2025];

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
        Error loading poll data: {error.message}
      </Alert>
    );
  }

  if (!pollData || pollData.length === 0) {
    return (
      <Box>
        <Box sx={{ textAlign: "center", mb: 3 }}>
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
            POLL DATA
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {yearOptions.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={includeNflBot}
                  onChange={(e) => setIncludeNflBot(e.target.checked)}
                  size="small"
                />
              }
              label="Include NFL Bot Rankings"
              sx={{ fontSize: "0.875rem" }}
            />
          </Box>
        </Box>
        <Alert severity="info">No poll data found for {selectedYear}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 3 }}>
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
          POLL DATA
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={includeNflBot}
                onChange={(e) => setIncludeNflBot(e.target.checked)}
                size="small"
              />
            }
            label="Include NFL Bot Rankings"
            sx={{ fontSize: "0.875rem" }}
          />
        </Box>
      </Box>
      <br />
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 500,
          color: "#155263",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Median Preseason Poll Ranking By Owner
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: "#666",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Median preseason poll rankings with standard deviation error bars for{" "}
        {selectedYear}
      </Typography>
      <Box sx={{ width: "100%", height: isMobile ? 280 : 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={pollData}
            margin={{
              top: isMobile ? 10 : 20,
              right: isMobile ? 2 : 30,
              left: isMobile ? 15 : 20,
              bottom: isMobile ? 40 : 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }}
              angle={isMobile ? -90 : -45}
              textAnchor="end"
              height={isMobile ? 60 : 80}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 8 : 12, fill: "#666" }}
              label={{
                value: isMobile ? "Med" : "Median Rating",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: isMobile ? "10px" : "12px",
                },
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "#155263",
                        }}
                      >
                        {label}
                      </p>
                      <p style={{ margin: "4px 0 0 0", color: "#333" }}>
                        Median: {data.median}
                      </p>
                      <p style={{ margin: "4px 0 0 0", color: "#666" }}>
                        Average: {data.average}
                        <br />
                        Std Dev: {data.standardDeviation}
                        <br />
                        Range: {data.min} - {data.max}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="median" fill="#155263" radius={[4, 4, 0, 0]}>
              <ErrorBar
                dataKey="standardDeviation"
                width={4}
                stroke="#666"
                strokeWidth={2}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Raw Votes Stacked Bar Chart */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 500,
          color: "#155263",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Raw Votes by Owner
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#666",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Shows the raw rankings given to each owner for {selectedYear}.
        <br />
        Short total stack = positive league sentiment.
        <br />
        Large individual bar = hater.
        <br />
        Small individual bar = fan.
      </Typography>
      <Box sx={{ width: "100%", height: isMobile ? 280 : 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={rawVoteData}
            margin={{
              top: isMobile ? 10 : 20,
              right: isMobile ? 2 : 30,
              left: isMobile ? 15 : 20,
              bottom: isMobile ? 50 : 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }}
              angle={isMobile ? -90 : -45}
              textAnchor="end"
              height={isMobile ? 70 : 80}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 8 : 12, fill: "#666" }}
              label={{
                value: "Sum of All Rankings",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: isMobile ? "10px" : "12px",
                },
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "#155263",
                        }}
                      >
                        {label}
                      </p>
                      {payload.map((entry, index) => (
                        <p
                          key={index}
                          style={{ margin: "4px 0", color: entry.color }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "12px",
                              height: "12px",
                              backgroundColor: entry.color,
                              marginRight: "8px",
                            }}
                          ></span>
                          {entry.dataKey}: {entry.value}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Generate bars for each voter dynamically */}
            {rawVoteData &&
              rawVoteData.length > 0 &&
              Object.keys(rawVoteData[0])
                .filter((key) => key !== "name")
                .map((voterName, index) => {
                  // Use gold for NFL Fantasy Bot, varying shades of blue for owners
                  const getVoterColor = (name: string, index: number) => {
                    if (name === "NFL Fantasy Bot") {
                      return "#FFD700"; // Gold
                    }
                    // Truly distinct colors - no similar shades
                    const distinctColors = [
                      "#1976D2", // Blue
                      "#CDDC39", // Lime Green (replacing forest green for Andrew/Justin)
                      "#F57C00", // Orange
                      "#7B1FA2", // Purple
                      "#D32F2F", // Red
                      "#795548", // Brown
                      "#607D8B", // Blue Grey
                      "#FF5722", // Deep Orange
                      "#3F51B5", // Indigo
                      "#00BCD4", // Cyan
                      "#E91E63", // Pink
                      "#009688", // Teal
                      "#9C27B0", // Magenta
                      "#FF9800", // Amber
                      "#4CAF50", // Light Green (different from lime green)
                      "#673AB7", // Deep Purple
                    ];
                    return distinctColors[index % distinctColors.length];
                  };

                  return (
                    <Bar
                      key={voterName}
                      dataKey={voterName}
                      stackId="votes"
                      fill={getVoterColor(voterName, index)}
                    />
                  );
                })}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default PollData;
