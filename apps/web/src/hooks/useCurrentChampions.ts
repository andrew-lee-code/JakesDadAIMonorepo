import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { useOwners } from "./useRecords";
import { getOwnerAvatarUrl } from "../utils/imageUtils";

interface HardwareBySeason {
  id: number;
  created_at: string;
  year: number;
  playoff_champ: string;
  reg_szn_champion: string;
  ultimate_loser: string;
  reg_szn_loser: string;
}

interface Champion {
  name: string;
  avatar: string;
}

interface CurrentChampions {
  champion: Champion | null;
  ultimateLoser: Champion | null;
}

// Function to capitalize name properly
function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function useCurrentChampions() {
  const {
    data: hardwareData,
    isLoading: hardwareLoading,
    error: hardwareError,
  } = useSupabaseQuery<HardwareBySeason>("hardware_by_season", {
    filters: [{ column: "year", operator: "eq", value: 2025 }],
  });

  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();

  const champions = useMemo((): CurrentChampions => {
    if (!hardwareData || !owners || hardwareData.length === 0) {
      return { champion: null, ultimateLoser: null };
    }

    const currentYearData = hardwareData[0]; // Should only be one record for 2025
    console.log(currentYearData);

    // Find champion
    const championOwner = owners.find(
      (owner) =>
        owner.name.toLowerCase() ===
        currentYearData.playoff_champ?.toLowerCase()
    );
    console.log(championOwner);

    // Find ultimate loser
    const loserOwner = owners.find(
      (owner) =>
        owner.name.toLowerCase() ===
        currentYearData.ultimate_loser?.toLowerCase()
    );

    return {
      champion: championOwner
        ? {
            name: capitalizeName(championOwner.name),
            avatar: getOwnerAvatarUrl(championOwner.name),
          }
        : null,
      ultimateLoser: loserOwner
        ? {
            name: capitalizeName(loserOwner.name),
            avatar: getOwnerAvatarUrl(loserOwner.name),
          }
        : null,
    };
  }, [hardwareData, owners]);

  return {
    data: champions,
    isLoading: hardwareLoading || ownersLoading,
    error: hardwareError || ownersError,
  };
}
