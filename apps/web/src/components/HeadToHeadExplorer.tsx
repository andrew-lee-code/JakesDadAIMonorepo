import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
} from "@jakes-dad/shared";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { useOwners } from "../hooks/useRecords";
import { capitalizeName } from "../utils/stringUtils";
import { getOwnerAvatarUrl } from "../utils/imageUtils";
import { type EraKey } from "../constants/years";
import { EraSelector } from "./EraSelector";
import { filterByEras } from "../utils/eraUtils";

interface MatchupRow {
  id: number;
  year: number;
  week: number;
  winner_owner_id: number;
  loser_owner_id: number;
  winner_score: number;
  loser_score: number;
  playoffs: boolean;
}

const HeadToHeadExplorer: React.FC = () => {
  const [owner1Id, setOwner1Id] = useState<number | "">("");
  const [owner2Id, setOwner2Id] = useState<number | "">("");
  const [selectedEras, setSelectedEras] = useState<Set<EraKey>>(
    new Set(["hppr"])
  );

  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();
  const {
    data: matchups,
    isLoading: matchupsLoading,
    error: matchupsError,
  } = useSupabaseQuery<MatchupRow>("matchups");

  const currentOwners = useMemo(() => {
    if (!owners) return [];
    return owners
      .filter(
        (owner) => owner.years_active && owner.years_active.includes(2025)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [owners]);

  const headToHeadStats = useMemo(() => {
    if (
      !matchups ||
      !owners ||
      !owner1Id ||
      !owner2Id ||
      owner1Id === owner2Id
    ) {
      return null;
    }

    const owner1 = owners.find((o) => o.id === owner1Id);
    const owner2 = owners.find((o) => o.id === owner2Id);

    if (!owner1 || !owner2) return null;

    // Find all matchups between these two owners
    const allHeadToHeadMatchups = matchups.filter(
      (m) =>
        (m.winner_owner_id === owner1Id && m.loser_owner_id === owner2Id) ||
        (m.winner_owner_id === owner2Id && m.loser_owner_id === owner1Id)
    );

    // Filter by selected eras
    const headToHeadMatchups = filterByEras(allHeadToHeadMatchups, selectedEras);

    // Calculate wins for owner1
    const owner1Wins = headToHeadMatchups.filter(
      (m) => m.winner_owner_id === owner1Id
    ).length;
    const owner2Wins = headToHeadMatchups.filter(
      (m) => m.winner_owner_id === owner2Id
    ).length;
    const totalGames = headToHeadMatchups.length;
    const owner1WinPercentage =
      totalGames > 0 ? (owner1Wins / totalGames) * 100 : 0;

    // Calculate total points for each owner
    let owner1TotalPoints = 0;
    let owner2TotalPoints = 0;

    headToHeadMatchups.forEach((m) => {
      if (m.winner_owner_id === owner1Id) {
        owner1TotalPoints += m.winner_score;
        owner2TotalPoints += m.loser_score;
      } else {
        owner1TotalPoints += m.loser_score;
        owner2TotalPoints += m.winner_score;
      }
    });

    const avgPointsOwner1 = totalGames > 0 ? owner1TotalPoints / totalGames : 0;
    const avgPointsOwner2 = totalGames > 0 ? owner2TotalPoints / totalGames : 0;

    // Calculate regular season vs playoff breakdown
    const regularSeasonMatchups = headToHeadMatchups.filter((m) => !m.playoffs);
    const playoffMatchups = headToHeadMatchups.filter((m) => m.playoffs);

    // Calculate wins by game type for owner1
    const owner1RegularSeasonWins = regularSeasonMatchups.filter(
      (m) => m.winner_owner_id === owner1Id
    ).length;
    const owner1PlayoffWins = playoffMatchups.filter(
      (m) => m.winner_owner_id === owner1Id
    ).length;
    const owner2RegularSeasonWins = regularSeasonMatchups.filter(
      (m) => m.winner_owner_id === owner2Id
    ).length;
    const owner2PlayoffWins = playoffMatchups.filter(
      (m) => m.winner_owner_id === owner2Id
    ).length;

    return {
      owner1: {
        name: capitalizeName(owner1.name),
        avatar: getOwnerAvatarUrl(owner1.name),
        wins: owner1Wins,
        losses: owner2Wins,
        winPercentage: owner1WinPercentage,
        avgPoints: avgPointsOwner1,
        regularSeasonRecord: `${owner1RegularSeasonWins}-${owner2RegularSeasonWins}`,
        playoffRecord: `${owner1PlayoffWins}-${owner2PlayoffWins}`,
      },
      owner2: {
        name: capitalizeName(owner2.name),
        avatar: getOwnerAvatarUrl(owner2.name),
        wins: owner2Wins,
        losses: owner1Wins,
        winPercentage: 100 - owner1WinPercentage,
        avgPoints: avgPointsOwner2,
        regularSeasonRecord: `${owner2RegularSeasonWins}-${owner1RegularSeasonWins}`,
        playoffRecord: `${owner2PlayoffWins}-${owner1PlayoffWins}`,
      },
      totalGames,
      regularSeasonGames: regularSeasonMatchups.length,
      playoffGames: playoffMatchups.length,
    };
  }, [matchups, owners, owner1Id, owner2Id, selectedEras]);

  if (ownersLoading || matchupsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (ownersError || matchupsError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load head-to-head data
      </Alert>
    );
  }

  if (!owners || !matchups) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No head-to-head data found
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%", mb: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 700,
          color: "#155263",
          fontSize: { xs: "2rem", sm: "2.5rem" },
        }}
      >
        HEAD-TO-HEAD EXPLORER
      </Typography>

      {/* Era Selector */}
      <EraSelector
        selectedEras={selectedEras}
        onSelectionChange={setSelectedEras}
      />

      {/* Owner Selection */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel>Select Owner 1</InputLabel>
          <Select
            value={owner1Id}
            onChange={(e) => setOwner1Id(e.target.value as number)}
            label="Select Owner 1"
          >
            {currentOwners.map((owner) => (
              <MenuItem key={owner.id} value={owner.id}>
                {capitalizeName(owner.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#155263",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          VS
        </Typography>

        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel>Select Owner 2</InputLabel>
          <Select
            value={owner2Id}
            onChange={(e) => setOwner2Id(e.target.value as number)}
            label="Select Owner 2"
          >
            {currentOwners.map((owner) => (
              <MenuItem key={owner.id} value={owner.id}>
                {capitalizeName(owner.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Results */}
      {headToHeadStats && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {/* Owner 1 Stats */}
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 3,
                border:
                  headToHeadStats.owner1.wins > headToHeadStats.owner1.losses
                    ? "3px solid #DAA520"
                    : "3px solid #DC143C",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <Avatar
                src={headToHeadStats.owner1.avatar}
                sx={{
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  mx: "auto",
                  mb: 2,
                  border: "3px solid #155263",
                }}
              >
                {headToHeadStats.owner1.name.charAt(0)}
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#155263",
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                {headToHeadStats.owner1.name}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color:
                    headToHeadStats.owner1.wins > headToHeadStats.owner1.losses
                      ? "#DAA520"
                      : "#DC143C",
                  mb: 1,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                }}
              >
                {headToHeadStats.owner1.wins}-{headToHeadStats.owner1.losses}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  mb: 2,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                {headToHeadStats.owner1.winPercentage.toFixed(1)}% Win Rate
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  mb: 0.5,
                }}
              >
                Regular Season: {headToHeadStats.owner1.regularSeasonRecord}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  mb: 1,
                }}
              >
                Playoffs: {headToHeadStats.owner1.playoffRecord}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Avg: {headToHeadStats.owner1.avgPoints.toFixed(1)} pts
              </Typography>
            </Paper>
          </Box>

          {/* VS Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: { xs: "100%", md: "auto" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#155263",
                fontSize: { xs: "1.5rem", sm: "2rem" },
                textAlign: "center",
              }}
            >
              {headToHeadStats.totalGames} Total Games
            </Typography>
          </Box>

          {/* Owner 2 Stats */}
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 3,
                border:
                  headToHeadStats.owner2.wins > headToHeadStats.owner2.losses
                    ? "3px solid #DAA520"
                    : "3px solid #DC143C",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <Avatar
                src={headToHeadStats.owner2.avatar}
                sx={{
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  mx: "auto",
                  mb: 2,
                  border: "3px solid #155263",
                }}
              >
                {headToHeadStats.owner2.name.charAt(0)}
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#155263",
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                {headToHeadStats.owner2.name}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color:
                    headToHeadStats.owner2.wins > headToHeadStats.owner2.losses
                      ? "#DAA520"
                      : "#DC143C",
                  mb: 1,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                }}
              >
                {headToHeadStats.owner2.wins}-{headToHeadStats.owner2.losses}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  mb: 2,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                {headToHeadStats.owner2.winPercentage.toFixed(1)}% Win Rate
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  mb: 0.5,
                }}
              >
                Regular Season: {headToHeadStats.owner2.regularSeasonRecord}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  mb: 1,
                }}
              >
                Playoffs: {headToHeadStats.owner2.playoffRecord}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Avg: {headToHeadStats.owner2.avgPoints.toFixed(1)} pts
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}

      {/* Prompt when no owners selected */}
      {(!owner1Id || !owner2Id || owner1Id === owner2Id) && (
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#155263",
              fontStyle: "italic",
            }}
          >
            Select two different owners to see their head-to-head record
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HeadToHeadExplorer;
