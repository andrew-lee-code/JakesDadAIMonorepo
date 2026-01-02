import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { useOwners } from "./useRecords";

export interface WaiverTransaction {
  id: number;
  created_at: string;
  owner_id: number;
  player_claimed_name: string;
  budget_spent: number;
  year: number;
  week: number;
  was_successful: boolean;
  player_claimed_position: string;
}

export interface WaiverDataPoint {
  week: number;
  [ownerName: string]: number | string; // ownerName: budgetRemaining, week: number
}

export interface WaiverTooltipData {
  week: number;
  owner: string;
  playerName: string;
  position: string;
  amountSpent: number;
  budgetRemaining: number;
}

export interface WaiverDataPointWithTooltip {
  week: number;
  tooltipData?: WaiverTooltipData[];
  [ownerName: string]: number | string | WaiverTooltipData[] | undefined;
}

function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function useWaiverTransactions(year: number = 2025) {
  const filters = [
    { column: "year", operator: "eq", value: year },
    { column: "was_successful", operator: "eq", value: true }, // Only successful transactions
  ];

  const {
    data: waiverTransactions,
    isLoading: waiverLoading,
    error: waiverError,
  } = useSupabaseQuery<WaiverTransaction>("waiver_transactions", { filters });

  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();

  const { waiverData, tooltipData } = useMemo(() => {
    if (!owners) {
      return { waiverData: [], tooltipData: [] };
    }

    // Step 1: Get owners active for this year
    const currentYear = 2025

    let activeOwners = owners.filter(
      (owner) => owner.years_active && owner.years_active.includes(currentYear)
    );

    // If no active owners found, try with string comparison
    if (activeOwners.length === 0) {
      activeOwners = owners.filter(
        (owner) =>
          owner.years_active && owner.years_active.includes(currentYear)
      );
    }

    // If still no active owners found, return empty data
    if (activeOwners.length === 0) {
      return { waiverData: [], tooltipData: [] };
    }

    // Step 2: Get waiver transactions for those owners
    const activeOwnerIds = new Set(activeOwners.map((owner) => owner.id));
    const relevantTransactions =
      waiverTransactions?.filter((transaction) =>
        activeOwnerIds.has(transaction.owner_id)
      ) || [];

    // Create owner lookup map for active owners only
    const ownerMap = new Map<number, string>();
    activeOwners.forEach((owner) => {
      ownerMap.set(owner.id, capitalizeName(owner.name));
    });

    // Group transactions by owner and week
    const ownerWeekData = new Map<string, Map<number, WaiverTransaction[]>>();

    // Initialize only active owners with empty data
    activeOwners.forEach((owner) => {
      const ownerName = capitalizeName(owner.name);
      ownerWeekData.set(ownerName, new Map());
    });

    // Process relevant transactions
    relevantTransactions.forEach((transaction) => {
      const ownerName = ownerMap.get(transaction.owner_id);
      if (!ownerName) return;

      if (!ownerWeekData.get(ownerName)!.has(transaction.week)) {
        ownerWeekData.get(ownerName)!.set(transaction.week, []);
      }
      ownerWeekData.get(ownerName)!.get(transaction.week)!.push(transaction);
    });

    // Get all weeks that have transactions, or default to weeks 1-4 if no transactions
    const allWeeks = new Set<number>();
    relevantTransactions.forEach((transaction) => {
      allWeeks.add(transaction.week);
    });

    // If no transactions, default to weeks 1-4
    const sortedWeeks =
      allWeeks.size > 0
        ? Array.from(allWeeks).sort((a, b) => a - b)
        : [1, 2, 3, 4];

    // Calculate budget remaining for each owner week by week
    const results: WaiverDataPointWithTooltip[] = [];
    const tooltipResults: WaiverTooltipData[] = [];

    sortedWeeks.forEach((week) => {
      const weekData: WaiverDataPointWithTooltip = { week };
      const weekTooltipData: WaiverTooltipData[] = [];

      activeOwners.forEach((owner) => {
        const ownerName = capitalizeName(owner.name);
        const ownerTransactions = ownerWeekData.get(ownerName)?.get(week) || [];

        // Calculate budget remaining up to this week
        let totalSpent = 0;
        for (let w = 1; w <= week; w++) {
          const weekTransactions = ownerWeekData.get(ownerName)?.get(w) || [];
          totalSpent += weekTransactions.reduce(
            (sum, transaction) => sum + transaction.budget_spent,
            0
          );
        }

        const budgetRemaining = 200 - totalSpent;
        weekData[ownerName] = budgetRemaining;

        // Add tooltip data for each individual transaction
        ownerTransactions.forEach((transaction) => {
          const tooltipEntry = {
            week,
            owner: ownerName,
            playerName: transaction.player_claimed_name,
            position: transaction.player_claimed_position,
            amountSpent: transaction.budget_spent,
            budgetRemaining: budgetRemaining,
          };
          weekTooltipData.push(tooltipEntry);
          tooltipResults.push(tooltipEntry);
        });
      });

      // Always include the week data, even if no transactions (to show all active owners)
      weekData.tooltipData = weekTooltipData;
      results.push(weekData);
    });

    return { waiverData: results, tooltipData: tooltipResults };
  }, [waiverTransactions, owners, year]);

  return {
    data: waiverData,
    tooltipData,
    isLoading: waiverLoading || ownersLoading,
    error: waiverError || ownersError,
  };
}
