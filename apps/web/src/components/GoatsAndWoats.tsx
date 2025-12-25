import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  Stack,
} from "@jakes-dad/shared";
import { useRecords, useOwners } from "../hooks/useRecords";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { capitalizeName } from "../utils/stringUtils";
import { getOwnerAvatarUrl } from "../utils/imageUtils";
import { MODERN_ERA_YEARS } from "../constants/years";

interface CategoryResult {
  category: string;
  goats: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }>;
  woats: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }>;
}

interface TotalPointsBySeason {
  owner_name: string;
  year: number;
  total_points_scored: number;
}

interface TotalPointsAgainstBySeason {
  owner_name: string;
  year: number;
  total_points_against: number;
}

const GoatsAndWoats: React.FC = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);

  const {
    data: records,
    isLoading: recordsLoading,
    error: recordsError,
  } = useRecords();
  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();
  const {
    data: pointsData,
    isLoading: pointsLoading,
    error: pointsError,
  } = useSupabaseQuery<TotalPointsBySeason>("total_points_by_season");
  const {
    data: pointsAgainstData,
    isLoading: pointsAgainstLoading,
    error: pointsAgainstError,
  } = useSupabaseQuery<TotalPointsAgainstBySeason>(
    "total_points_against_by_season"
  );

  if (
    recordsLoading ||
    ownersLoading ||
    pointsLoading ||
    pointsAgainstLoading
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (recordsError || ownersError || pointsError || pointsAgainstError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load data for GOATS and WOATS
      </Alert>
    );
  }

  if (!records || !owners || !pointsData || !pointsAgainstData) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No data found for GOATS and WOATS
      </Alert>
    );
  }

  // Get current owners (active in 2025)
  const currentOwners = owners.filter(
    (owner) => owner.years_active && owner.years_active.includes(2025)
  );

  // Calculate statistics for each owner
  const ownerStats = currentOwners.map((owner) => {
    const allOwnerRecords = records.filter((r) => r.owner_id === owner.id);

    // Filter records by era if specified
    const ownerRecords = modernEraOnly
      ? allOwnerRecords.filter((record) =>
          MODERN_ERA_YEARS.includes(record.year)
        )
      : allOwnerRecords;

    // Championships (playoff_finish === 1)
    const championships = ownerRecords.filter(
      (r) => r.playoff_finish === 1
    ).length;

    // Regular season championships (reg_szn_finish === 1)
    const regSeasonChamps = ownerRecords.filter(
      (r) => r.reg_szn_finish === 1
    ).length;

    // Win percentage
    const totalWins = ownerRecords.reduce((sum, r) => sum + (r.wins || 0), 0);
    const totalLosses = ownerRecords.reduce(
      (sum, r) => sum + (r.losses || 0),
      0
    );
    const totalGames = totalWins + totalLosses;
    const winPercentage = totalGames > 0 ? (totalWins / totalGames) * 100 : 0;

    // Playoff appearances (playoff_finish is not null and > 0)
    const playoffAppearances = ownerRecords.filter(
      (r) => r.playoff_finish && r.playoff_finish > 0
    ).length;
    const totalSeasons = ownerRecords.length;
    const playoffAppearanceRate =
      totalSeasons > 0 ? (playoffAppearances / totalSeasons) * 100 : 0;

    // Playoff win percentage
    const playoffWins = ownerRecords.reduce(
      (sum, r) => sum + (r.playoff_wins || 0),
      0
    );
    const playoffLosses = ownerRecords.reduce(
      (sum, r) => sum + (r.playoff_losses || 0),
      0
    );
    const totalPlayoffGames = playoffWins + playoffLosses;
    const playoffWinPercentage =
      totalPlayoffGames > 0 ? (playoffWins / totalPlayoffGames) * 100 : 0;

    // Average points scored per season
    const ownerPointsData = pointsData.filter(
      (p) => p.owner_name === owner.name
    );
    const filteredPointsData = modernEraOnly
      ? ownerPointsData.filter((p) => MODERN_ERA_YEARS.includes(p.year))
      : ownerPointsData;

    const totalPoints = filteredPointsData.reduce(
      (sum, p) => sum + p.total_points_scored,
      0
    );
    const seasonsWithData = filteredPointsData.length;
    const avgPointsPerSeason =
      seasonsWithData > 0 ? totalPoints / seasonsWithData : 0;

    // Average points against per season
    const ownerPointsAgainstData = pointsAgainstData.filter(
      (p) => p.owner_name === owner.name
    );
    const filteredPointsAgainstData = modernEraOnly
      ? ownerPointsAgainstData.filter((p) => MODERN_ERA_YEARS.includes(p.year))
      : ownerPointsAgainstData;

    const totalPointsAgainst = filteredPointsAgainstData.reduce(
      (sum, p) => sum + p.total_points_against,
      0
    );
    const seasonsWithAgainstData = filteredPointsAgainstData.length;
    const avgPointsAgainstPerSeason =
      seasonsWithAgainstData > 0
        ? totalPointsAgainst / seasonsWithAgainstData
        : 0;

    return {
      owner_name: capitalizeName(owner.name),
      championships,
      regSeasonChamps,
      winPercentage,
      playoffAppearanceRate,
      playoffWinPercentage,
      avgPointsPerSeason,
      avgPointsAgainstPerSeason,
    };
  });

  // Function to find top 3 ranked GOATS and bottom 3 ranked WOATS for a category (with tie handling)
  const findGoatsAndWoats = (
    category: string,
    getValue: (stats: any) => number,
    formatValue: (value: number) => string
  ): CategoryResult => {
    // Sort all owners by value (descending)
    const sortedOwners = ownerStats
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }))
      .sort((a, b) => b.value - a.value);

    // Assign ranks to GOATs (top performers) - handles ties
    const goatsWithRanks: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }> = [];
    let displayRank: 1 | 2 | 3 = 1;

    for (let i = 0; i < sortedOwners.length && displayRank <= 3; i++) {
      const owner = sortedOwners[i];

      // If this is a new value, update the display rank to current position + 1
      if (i > 0 && owner.value !== sortedOwners[i - 1].value) {
        displayRank = (i + 1) as 1 | 2 | 3;
        if (displayRank > 3) break;
      }

      goatsWithRanks.push({ ...owner, rank: displayRank });
    }

    // Assign ranks to WOATs (bottom performers) - handles ties
    const woatsWithRanks: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }> = [];
    displayRank = 1;

    for (let i = sortedOwners.length - 1; i >= 0 && displayRank <= 3; i--) {
      const owner = sortedOwners[i];

      // If this is a new value, update the display rank
      if (i < sortedOwners.length - 1 && owner.value !== sortedOwners[i + 1].value) {
        displayRank = (sortedOwners.length - i) as 1 | 2 | 3;
        if (displayRank > 3) break;
      }

      woatsWithRanks.unshift({ ...owner, rank: displayRank });
    }

    return { category, goats: goatsWithRanks, woats: woatsWithRanks };
  };

  // Special function for points against where higher = GOAT (worst defense), lower = WOAT (best defense)
  const findGoatsAndWoatsReversed = (
    category: string,
    getValue: (stats: any) => number,
    formatValue: (value: number) => string
  ): CategoryResult => {
    // Sort all owners by value (descending)
    const sortedOwners = ownerStats
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }))
      .sort((a, b) => b.value - a.value);

    // Assign ranks to GOATs (top = worst defense = highest points against) - handles ties
    const goatsWithRanks: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }> = [];
    let displayRank: 1 | 2 | 3 = 1;

    for (let i = 0; i < sortedOwners.length && displayRank <= 3; i++) {
      const owner = sortedOwners[i];

      // If this is a new value, update the display rank to current position + 1
      if (i > 0 && owner.value !== sortedOwners[i - 1].value) {
        displayRank = (i + 1) as 1 | 2 | 3;
        if (displayRank > 3) break;
      }

      goatsWithRanks.push({ ...owner, rank: displayRank });
    }

    // Assign ranks to WOATs (bottom = best defense = lowest points against) - handles ties
    const woatsWithRanks: Array<{ owner_name: string; value: number; displayValue: string; rank: 1 | 2 | 3 }> = [];
    displayRank = 1;

    for (let i = sortedOwners.length - 1; i >= 0 && displayRank <= 3; i--) {
      const owner = sortedOwners[i];

      // If this is a new value, update the display rank
      if (i < sortedOwners.length - 1 && owner.value !== sortedOwners[i + 1].value) {
        displayRank = (sortedOwners.length - i) as 1 | 2 | 3;
        if (displayRank > 3) break;
      }

      woatsWithRanks.unshift({ ...owner, rank: displayRank });
    }

    return { category, goats: goatsWithRanks, woats: woatsWithRanks };
  };

  // Calculate categories
  const categories: CategoryResult[] = [
    findGoatsAndWoats(
      "Ring Gawd",
      (stats) => stats.championships,
      (value) => `${value} ${value === 1 ? "Ring" : "Rings"}`
    ),
    findGoatsAndWoats(
      "Reg Szn Titles",
      (stats) => stats.regSeasonChamps,
      (value) => `${value} ${value === 1 ? "Title" : "Titles"}`
    ),
    findGoatsAndWoats(
      "Win Percentage",
      (stats) => stats.winPercentage,
      (value) => `${value.toFixed(1)}%`
    ),
    findGoatsAndWoats(
      "Playoff Appearance Rate",
      (stats) => stats.playoffAppearanceRate,
      (value) => `${value.toFixed(1)}%`
    ),
    findGoatsAndWoats(
      "Playoff Win Pct",
      (stats) => stats.playoffWinPercentage,
      (value) => `${value.toFixed(1)}%`
    ),
    findGoatsAndWoats(
      "Avg Points Per Season",
      (stats) => stats.avgPointsPerSeason,
      (value) => `${value.toFixed(1)} pts`
    ),
    findGoatsAndWoatsReversed(
      "Worst Defense",
      (stats) => stats.avgPointsAgainstPerSeason,
      (value) => `${value.toFixed(1)} avg pts against`
    ),
  ];

  return (
    <Box sx={{ width: "100%", mb: 6, mx: 0 }}>
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
        GOATS AND WOATS
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 500,
              color: "#155263",
            },
          }}
        />
      </Box>

      <Box sx={{ width: "100%", px: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1, sm: 2 },
            width: "100%",
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.category}
              sx={{
                width: {
                  xs: "calc(50% - 4px)", // 2 per row on mobile
                  md: "calc(25% - 12px)", // 4 per row on desktop
                },
                display: "flex",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  minWidth: 0, // Allows card to shrink below its content width
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      mb: 2,
                      fontWeight: 600,
                      color: "primary.main",
                      fontSize: { xs: "0.9rem", sm: "1.25rem" },
                      lineHeight: { xs: 1.2, sm: 1.4 },
                      minHeight: { xs: "2.4rem", sm: "auto" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {category.category}
                  </Typography>

                  {/* GOATS Box */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: "#155263",
                        textAlign: "center",
                      }}
                    >
                      🐐 GOAT{category.goats.length > 1 ? "S" : ""}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#155263",
                        borderRadius: "12px",
                        padding: { xs: "10px", sm: "14px" },
                      }}
                    >
                      <Stack direction="column" spacing={{ xs: 1, sm: 1.25 }}>
                        {[1, 2, 3].map((rank) => {
                          const goatsForRank = category.goats.filter(g => g.rank === rank);
                          if (goatsForRank.length === 0) return null;

                          const rankText = rank === 1 ? "1st Place" : rank === 2 ? "2nd Place" : "3rd Place";
                          const isFirstPlace = rank === 1;

                          return (
                            <Box
                              key={rank}
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: isFirstPlace ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "10px",
                                padding: { xs: "8px", sm: "10px" },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                  fontWeight: 700,
                                  color: isFirstPlace ? "#FFD700" : "#fff",
                                  mb: 0.5,
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {rankText}
                                {goatsForRank.length > 1 && (
                                  <span style={{ opacity: 0.8, fontStyle: "italic", fontWeight: 400, marginLeft: "4px" }}>
                                    ({goatsForRank.length}-way tie)
                                  </span>
                                )}
                              </Typography>
                              <Stack direction="column" spacing={0.5}>
                                {goatsForRank.map(goat => (
                                  <Box
                                    key={goat.owner_name}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: { xs: 1, sm: 1.5 },
                                      padding: { xs: "4px", sm: "6px" },
                                    }}
                                  >
                                    <Avatar
                                      src={getOwnerAvatarUrl(goat.owner_name)}
                                      sx={{
                                        width: { xs: isFirstPlace ? 32 : 28, sm: isFirstPlace ? 36 : 32 },
                                        height: { xs: isFirstPlace ? 32 : 28, sm: isFirstPlace ? 36 : 32 },
                                      }}
                                    />
                                    <Box sx={{ flex: 1, color: "#fff" }}>
                                      <Typography
                                        sx={{
                                          fontWeight: isFirstPlace ? 600 : 500,
                                          fontSize: {
                                            xs: isFirstPlace ? "0.875rem" : "0.75rem",
                                            sm: isFirstPlace ? "1rem" : "0.875rem",
                                          },
                                          lineHeight: 1.2,
                                        }}
                                      >
                                        {goat.owner_name}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                          opacity: 0.9,
                                          lineHeight: 1.1,
                                        }}
                                      >
                                        {goat.displayValue}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  </Box>

                  {/* WOATS Box */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      🗑️ WOAT{category.woats.length > 1 ? "S" : ""}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        padding: { xs: "10px", sm: "14px" },
                      }}
                    >
                      <Stack direction="column" spacing={{ xs: 1, sm: 1.25 }}>
                        {[1, 2, 3].map((rank) => {
                          const woatsForRank = category.woats.filter(w => w.rank === rank);
                          if (woatsForRank.length === 0) return null;

                          const rankText = rank === 1 ? "1st Place" : rank === 2 ? "2nd Place" : "3rd Place";
                          const isFirstPlace = rank === 1;

                          return (
                            <Box
                              key={rank}
                              sx={{
                                backgroundColor: "#f5f5f5",
                                border: isFirstPlace ? "2px solid #FFD700" : "1px solid #e0e0e0",
                                borderRadius: "10px",
                                padding: { xs: "8px", sm: "10px" },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                  fontWeight: 700,
                                  color: isFirstPlace ? "#155263" : "#666",
                                  mb: 0.5,
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {rankText}
                                {woatsForRank.length > 1 && (
                                  <span style={{ opacity: 0.8, fontStyle: "italic", fontWeight: 400, marginLeft: "4px" }}>
                                    ({woatsForRank.length}-way tie)
                                  </span>
                                )}
                              </Typography>
                              <Stack direction="column" spacing={0.5}>
                                {woatsForRank.map(woat => (
                                  <Box
                                    key={woat.owner_name}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: { xs: 1, sm: 1.5 },
                                      padding: { xs: "4px", sm: "6px" },
                                    }}
                                  >
                                    <Avatar
                                      src={getOwnerAvatarUrl(woat.owner_name)}
                                      sx={{
                                        width: { xs: isFirstPlace ? 32 : 28, sm: isFirstPlace ? 36 : 32 },
                                        height: { xs: isFirstPlace ? 32 : 28, sm: isFirstPlace ? 36 : 32 },
                                      }}
                                    />
                                    <Box sx={{ flex: 1, color: "#000" }}>
                                      <Typography
                                        sx={{
                                          fontWeight: isFirstPlace ? 600 : 500,
                                          fontSize: {
                                            xs: isFirstPlace ? "0.875rem" : "0.75rem",
                                            sm: isFirstPlace ? "1rem" : "0.875rem",
                                          },
                                          lineHeight: 1.2,
                                        }}
                                      >
                                        {woat.owner_name}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                          opacity: 0.9,
                                          lineHeight: 1.1,
                                        }}
                                      >
                                        {woat.displayValue}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GoatsAndWoats;
