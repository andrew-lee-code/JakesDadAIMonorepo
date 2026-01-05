import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { capitalizeName } from "../utils/stringUtils";
import { getOwnerAvatarUrl } from "../utils/imageUtils";
import { type EraKey } from "../constants/years";
import { filterByEras } from "../utils/eraUtils";

export interface RecordRow {
  id: number;
  created_at: string;
  year: number;
  owner_id: number;
  wins: number;
  losses: number;
  reg_szn_finish: number;
  playoff_wins: number;
  playoff_losses: number;
  playoff_finish: number;
}

export interface Owner {
  id: number;
  created_at: string;
  name: string;
  years_active: number[];
}

export interface MemberStats {
  owner_id: number;
  name: string;
  totalWins: number;
  totalLosses: number;
  winPercentage: string;
  hardware: number;
  avatar?: string;
}

export function useOwners() {
  return useSupabaseQuery<Owner>("owners");
}

export function useRecords() {
  const result = useSupabaseQuery<RecordRow>("records");

  return result;
}

export function useMemberStats(selectedEras: Set<EraKey>) {
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

  const memberStats = useMemo(() => {
    if (!records || !owners) return [];

    // Filter owners to only include those active in 2025
    const targetYear = 2025;
    const activeOwners = owners.filter(
      (owner) => owner.years_active && owner.years_active.includes(targetYear)
    );

    // Group records by owner_id and calculate stats
    const statsMap: Record<number, MemberStats> = {};

    // Filter records by selected eras
    const filteredRecords = filterByEras(records, selectedEras);

    filteredRecords.forEach((record) => {
      const ownerId = record.owner_id;

      // Skip if owner_id is null or undefined
      if (ownerId == null) {
        return;
      }

      const owner = activeOwners.find((o) => o.id === ownerId);

      if (!owner) {
        // Skip if owner not found or not active in current year
        return;
      }

      if (!statsMap[ownerId]) {
        statsMap[ownerId] = {
          owner_id: ownerId,
          name: capitalizeName(owner.name),
          totalWins: 0,
          totalLosses: 0,
          winPercentage: "0.00%",
          hardware: 0,
          avatar: getOwnerAvatarUrl(owner.name),
        };
      }

      // Add wins and losses (handle nulls properly)
      const wins = record.wins != null ? record.wins : 0;
      const losses = record.losses != null ? record.losses : 0;

      statsMap[ownerId].totalWins += wins;
      statsMap[ownerId].totalLosses += losses;

      // Count hardware (playoff championships only)
      if (record.playoff_finish === 1) {
        statsMap[ownerId].hardware += 1; // Playoff championship
      }
    });

    // Calculate win percentages and convert to array
    const memberStatsArray = Object.values(statsMap).map((stats) => {
      const totalGames = stats.totalWins + stats.totalLosses;
      const winPct = totalGames > 0 ? (stats.totalWins / totalGames) * 100 : 0;

      return {
        ...stats,
        winPercentage: `${winPct.toFixed(2)}%`,
      };
    });

    // Sort by win percentage (descending)
    return memberStatsArray.sort((a, b) => {
      const aPct = parseFloat(a.winPercentage.replace("%", ""));
      const bPct = parseFloat(b.winPercentage.replace("%", ""));
      return bPct - aPct;
    });
  }, [records, owners, selectedEras]);

  return {
    data: memberStats,
    isLoading: recordsLoading || ownersLoading,
    error: recordsError || ownersError,
  };
}
