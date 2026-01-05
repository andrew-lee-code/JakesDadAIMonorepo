import { useState } from "react";
import { Box, Typography, Paper } from "@jakes-dad/shared";
import { EraSelector } from "../../../../web/src/components/EraSelector";
import { type EraKey } from "../../../../web/src/constants/years";

/**
 * Retrospective Design Mockup: Era Selector Component
 *
 * This mockup demonstrates the EraSelector component that was implemented
 * for the HPPR Era feature. It shows the component in various states to
 * validate the design decisions.
 */
const EraSelectorDemo = () => {
  // State 1: Default (HPPR only)
  const [state1, setState1] = useState<Set<EraKey>>(new Set(["hppr"]));

  // State 2: Multiple eras selected
  const [state2, setState2] = useState<Set<EraKey>>(
    new Set(["modern", "hppr"])
  );

  // State 3: All eras selected
  const [state3, setState3] = useState<Set<EraKey>>(
    new Set(["pre-modern", "modern", "hppr"])
  );

  // State 4: Single era (Pre-Modern)
  const [state4, setState4] = useState<Set<EraKey>>(new Set(["pre-modern"]));

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#155263",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Era Selector Component
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            fontStyle: "italic",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Multi-select era filtering for Analytics and League Members pages.
          Allows users to filter data by Pre-Modern (2012-2015), Modern
          (2016-2021), and HPPR (2022-2025) eras.
        </Typography>
      </Box>

      {/* Design Specifications */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#155263",
            mb: 2,
          }}
        >
          Design Specifications
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Visual Style
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
              • Card-based design with rounded corners
              <br />
              • Selected: Teal border (#155263), checkmark indicator
              <br />
              • Unselected: Gray border (#e0e0e0)
              <br />• Hover: Lift effect with shadow
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Behavior
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
              • Multi-select: Click card to toggle
              <br />
              • Required: At least one era must be selected
              <br />
              • Range Display: Shows combined range (e.g., 2016-2025)
              <br />• Default: HPPR only (most recent era)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Layout
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
              • All cards in one horizontal line
              <br />
              • Flexible width (adapts to container)
              <br />
              • No wrap: Always single row
              <br />• Gap: 8px (mobile), 16px (desktop)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Accessibility
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
              • Touch target: 44px minimum (WCAG AA)
              <br />
              • Clickable cards with hover feedback
              <br />
              • Visual selection indicators
              <br />• Clear contrast ratios
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* State Examples */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* State 1: Default */}
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
          >
            State 1: Default (HPPR Only)
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: "14px" }}
          >
            Users see HPPR era selected by default, showing the most recent data
            (2022-2025). This matches the previous "Modern Era Only" behavior but
            focuses on the current scoring system.
          </Typography>
          <EraSelector selectedEras={state1} onSelectionChange={setState1} />
          <Typography
            variant="body2"
            sx={{ color: "#999", mt: 2, fontSize: "13px", fontStyle: "italic" }}
          >
            Selected: {Array.from(state1).join(", ")}
          </Typography>
        </Paper>

        {/* State 2: Multiple Selection */}
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
          >
            State 2: Multiple Eras Selected
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: "14px" }}
          >
            Users can select multiple eras to compare data across different
            periods. The combined range is shown (2016-2025) instead of listing
            each era separately.
          </Typography>
          <EraSelector selectedEras={state2} onSelectionChange={setState2} />
          <Typography
            variant="body2"
            sx={{ color: "#999", mt: 2, fontSize: "13px", fontStyle: "italic" }}
          >
            Selected: {Array.from(state2).join(", ")}
          </Typography>
        </Paper>

        {/* State 3: All Selected */}
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
          >
            State 3: All Eras Selected
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: "14px" }}
          >
            Selecting all three eras shows complete historical data (2012-2025).
            This is equivalent to the previous "Modern Era Only" OFF state.
          </Typography>
          <EraSelector selectedEras={state3} onSelectionChange={setState3} />
          <Typography
            variant="body2"
            sx={{ color: "#999", mt: 2, fontSize: "13px", fontStyle: "italic" }}
          >
            Selected: {Array.from(state3).join(", ")}
          </Typography>
        </Paper>

        {/* State 4: Single Pre-Modern */}
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
          >
            State 4: Historical View (Pre-Modern Only)
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: "14px" }}
          >
            Users can isolate the Pre-Modern era (2012-2015) to view the early
            days of the league before the Modern Era began.
          </Typography>
          <EraSelector selectedEras={state4} onSelectionChange={setState4} />
          <Typography
            variant="body2"
            sx={{ color: "#999", mt: 2, fontSize: "13px", fontStyle: "italic" }}
          >
            Selected: {Array.from(state4).join(", ")}
          </Typography>
        </Paper>

        {/* Edge Case: Cannot Deselect Last Era */}
        <Paper sx={{ p: 3, borderColor: "#ffc107", border: "2px solid" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
          >
            Edge Case: Protected State
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: "14px" }}
          >
            <strong>Behavior:</strong> Try clicking the selected button below. The
            component prevents deselecting the last era, ensuring at least one era
            is always selected. This prevents empty data states.
          </Typography>
          <EraSelector
            selectedEras={new Set(["modern"])}
            onSelectionChange={() => {
              // This won't be called when trying to deselect the last era
            }}
          />
        </Paper>
      </Box>

      {/* Mobile Preview Note */}
      <Paper
        sx={{
          p: 3,
          mt: 4,
          maxWidth: "1200px",
          mx: "auto",
          backgroundColor: "#e3f2fd",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
        >
          📱 Mobile Responsiveness
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
          The component adapts to mobile viewports with:
          <br />
          • Smaller font sizes (13px on mobile vs 16px on desktop)
          <br />
          • Reduced card padding (12px on mobile vs 16px on desktop)
          <br />
          • Maintained 44px minimum touch target height
          <br />
          • All cards stay in one line (flexbox with flex:1)
          <br />
          • Smaller checkmark indicator (20px vs 24px)
          <br />
          • Tighter gap between cards (8px vs 16px)
          <br />
          <br />
          <em>Resize your browser window to see the responsive behavior.</em>
        </Typography>
      </Paper>
    </Box>
  );
};

export default EraSelectorDemo;
