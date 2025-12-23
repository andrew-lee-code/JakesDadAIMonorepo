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
  goats: Array<{ owner_name: string; value: number; displayValue: string }>;
  woats: Array<{ owner_name: string; value: number; displayValue: string }>;
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

  // Function to find GOATS and WOATS for a category
  const findGoatsAndWoats = (
    category: string,
    getValue: (stats: any) => number,
    formatValue: (value: number) => string
  ): CategoryResult => {
    const values = ownerStats.map((stats) => getValue(stats));
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const goats = ownerStats
      .filter((stats) => getValue(stats) === maxValue)
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }));

    const woats = ownerStats
      .filter((stats) => getValue(stats) === minValue)
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }));

    return { category, goats, woats };
  };

  // Special function for points against where higher = GOAT, lower = WOAT
  const findGoatsAndWoatsReversed = (
    category: string,
    getValue: (stats: any) => number,
    formatValue: (value: number) => string
  ): CategoryResult => {
    const values = ownerStats.map((stats) => getValue(stats));
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    // Reversed: higher values are GOATS, lower values are WOATS
    const goats = ownerStats
      .filter((stats) => getValue(stats) === maxValue)
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }));

    const woats = ownerStats
      .filter((stats) => getValue(stats) === minValue)
      .map((stats) => ({
        owner_name: stats.owner_name,
        value: getValue(stats),
        displayValue: formatValue(getValue(stats)),
      }));

    return { category, goats, woats };
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

  const OwnerChip: React.FC<{
    ownerName: string;
    displayValue: string;
    isGoat: boolean;
  }> = ({ ownerName, displayValue, isGoat }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isGoat ? "gold" : "#ff6b6b",
        color: isGoat ? "#000" : "#fff",
        borderRadius: "16px",
        padding: { xs: "6px 8px", sm: "10px 16px" },
        minWidth: { xs: "100px", sm: "180px" },
        maxWidth: { xs: "100%", sm: "none" },
        width: { xs: "100%", sm: "auto" },
        gap: { xs: 1, sm: 1.5 },
      }}
    >
      <Avatar
        src={getOwnerAvatarUrl(ownerName)}
        sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.7rem", sm: "0.9rem" },
            lineHeight: 1.2,
          }}
        >
          {ownerName}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.6rem", sm: "0.75rem" },
            opacity: 0.9,
            lineHeight: 1.1,
          }}
        >
          {displayValue}
        </Typography>
      </Box>
    </Box>
  );

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

                  {/* GOATS */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: "#DAA520",
                        textAlign: "center",
                      }}
                    >
                      🐐 GOAT{category.goats.length > 1 ? "S" : ""}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      {category.goats.map((goat) => (
                        <OwnerChip
                          key={goat.owner_name}
                          ownerName={goat.owner_name}
                          displayValue={goat.displayValue}
                          isGoat={true}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* WOATS */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: "#ff6b6b",
                        textAlign: "center",
                      }}
                    >
                      🗑️ WOAT{category.woats.length > 1 ? "S" : ""}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      {category.woats.map((woat) => (
                        <OwnerChip
                          key={woat.owner_name}
                          ownerName={woat.owner_name}
                          displayValue={woat.displayValue}
                          isGoat={false}
                        />
                      ))}
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
