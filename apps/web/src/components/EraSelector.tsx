import { Box, Typography, Paper } from "@jakes-dad/shared";
import { ERA_CONFIG, type EraKey } from "../constants/years";

interface EraSelectorProps {
  selectedEras: Set<EraKey>;
  onSelectionChange: (eras: Set<EraKey>) => void;
}

// Helper to get combined year range for selected eras
const getCombinedRange = (selectedEras: Set<EraKey>): string => {
  if (selectedEras.size === 0) return "";

  // Get all selected era ranges in order
  const selectedRanges: string[] = [];
  if (selectedEras.has("pre-modern")) selectedRanges.push(ERA_CONFIG["pre-modern"].range);
  if (selectedEras.has("modern")) selectedRanges.push(ERA_CONFIG["modern"].range);
  if (selectedEras.has("hppr")) selectedRanges.push(ERA_CONFIG["hppr"].range);

  // If only one era selected, just return that range
  if (selectedRanges.length === 1) return selectedRanges[0];

  // Check if years are continuous
  const years: number[] = [];
  if (selectedEras.has("pre-modern")) years.push(...ERA_CONFIG["pre-modern"].years);
  if (selectedEras.has("modern")) years.push(...ERA_CONFIG["modern"].years);
  if (selectedEras.has("hppr")) years.push(...ERA_CONFIG["hppr"].years);

  const sortedYears = [...years].sort((a, b) => a - b);
  const min = sortedYears[0];
  const max = sortedYears[sortedYears.length - 1];

  // Check for gaps: if we have fewer years than the range suggests, show individual ranges
  const expectedYearCount = max - min + 1;
  if (sortedYears.length < expectedYearCount) {
    // There are gaps, show individual ranges
    return selectedRanges.join(", ");
  }

  // Years are continuous, show combined range
  return `${min}-${max}`;
};

export const EraSelector = ({
  selectedEras,
  onSelectionChange,
}: EraSelectorProps) => {
  const handleEraClick = (eraKey: EraKey) => {
    // Prevent deselecting the last era (require at least one)
    if (selectedEras.has(eraKey) && selectedEras.size === 1) {
      return;
    }

    const newSelection = new Set(selectedEras);
    if (selectedEras.has(eraKey)) {
      newSelection.delete(eraKey);
    } else {
      newSelection.add(eraKey);
    }
    onSelectionChange(newSelection);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
      {/* Card-based selector */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, md: 2 },
          justifyContent: "center",
          flexWrap: "nowrap",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {(Object.keys(ERA_CONFIG) as EraKey[]).map((eraKey) => {
          const era = ERA_CONFIG[eraKey];
          const isSelected = selectedEras.has(eraKey);

          return (
            <Paper
              key={eraKey}
              onClick={() => handleEraClick(eraKey)}
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 0,
                position: "relative",
                p: { xs: 1.5, md: 2 },
                cursor: "pointer",
                border: isSelected ? "2px solid #155263" : "2px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: "#fff",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#155263",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(21, 82, 99, 0.15)",
                },
                // Ensure 44px touch target
                minHeight: "44px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Checkmark indicator */}
              {isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: { xs: 20, md: 24 },
                    height: { xs: 20, md: 24 },
                    borderRadius: "50%",
                    backgroundColor: "#155263",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "12px", md: "14px" },
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </Typography>
                </Box>
              )}

              {/* Era label */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "13px", md: "16px" },
                  color: "#155263",
                  textAlign: "center",
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {era.label}
              </Typography>

              {/* Year range */}
              <Typography
                sx={{
                  fontSize: { xs: "10px", md: "12px" },
                  color: "#666",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {era.range}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      {/* Helper text showing combined year range */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          sx={{
            color: "#666",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          Showing data from: {getCombinedRange(selectedEras)}
        </Typography>
      </Box>
    </Box>
  );
};
