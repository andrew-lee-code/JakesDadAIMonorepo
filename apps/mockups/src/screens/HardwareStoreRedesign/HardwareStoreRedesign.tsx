import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@jakes-dad/shared";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { hardwareStoreData } from "../../data/mockData";

const HardwareStoreRedesign = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);

  // Transform data for charts
  const hardwareChartData = hardwareStoreData.champions.map((owner) => ({
    name: owner.owner_name,
    Championships: owner.num_playoff_championships,
    "Reg Season": owner.num_reg_szn_championships,
  }));

  const losersChartData = hardwareStoreData.losers
    .map((owner) => ({
      name: owner.owner_name,
      "Ultimate Loser": owner.num_ultimate_losers,
      "Reg Szn Loser": owner.num_reg_szn_losers,
    }))
    .sort((a, b) => b["Ultimate Loser"] - a["Ultimate Loser"]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Simple Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "28px", md: "40px" },
            mb: 1,
          }}
        >
          🏆 Hardware Hall of Fame
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Celebrating excellence and honoring failure
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

        {/* Bar Charts Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 3,
            mb: 6,
          }}
        >
          {/* Champions Chart */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#155263",
                mb: 3,
                textAlign: "center",
              }}
            >
              Champions
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hardwareChartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    tick={{ fill: "#666", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} />
                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "10px",
                    }}
                  />
                  <Bar
                    dataKey="Championships"
                    fill="#c5901c"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Reg Season"
                    fill="#daa520"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* Losers Chart */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#155263",
                mb: 3,
                textAlign: "center",
              }}
            >
              Biggest Losers
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={losersChartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    tick={{ fill: "#666", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} />
                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "10px",
                    }}
                  />
                  <Bar
                    dataKey="Ultimate Loser"
                    fill="#b91c1c"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Reg Szn Loser"
                    fill="#dc143c"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Year-by-Year Hall of Fame */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#155263",
              mb: 3,
              textAlign: "center",
            }}
          >
            Year-by-Year Hall of Fame
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {hardwareStoreData.yearByYear.map((season) => (
              <Card
                key={season.year}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "flex-start", md: "center" },
                      gap: 3,
                    }}
                  >
                    {/* Year Badge */}
                    <Chip
                      label={season.year}
                      sx={{
                        backgroundColor: "#155263",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "16px",
                        minWidth: "70px",
                        height: "36px",
                      }}
                    />

                    {/* Champion */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={season.champion.avatar}
                        alt={season.champion.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          objectFit: "cover",
                          border: "2px solid #daa520",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "20px",
                          flexShrink: 0,
                          ml: -1,
                        }}
                      >
                        🏆
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#666",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Champion
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#155263",
                            fontSize: "15px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.champion.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#999",
                            fontSize: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.champion.teamName}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Divider (hidden on mobile) */}
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ display: { xs: "none", md: "block" } }}
                    />

                    {/* Ultimate Loser */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={season.loser.avatar}
                        alt={season.loser.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          objectFit: "cover",
                          border: "2px solid #dc143c",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "20px",
                          flexShrink: 0,
                          ml: -1,
                        }}
                      >
                        💀
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#666",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Ultimate Loser
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#dc143c",
                            fontSize: "15px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.loser.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#999",
                            fontSize: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.loser.teamName}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Divider (hidden on mobile) */}
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ display: { xs: "none", md: "block" } }}
                    />

                    {/* Reg Season Champ */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={season.regularSeasonChamp.avatar}
                        alt={season.regularSeasonChamp.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          objectFit: "cover",
                          border: "2px solid #155263",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "18px",
                          flexShrink: 0,
                          ml: -1,
                        }}
                      >
                        ⭐
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#666",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Reg Season Champ
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#155263",
                            fontSize: "15px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.regularSeasonChamp.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#999",
                            fontSize: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.regularSeasonChamp.teamName}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Divider (hidden on mobile) */}
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ display: { xs: "none", md: "block" } }}
                    />

                    {/* Reg Season Loser */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={season.regularSeasonLoser.avatar}
                        alt={season.regularSeasonLoser.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          objectFit: "cover",
                          border: "2px solid #999",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "18px",
                          flexShrink: 0,
                          ml: -1,
                        }}
                      >
                        😔
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#666",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Reg Season Loser
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#666",
                            fontSize: "15px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.regularSeasonLoser.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#999",
                            fontSize: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {season.regularSeasonLoser.teamName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Optional Note */}
                  {season.note && (
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid #f0f0f0",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#666",
                          fontStyle: "italic",
                          fontSize: "12px",
                        }}
                      >
                        💡 {season.note}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 6, mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#999",
              fontSize: "12px",
            }}
          >
            💡 This is a UX mockup - not connected to live data
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HardwareStoreRedesign;
