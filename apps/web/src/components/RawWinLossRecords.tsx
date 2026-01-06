import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
} from "@jakes-dad/shared";
import { useRecords, useOwners } from "../hooks/useRecords";
import { capitalizeName } from "../utils/stringUtils";
import { ERA_CONFIG } from "../constants/years";
import { getOwnerAvatarUrl } from "../utils/imageUtils";

interface YearRecord {
  year: number;
  wins: number;
  losses: number;
}

interface OwnerRecords {
  owner_name: string;
  records: YearRecord[];
}

// Helper function to group years by era
function groupYearsByEra(years: number[]) {
  const eraGroups: Array<{ label: string; range: string; years: number[] }> =
    [];

  Object.values(ERA_CONFIG).forEach((config) => {
    const eraYears = years.filter((y) => config.years.includes(y));
    if (eraYears.length > 0) {
      eraGroups.push({
        label: config.label,
        range: config.range,
        years: eraYears.sort((a, b) => a - b),
      });
    }
  });

  return eraGroups;
}

// Helper function to detect if year is first in a new era
function isFirstYearInEra(year: number, allYears: number[]): boolean {
  const yearIndex = allYears.indexOf(year);
  if (yearIndex === 0) return true;

  const prevYear = allYears[yearIndex - 1];
  const currentEra = Object.values(ERA_CONFIG).find((e) =>
    e.years.includes(year)
  );
  const prevEra = Object.values(ERA_CONFIG).find((e) =>
    e.years.includes(prevYear)
  );

  return currentEra !== prevEra;
}

const RawWinLossRecords: React.FC = () => {
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

  if (recordsLoading || ownersLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (recordsError || ownersError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load records data
      </Alert>
    );
  }

  if (!records || !owners) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No records data found
      </Alert>
    );
  }

  // Get all years from records, sorted
  const allYears = Array.from(new Set(records.map((r) => r.year))).sort(
    (a, b) => a - b
  );

  // Group years by era
  const eraGroups = groupYearsByEra(allYears);

  // Get current owners (active in 2025)
  const currentOwners = owners.filter(
    (owner) => owner.years_active && owner.years_active.includes(2025)
  );

  // Process data into owner records
  const ownerRecords: OwnerRecords[] = currentOwners.map((owner) => {
    const ownerRecords = records.filter((r) => r.owner_id === owner.id);

    const yearRecords: YearRecord[] = allYears.map((year) => {
      const record = ownerRecords.find((r) => r.year === year);
      return {
        year,
        wins: record?.wins || 0,
        losses: record?.losses || 0,
      };
    });

    return {
      owner_name: capitalizeName(owner.name),
      records: yearRecords,
    };
  });

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
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
        Raw Win/Loss Records
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
              width: { xs: "100px", sm: "140px" },
              backgroundColor: "#f8f9fa",
              borderRight: "3px solid #155263",
              position: "sticky",
              left: 0,
              zIndex: 2,
            }}
          >
            {/* Combined OWNER header spanning all 3 header rows */}
            <Box
              sx={{
                height: { xs: "108px", sm: "132px" }, // Sum of all 3 header rows
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                color: "#155263",
                backgroundColor: "#f0f0f0",
                borderBottom: "3px solid #155263",
              }}
            >
              OWNER
            </Box>

            {/* Owner cells */}
            {ownerRecords.map((owner, index) => (
              <Box
                key={owner.owner_name}
                sx={{
                  height: { xs: "36px", sm: "44px" },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 0.5,
                  px: 0.5,
                  backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <Avatar
                  src={getOwnerAvatarUrl(owner.owner_name)}
                  alt={owner.owner_name}
                  sx={{
                    width: { xs: 24, sm: 32 },
                    height: { xs: 24, sm: 32 },
                  }}
                >
                  {owner.owner_name[0]}
                </Avatar>
                <Typography
                  sx={{
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    fontWeight: 700,
                    color: "#155263",
                  }}
                >
                  {owner.owner_name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Scrollable data area */}
          <Box sx={{ flex: 1, overflowX: "auto" }}>
            <Box sx={{ minWidth: `${allYears.length * 80}px` }}>
              {/* Era header row */}
              <Box sx={{ display: "flex", backgroundColor: "#155263" }}>
                {eraGroups.map((era, eraIndex) => (
                  <Box
                    key={era.label}
                    sx={{
                      width: `${era.years.length * 80}px`,
                      height: { xs: "36px", sm: "44px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: { xs: "0.7rem", sm: "0.85rem" },
                      color: "#daa520",
                      borderBottom: "2px solid #155263",
                      borderLeft: eraIndex > 0 ? "4px solid #daa520" : "none",
                    }}
                  >
                    {era.label} • {era.range}
                  </Box>
                ))}
              </Box>

              {/* Year header row */}
              <Box sx={{ display: "flex", backgroundColor: "#f0f0f0" }}>
                {allYears.map((year) => (
                  <Box
                    key={year}
                    sx={{
                      width: "80px",
                      height: { xs: "40px", sm: "48px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      color: "#155263",
                      borderBottom: "2px solid #e0e0e0",
                      borderLeft: isFirstYearInEra(year, allYears)
                        ? "4px solid #155263"
                        : "1px solid #e0e0e0",
                    }}
                  >
                    {year}
                  </Box>
                ))}
              </Box>

              {/* W/L sub-header row */}
              <Box sx={{ display: "flex", backgroundColor: "#fafafa" }}>
                {allYears.map((year) => (
                  <Box
                    key={`${year}-wl`}
                    sx={{
                      width: "80px",
                      height: { xs: "32px", sm: "40px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      color: "#155263",
                      borderBottom: "3px solid #155263",
                      borderLeft: isFirstYearInEra(year, allYears)
                        ? "4px solid #155263"
                        : "1px solid #e0e0e0",
                      gap: 2,
                    }}
                  >
                    <span>W</span>
                    <span>L</span>
                  </Box>
                ))}
              </Box>

              {/* Data rows */}
              {ownerRecords.map((owner, ownerIndex) => (
                <Box
                  key={owner.owner_name}
                  sx={{
                    display: "flex",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  {owner.records.map((record) => (
                    <Box
                      key={`${owner.owner_name}-${record.year}`}
                      sx={{
                        width: "80px",
                        height: { xs: "36px", sm: "44px" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                        fontWeight: 700,
                        color: "#155263",
                        backgroundColor:
                          record.wins === 0 && record.losses === 0
                            ? "#f5f5f5"
                            : ownerIndex % 2 === 0
                            ? "#fff"
                            : "#fafafa",
                        borderBottom: "1px solid #e0e0e0",
                        borderLeft: isFirstYearInEra(record.year, allYears)
                          ? "4px solid #155263"
                          : "1px solid #e0e0e0",
                        gap: 1.5,
                      }}
                    >
                      {record.wins === 0 && record.losses === 0 ? (
                        <span style={{ color: "#999" }}>—</span>
                      ) : (
                        <>
                          <span>{record.wins}</span>
                          <span>{record.losses}</span>
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RawWinLossRecords;
