import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@jakes-dad/shared";
import { useRecords, useOwners } from "../hooks/useRecords";
import { capitalizeName } from "../utils/stringUtils";

interface YearRecord {
  year: number;
  wins: number;
  losses: number;
}

interface OwnerRecords {
  owner_name: string;
  records: YearRecord[];
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
        RAW WIN/LOSS RECORDS
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {/* Frozen Owner Column */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: 80, sm: 120 },
            borderRight: "3px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "grey.100",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    p: { xs: 1, sm: 1.5 },
                    textAlign: "center",
                    height: { xs: 48, sm: 56 },
                  }}
                >
                  OWNER
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "grey.50",
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    p: { xs: 0.25, sm: 0.5 },
                    textAlign: "center",
                    borderBottom: "2px solid",
                    borderColor: "divider",
                    height: { xs: 32, sm: 40 },
                  }}
                >
                  {/* Empty cell for W/L header alignment */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ownerRecords.map((owner) => (
                <TableRow key={owner.owner_name}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      p: { xs: 0.5, sm: 1 },
                      textAlign: "center",
                      backgroundColor: "background.paper",
                      height: { xs: 36, sm: 44 },
                    }}
                  >
                    {owner.owner_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Scrollable Data Section */}
        <Box
          sx={{
            flex: 1,
            overflowX: "auto",
            minWidth: 0,
          }}
        >
          <Table size="small" sx={{ minWidth: allYears.length * 80 }}>
            <TableHead>
              <TableRow>
                {allYears.map((year, index) => (
                  <TableCell
                    key={year}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "grey.100",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      p: { xs: 0.5, sm: 1 },
                      textAlign: "center",
                      minWidth: { xs: 60, sm: 80 },
                      height: { xs: 48, sm: 56 },
                      borderLeft: index > 0 ? "2px solid" : "none",
                      borderColor: "grey.300",
                    }}
                  >
                    {year}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {allYears.map((year, index) => (
                  <TableCell
                    key={`${year}-header`}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "grey.50",
                      fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      p: { xs: 0.25, sm: 0.5 },
                      textAlign: "center",
                      borderBottom: "2px solid",
                      borderColor: "divider",
                      height: { xs: 32, sm: 40 },
                      borderLeft: index > 0 ? "2px solid" : "none",
                      borderLeftColor: "grey.300",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <span>W</span>
                      <span>L</span>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ownerRecords.map((owner) => (
                <TableRow key={owner.owner_name}>
                  {owner.records.map((record, index) => (
                    <TableCell
                      key={`${owner.owner_name}-${record.year}`}
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                        p: { xs: 0.25, sm: 0.5 },
                        textAlign: "center",
                        backgroundColor:
                          record.wins === 0 && record.losses === 0
                            ? "grey.50"
                            : "inherit",
                        height: { xs: 36, sm: 44 },
                        borderLeft: index > 0 ? "2px solid" : "none",
                        borderColor: "grey.300",
                      }}
                    >
                      {record.wins === 0 && record.losses === 0 ? (
                        <span style={{ color: "#999" }}>-</span>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <span>{record.wins}</span>
                          <span>{record.losses}</span>
                        </Box>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default RawWinLossRecords;
