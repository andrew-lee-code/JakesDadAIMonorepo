import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";

export interface HardwareByOwner {
  owner_name: string;
  num_playoff_championships: number;
  num_reg_szn_championships: number;
}

export interface LosersByOwner {
  owner_name: string;
  num_ultimate_losers: number;
  num_reg_szn_losers: number;
}

export interface HardwareBySeason {
  year: number;
  playoff_champ: string;
  reg_szn_champ: string;
  ultimate_loser: string;
  reg_szn_loser: string;
}

export function useHardwareByOwner() {
  return useSupabaseQuery<HardwareByOwner>("hardware_by_owner", {
    orderBy: {
      column: "num_playoff_championships",
      ascending: false,
    },
  });
}

export function useLosersByOwner() {
  return useSupabaseQuery<LosersByOwner>("losers_by_owner", {
    orderBy: {
      column: "num_ultimate_losers",
      ascending: false,
    },
  });
}

export function useHardwareBySeason(years?: number[]) {
  const query = useSupabaseQuery<HardwareBySeason>("hardware_by_season", {
    orderBy: { column: "year", ascending: false },
  });

  const filteredData = useMemo(() => {
    if (!years || !query.data) {
      return query.data || [];
    }
    return query.data.filter((season) => years.includes(season.year));
  }, [years, query.data]);

  return {
    ...query,
    data: filteredData,
  };
}

export function useHardwareByOwnerFiltered(years?: number[]) {
  // Always call both hooks to avoid conditional hook calls
  const allDataQuery = useHardwareByOwner();
  const seasonDataQuery = useSupabaseQuery<HardwareBySeason>(
    "hardware_by_season",
    {
      orderBy: { column: "year", ascending: false },
    }
  );

  // Calculate filtered totals when years are specified
  const filteredData = useMemo(() => {
    if (!years) {
      return allDataQuery.data || [];
    }

    if (!seasonDataQuery.data) return [];

    const filteredSeasons = seasonDataQuery.data.filter((season) =>
      years.includes(season.year)
    );
    const ownerTotals: Record<string, { playoff: number; regSzn: number }> = {};

    filteredSeasons.forEach((season) => {
      // Count playoff championships
      if (season.playoff_champ) {
        if (!ownerTotals[season.playoff_champ]) {
          ownerTotals[season.playoff_champ] = { playoff: 0, regSzn: 0 };
        }
        ownerTotals[season.playoff_champ].playoff++;
      }

      // Count regular season championships
      if (season.reg_szn_champ) {
        if (!ownerTotals[season.reg_szn_champ]) {
          ownerTotals[season.reg_szn_champ] = { playoff: 0, regSzn: 0 };
        }
        ownerTotals[season.reg_szn_champ].regSzn++;
      }
    });

    return Object.entries(ownerTotals)
      .map(([name, totals]) => ({
        owner_name: name,
        num_playoff_championships: totals.playoff,
        num_reg_szn_championships: totals.regSzn,
      }))
      .sort((a, b) => {
        if (b.num_playoff_championships !== a.num_playoff_championships) {
          return b.num_playoff_championships - a.num_playoff_championships;
        }
        return b.num_reg_szn_championships - a.num_reg_szn_championships;
      });
  }, [years, allDataQuery.data, seasonDataQuery.data]);

  // Return the appropriate loading/error states
  const isLoading = years ? seasonDataQuery.isLoading : allDataQuery.isLoading;
  const error = years ? seasonDataQuery.error : allDataQuery.error;

  return {
    data: filteredData,
    isLoading,
    error,
  };
}

export function useLosersByOwnerFiltered(years?: number[]) {
  // Always call both hooks to avoid conditional hook calls
  const allDataQuery = useLosersByOwner();
  const seasonDataQuery = useSupabaseQuery<HardwareBySeason>(
    "hardware_by_season",
    {
      orderBy: { column: "year", ascending: false },
    }
  );

  // Calculate filtered totals when years are specified
  const filteredData = useMemo(() => {
    if (!years) {
      return allDataQuery.data || [];
    }

    if (!seasonDataQuery.data) return [];

    const filteredSeasons = seasonDataQuery.data.filter((season) =>
      years.includes(season.year)
    );
    const ownerTotals: Record<string, { ultimate: number; regSzn: number }> =
      {};

    filteredSeasons.forEach((season) => {
      // Count ultimate losers
      if (season.ultimate_loser) {
        if (!ownerTotals[season.ultimate_loser]) {
          ownerTotals[season.ultimate_loser] = { ultimate: 0, regSzn: 0 };
        }
        ownerTotals[season.ultimate_loser].ultimate++;
      }

      // Count regular season losers
      if (season.reg_szn_loser) {
        if (!ownerTotals[season.reg_szn_loser]) {
          ownerTotals[season.reg_szn_loser] = { ultimate: 0, regSzn: 0 };
        }
        ownerTotals[season.reg_szn_loser].regSzn++;
      }
    });

    return Object.entries(ownerTotals)
      .map(([name, totals]) => ({
        owner_name: name,
        num_ultimate_losers: totals.ultimate,
        num_reg_szn_losers: totals.regSzn,
      }))
      .sort((a, b) => {
        if (b.num_ultimate_losers !== a.num_ultimate_losers) {
          return b.num_ultimate_losers - a.num_ultimate_losers;
        }
        return b.num_reg_szn_losers - a.num_reg_szn_losers;
      });
  }, [years, allDataQuery.data, seasonDataQuery.data]);

  // Return the appropriate loading/error states
  const isLoading = years ? seasonDataQuery.isLoading : allDataQuery.isLoading;
  const error = years ? seasonDataQuery.error : allDataQuery.error;

  return {
    data: filteredData,
    isLoading,
    error,
  };
}
