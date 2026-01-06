import { Box, Typography, CircularProgress, Alert } from "@jakes-dad/shared";
import { useMemo } from "react";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { useOwners } from "../hooks/useRecords";
import { capitalizeName } from "../utils/stringUtils";

interface RecordRow {
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

// Function to get color based on finish position
const getFinishColor = (finish: number | null): string => {
  if (finish === null || finish === undefined) return "#f5f5f5"; // Light gray for no data

  if (finish === 1) return "#1b5e20"; // Dark green for 1st
  if (finish === 2) return "#2e7d32"; // Medium-dark green for 2nd
  if (finish === 3) return "#388e3c"; // Medium green for 3rd
  if (finish === 4) return "#4caf50"; // Light green for 4th
  if (finish === 5) return "#fbc02d"; // Yellow for 5th
  if (finish === 6) return "#cddc39"; // Yellow-green for 6th
  if (finish === 7) return "#ffeb3b"; // Light yellow for 7th
  if (finish === 8) return "#ffc107"; // Amber for 8th
  if (finish === 9) return "#ff9800"; // Orange for 9th
  if (finish === 10) return "#f44336"; // Red for 10th
  if (finish === 11) return "#d32f2f"; // Dark red for 11th
  if (finish === 12) return "#b71c1c"; // Very dark red for 12th

  return "#e0e0e0"; // Default gray
};

const RegularSeasonHeatmap = () => {
  const {
    data: records,
    isLoading: recordsLoading,
    error: recordsError,
  } = useSupabaseQuery<RecordRow>("records");

  const {
    data: owners,
    isLoading: ownersLoading,
    error: ownersError,
  } = useOwners();

  const heatmapData = useMemo(() => {
    if (!records || !owners) return null;

    // Filter owners to only include those active in 5
    const currentOwners = owners.filter(
      (owner) => owner.years_active && owner.years_active.includes(2025)
    );

    // Get all unique years and sort them
    const years = [...new Set(records.map((r) => r.year))].sort();

    // Create owner name mapping (only for current owners)
    const ownerMap = new Map(
      currentOwners.map((owner) => [owner.id, capitalizeName(owner.name)])
    );

    // Group records by owner and year
    const dataMap = new Map<string, Map<number, number>>();

    records.forEach((record) => {
      const ownerName = ownerMap.get(record.owner_id);
      if (!ownerName || record.reg_szn_finish == null) return;

      if (!dataMap.has(ownerName)) {
        dataMap.set(ownerName, new Map());
      }

      dataMap.get(ownerName)!.set(record.year, record.reg_szn_finish);
    });

    // Convert to array format and sort owners alphabetically
    const ownerNames = Array.from(dataMap.keys()).sort();

    return {
      years,
      ownerNames,
      dataMap,
    };
  }, [records, owners]);

  if (recordsLoading || ownersLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (recordsError || ownersError) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading heatmap data
      </Alert>
    );
  }

  if (!heatmapData) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No data available for heatmap
      </Alert>
    );
  }

  const { years, ownerNames, dataMap } = heatmapData;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "#155263",
          fontSize: { xs: "1rem", sm: "1.125rem" },
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Regular Season Finishes by Year/Owner
      </Typography>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(21, 82, 99, 0.15)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", position: "relative" }}>
          {/* Frozen left column with owner names */}
          <Box
            sx={{
              width: "120px",
              backgroundColor: "#f8f9fa",
              borderRight: "2px solid #e0e0e0",
              position: "sticky",
              left: 0,
              zIndex: 2,
            }}
          >
            {/* Header cell */}
            <Box
              sx={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: 1,
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#155263",
                backgroundColor: "#f0f0f0",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Owner
            </Box>

            {/* Owner name cells */}
            {ownerNames.map((ownerName) => (
              <Box
                key={ownerName}
                sx={{
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 1,
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  color: "#155263",
                  backgroundColor: "#f8f9fa",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {ownerName}
              </Box>
            ))}
          </Box>

          {/* Scrollable data area */}
          <Box sx={{ flex: 1, overflowX: "auto" }}>
            <Box sx={{ minWidth: `${years.length * 60}px` }}>
              {/* Header row with years */}
              <Box sx={{ display: "flex", backgroundColor: "#f0f0f0" }}>
                {years.map((year) => (
                  <Box
                    key={year}
                    sx={{
                      width: "60px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      color: "#155263",
                      borderBottom: "1px solid #e0e0e0",
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {year}
                  </Box>
                ))}
              </Box>

              {/* Data rows */}
              {ownerNames.map((ownerName) => (
                <Box key={ownerName} sx={{ display: "flex" }}>
                  {years.map((year) => {
                    const finish = dataMap.get(ownerName)?.get(year);
                    return (
                      <Box
                        key={`${ownerName}-${year}`}
                        sx={{
                          width: "60px",
                          height: "35px",
                          backgroundColor: getFinishColor(finish || null),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          color: finish && finish <= 6 ? "#ffffff" : "#000000",
                          borderBottom: "1px solid #e0e0e0",
                          borderRight: "1px solid #e0e0e0",
                        }}
                      >
                        {finish || ""}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegularSeasonHeatmap;
