import { useMemo } from "react";
import { useRecords, useOwners } from "./useRecords";
import { MODERN_ERA_YEARS } from "../constants/years";

// Function to capitalize name properly
function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export interface PlayoffAppearance {
  owner_name: string;
  appearances: number;
}

export interface PlayoffFinish {
  owner_name: string;
  first_place: number;
  second_place: number;
  third_place: number;
}

export interface PlayoffStatsRow {
  owner_name: string;
  total_games: number;
  wins: number;
  losses: number;
  win_percentage: number;
  championship_rate: number;
}

export function usePlayoffStats(modernEraOnly: boolean = false) {
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

  const playoffStats = useMemo(() => {
    if (!records || !owners) {
      return {
        appearances: [],
        finishes: [],
        statsTable: [],
      };
    }

    // Filter owners to only include those active in 2025
    const activeOwners = owners.filter(
      (owner) => owner.years_active && owner.years_active.includes(2025)
    );

    // Filter records by era if specified
    const filteredRecords = modernEraOnly
      ? records.filter((record) => MODERN_ERA_YEARS.includes(record.year))
      : records;

    // Only include records where the owner made playoffs (playoff_finish exists and > 0)
    const playoffRecords = filteredRecords.filter(
      (record) => record.playoff_finish && record.playoff_finish > 0
    );

    // Calculate playoff appearances
    const appearancesMap: Record<string, number> = {};
    const finishesMap: Record<
      string,
      { first: number; second: number; third: number }
    > = {};
    const statsMap: Record<
      string,
      {
        games: number;
        wins: number;
        losses: number;
        championships: number;
      }
    > = {};

    playoffRecords.forEach((record) => {
      const owner = activeOwners.find((o) => o.id === record.owner_id);
      if (!owner) return;

      const ownerName = capitalizeName(owner.name);

      // Count appearances
      if (!appearancesMap[ownerName]) {
        appearancesMap[ownerName] = 0;
      }
      appearancesMap[ownerName]++;

      // Count finishes
      if (!finishesMap[ownerName]) {
        finishesMap[ownerName] = { first: 0, second: 0, third: 0 };
      }

      if (record.playoff_finish === 1) {
        finishesMap[ownerName].first++;
      } else if (record.playoff_finish === 2) {
        finishesMap[ownerName].second++;
      } else if (record.playoff_finish === 3) {
        finishesMap[ownerName].third++;
      }

      // Count playoff stats
      if (!statsMap[ownerName]) {
        statsMap[ownerName] = {
          games: 0,
          wins: 0,
          losses: 0,
          championships: 0,
        };
      }

      const playoffWins = record.playoff_wins || 0;
      const playoffLosses = record.playoff_losses || 0;

      statsMap[ownerName].games += playoffWins + playoffLosses;
      statsMap[ownerName].wins += playoffWins;
      statsMap[ownerName].losses += playoffLosses;

      if (record.playoff_finish === 1) {
        statsMap[ownerName].championships++;
      }
    });

    // Convert to arrays and sort
    const appearances: PlayoffAppearance[] = Object.entries(appearancesMap)
      .map(([name, count]) => ({
        owner_name: name,
        appearances: count,
      }))
      .sort((a, b) => b.appearances - a.appearances);

    const finishes: PlayoffFinish[] = Object.entries(finishesMap)
      .map(([name, counts]) => ({
        owner_name: name,
        first_place: counts.first,
        second_place: counts.second,
        third_place: counts.third,
      }))
      .sort((a, b) => {
        // Sort by total finishes (1st + 2nd + 3rd)
        const aTotal = a.first_place + a.second_place + a.third_place;
        const bTotal = b.first_place + b.second_place + b.third_place;
        return bTotal - aTotal;
      });

    const statsTable: PlayoffStatsRow[] = Object.entries(statsMap)
      .map(([name, stats]) => {
        const winPct = stats.games > 0 ? stats.wins / stats.games : 0;
        const champRate =
          appearancesMap[name] > 0
            ? stats.championships / appearancesMap[name]
            : 0;

        return {
          owner_name: name,
          total_games: stats.games,
          wins: stats.wins,
          losses: stats.losses,
          win_percentage: winPct,
          championship_rate: champRate,
        };
      })
      .sort((a, b) => b.win_percentage - a.win_percentage);

    return {
      appearances,
      finishes,
      statsTable,
    };
  }, [records, owners, modernEraOnly]);

  return {
    data: playoffStats,
    isLoading: recordsLoading || ownersLoading,
    error: recordsError || ownersError,
  };
}
