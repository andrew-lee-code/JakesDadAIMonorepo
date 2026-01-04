import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@jakes-dad/shared";
import HardwareGraphs from "../../components/HardwareGraphs";
import { useHardwareBySeason } from "../../hooks/useHardwareByOwner";
import { MODERN_ERA_YEARS, PRE_MODERN_ERA_YEARS } from "../../constants/years";
import { getOwnerAvatarUrl } from "../../utils/imageUtils";

const HardwareStore = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);

  // Fetch year-by-year hardware data (always show all years)
  const {
    data: seasonData,
    isLoading,
    error,
  } = useHardwareBySeason();

  // Helper to capitalize name
  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

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
          🏆 Hardware Hall of Fame 🏆
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
        <Box sx={{ mb: 6 }}>
          <HardwareGraphs modernEraOnly={modernEraOnly} />
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

          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 8,
              }}
            >
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Loading hall of fame data...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              Error loading hall of fame data: {error?.message}
            </Alert>
          )}

          {!isLoading && !error && seasonData && seasonData.length === 0 && (
            <Alert severity="info">No hall of fame data available.</Alert>
          )}

          {!isLoading && !error && seasonData && seasonData.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {seasonData.map((season, index) => {
                // Show section headers for era divisions
                const isFirstModernEra =
                  season.year === Math.max(...MODERN_ERA_YEARS);
                const isFirstPreModernEra =
                  season.year === Math.max(...PRE_MODERN_ERA_YEARS);

                return (
                  <Box key={season.year}>
                    {/* Modern Era Header */}
                    {isFirstModernEra && (
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#155263",
                          mb: 2,
                          mt: index > 0 ? 4 : 0,
                          fontSize: "18px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Modern Era
                      </Typography>
                    )}

                    {/* Pre-Modern Era Header */}
                    {isFirstPreModernEra && (
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#666",
                          mb: 2,
                          mt: 4,
                          fontSize: "18px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Pre-Modern Era
                      </Typography>
                    )}
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

                      {/* Winners Section (Left) */}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          gap: 3,
                          minWidth: 0,
                        }}
                      >
                        {/* Champion */}
                        {season.playoff_champ && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              component="img"
                              src={getOwnerAvatarUrl(season.playoff_champ)}
                              alt={season.playoff_champ}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                flexShrink: 0,
                                objectFit: "cover",
                                border: "3px solid #daa520",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#666",
                                  fontSize: "11px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Champion
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: "#daa520",
                                  fontSize: "15px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {capitalizeName(season.playoff_champ)}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* Reg Season Champ */}
                        {season.reg_szn_champ && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              component="img"
                              src={getOwnerAvatarUrl(season.reg_szn_champ)}
                              alt={season.reg_szn_champ}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                flexShrink: 0,
                                objectFit: "cover",
                                border: "3px solid #daa520",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#666",
                                  fontSize: "11px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Reg Szn Champ
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: "#daa520",
                                  fontSize: "15px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {capitalizeName(season.reg_szn_champ)}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Divider */}
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ display: { xs: "none", md: "block" } }}
                      />

                      {/* Losers Section (Right) */}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          gap: 3,
                          minWidth: 0,
                        }}
                      >
                        {/* Ultimate Loser */}
                        {season.ultimate_loser && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              component="img"
                              src={getOwnerAvatarUrl(season.ultimate_loser)}
                              alt={season.ultimate_loser}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                flexShrink: 0,
                                objectFit: "cover",
                                border: "3px solid #dc143c",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#666",
                                  fontSize: "11px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  whiteSpace: "nowrap",
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
                                {capitalizeName(season.ultimate_loser)}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* Reg Season Loser */}
                        {season.reg_szn_loser && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              component="img"
                              src={getOwnerAvatarUrl(season.reg_szn_loser)}
                              alt={season.reg_szn_loser}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                flexShrink: 0,
                                objectFit: "cover",
                                border: "3px solid #dc143c",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#666",
                                  fontSize: "11px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Reg Szn Loser
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
                                {capitalizeName(season.reg_szn_loser)}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HardwareStore;
