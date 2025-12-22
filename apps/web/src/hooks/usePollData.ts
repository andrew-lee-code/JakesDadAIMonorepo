import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { useOwners } from "./useRecords";

export interface PollVote {
  id: number;
  created_at: string;
  voter_owner_id: number;
  value: number;
  year: number;
  voter_type: string;
  vote_receiver_owner_id: number;
}

export interface PollDataPoint {
  name: string;
  median: number;
  average: number;
  standardDeviation: number;
  min: number;
  max: number;
  count: number;
}

export interface RawVoteDataPoint {
  name: string;
  [voterName: string]: string | number; // Dynamic keys for voter names
}

function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function usePollData(
  year: number = 2025,
  includeNflBot: boolean = false
) {
  const filters: Array<{ column: string; operator: string; value: any }> = [
    { column: "year", operator: "eq", value: year }
  ];

  // If not including NFL bot, filter to only owner votes
  if (!includeNflBot) {
    filters.push({ column: "voter_type", operator: "eq", value: "owner" });
  }

  const {
    data: pollVotes,
    isLoading: pollLoading,
    error: pollError,
  } = useSupabaseQuery<PollVote>("poll_votes", {
    filters,
  });

  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();

  const { pollData, rawVoteData } = useMemo((): {
    pollData: PollDataPoint[];
    rawVoteData: RawVoteDataPoint[];
  } => {
    if (!pollVotes || !owners) return { pollData: [], rawVoteData: [] };

    // Group votes by vote_receiver_owner_id for averages
    const votesByReceiver = new Map<number, number[]>();

    // Group votes by receiver and voter for raw data
    const rawVotesByReceiver = new Map<number, Map<string, number>>();

    pollVotes.forEach((vote) => {
      const receiverId = vote.vote_receiver_owner_id;
      const voterId = vote.voter_owner_id;

      // For averages
      if (!votesByReceiver.has(receiverId)) {
        votesByReceiver.set(receiverId, []);
      }
      votesByReceiver.get(receiverId)!.push(vote.value);

      // For raw votes
      if (!rawVotesByReceiver.has(receiverId)) {
        rawVotesByReceiver.set(receiverId, new Map());
      }

      // Get voter name
      const voter = owners.find((o) => o.id === voterId);
      const voterName = voter ? capitalizeName(voter.name) : "NFL Fantasy Bot";

      rawVotesByReceiver.get(receiverId)!.set(voterName, vote.value);
    });

    // Calculate statistics for each receiver
    const results: PollDataPoint[] = [];
    const rawResults: RawVoteDataPoint[] = [];

    votesByReceiver.forEach((values, receiverId) => {
      const owner = owners.find((o) => o.id === receiverId);
      if (!owner) return;

      const receiverName = capitalizeName(owner.name);

      // Calculate median, average, std dev, min, max
      const sortedValues = [...values].sort((a, b) => a - b);
      const median =
        sortedValues.length % 2 === 0
          ? (sortedValues[sortedValues.length / 2 - 1] +
              sortedValues[sortedValues.length / 2]) /
            2
          : sortedValues[Math.floor(sortedValues.length / 2)];

      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance =
        values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) /
        values.length;
      const standardDeviation = Math.sqrt(variance);
      const min = Math.min(...values);
      const max = Math.max(...values);

      results.push({
        name: receiverName,
        median: Math.round(median * 100) / 100,
        average: Math.round(average * 100) / 100,
        standardDeviation: Math.round(standardDeviation * 100) / 100,
        min,
        max,
        count: values.length,
      });

      // Build raw vote data with sorted votes (largest values first for bottom stacking)
      const rawVoteEntry: RawVoteDataPoint = { name: receiverName };
      const voterVotes = rawVotesByReceiver.get(receiverId);
      if (voterVotes) {
        // Sort votes by value (largest first) to put larger values at bottom of stack
        const sortedVotes = Array.from(voterVotes.entries()).sort(
          (a, b) => b[1] - a[1]
        );
        sortedVotes.forEach(([voterName, value]) => {
          rawVoteEntry[voterName] = value;
        });
      }
      rawResults.push(rawVoteEntry);
    });

    // Sort by median ascending, then by average as tiebreaker (lowest to highest)
    results.sort((a, b) => {
      if (a.median === b.median) {
        return a.average - b.average;
      }
      return a.median - b.median;
    });

    // Sort rawResults by total sum of all votes (lowest to highest for left-to-right ordering)
    rawResults.sort((a, b) => {
      const aTotal = Object.keys(a)
        .filter((key) => key !== "name")
        .reduce((sum, key) => sum + (Number(a[key]) || 0), 0);
      const bTotal = Object.keys(b)
        .filter((key) => key !== "name")
        .reduce((sum, key) => sum + (Number(b[key]) || 0), 0);
      return aTotal - bTotal;
    });

    return { pollData: results, rawVoteData: rawResults };
  }, [pollVotes, owners, year, includeNflBot]);

  return {
    data: pollData,
    rawVoteData,
    isLoading: pollLoading || ownersLoading,
    error: pollError || ownersError,
  };
}
