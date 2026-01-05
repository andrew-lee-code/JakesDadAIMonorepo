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

  // Helper to get rank color
  const getRankColor = (rank: number, isGoat: boolean) => {
    if (rank === 1) return isGoat ? "#daa520" : "#dc143c";
    if (rank === 2) return isGoat ? "#c0c0c0" : "#ff6b6b";
    return isGoat ? "#cd7f32" : "#ffa07a";
  };

  // Calculate max entries for visual balance
  const getMaxEntries = (category: CategoryResult) =>
    Math.max(category.goats.length, category.woats.length);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Modern Era Toggle */}
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

      {/* Category Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {categories.map((category) => {
          const maxEntries = getMaxEntries(category);

          return (
            <Card
              key={category.category}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "2px solid #e0e0e0",
                backgroundColor: "#ffffff",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  borderColor: "#155263",
                },
              }}
            >
              <CardContent sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Category Title */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "#155263",
                    textAlign: "center",
                    mb: 2,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {category.category}
                </Typography>

                {/* Side-by-side GOATS and WOATS */}
                <Box sx={{ display: "flex", gap: 1.5, flex: 1 }}>
                  {/* GOATS Column */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#155263",
                        textAlign: "center",
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      GOATS
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#155263",
                        borderRadius: 2,
                        p: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        minHeight: maxEntries * 44,
                      }}
                    >
                      {category.goats.map((goat, idx) => (
                        <Box
                          key={`${goat.owner_name}-${idx}`}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "rgba(255,255,255,0.1)",
                            borderRadius: 1,
                            p: 0.75,
                            borderLeft: `3px solid ${getRankColor(goat.rank, true)}`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color: getRankColor(goat.rank, true),
                              minWidth: 16,
                            }}
                          >
                            #{goat.rank}
                          </Typography>
                          <Avatar
                            src={getOwnerAvatarUrl(goat.owner_name)}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Box sx={{ flex: 1, color: "#fff", minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "12px",
                                lineHeight: 1.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {goat.owner_name}
                            </Typography>
                            <Typography sx={{ fontSize: "10px", opacity: 0.85 }}>
                              {goat.displayValue}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* WOATS Column */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#666",
                        textAlign: "center",
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      WOATS
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        p: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        border: "1px solid #e0e0e0",
                        minHeight: maxEntries * 44,
                      }}
                    >
                      {category.woats.map((woat, idx) => (
                        <Box
                          key={`${woat.owner_name}-${idx}`}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "#fff",
                            borderRadius: 1,
                            p: 0.75,
                            borderLeft: `3px solid ${getRankColor(woat.rank, false)}`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color: getRankColor(woat.rank, false),
                              minWidth: 16,
                            }}
                          >
                            #{woat.rank}
                          </Typography>
                          <Avatar
                            src={getOwnerAvatarUrl(woat.owner_name)}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "#333",
                                lineHeight: 1.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {woat.owner_name}
                            </Typography>
                            <Typography sx={{ fontSize: "10px", color: "#666" }}>
                              {woat.displayValue}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default GoatsAndWoats;
