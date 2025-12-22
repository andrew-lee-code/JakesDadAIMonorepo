import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { useWaiverTransactions } from "../hooks/useWaiverTransactions";

interface D3DataPoint {
  week: number;
  budgetRemaining: number;
  owner: string;
  transactions: Array<{
    week: number;
    owner: string;
    playerName: string;
    position: string;
    amountSpent: number;
    budgetRemaining: number;
  }>;
  x?: number;
  y?: number;
}

const WaiverTransactions = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [hoveredPoint, setHoveredPoint] = useState<D3DataPoint | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    data: waiverData,
    isLoading,
    error,
  } = useWaiverTransactions(selectedYear);

  const yearOptions = [2025]; // Add more years as needed

  // Define colors for each owner - using same scheme as Poll Data
  const getOwnerColor = useCallback((_ownerName: string, index: number) => {
    const distinctColors = [
      "#1976D2", // Blue
      "#CDDC39", // Lime Green
      "#F57C00", // Orange
      "#7B1FA2", // Purple
      "#D32F2F", // Red
      "#795548", // Brown
      "#607D8B", // Blue Grey
      "#FF5722", // Deep Orange
      "#3F51B5", // Indigo
      "#00BCD4", // Cyan
      "#E91E63", // Pink
      "#009688", // Teal
      "#9C27B0", // Magenta
      "#FF9800", // Amber
      "#4CAF50", // Light Green
      "#673AB7", // Deep Purple
    ];
    return distinctColors[index % distinctColors.length];
  }, []);

  const drawChart = useCallback((): void => {
    if (!waiverData || waiverData.length === 0 || !svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    // Get container width and make chart responsive
    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const isMobile = window.innerWidth < 768;

    // Adjust margins for mobile - much smaller margins
    const margin = isMobile
      ? { top: 10, right: 10, bottom: 20, left: 30 } // Reduced bottom margin on mobile
      : { top: 20, right: 30, bottom: 80, left: 80 };

    const width = Math.max(250, containerWidth - margin.left - margin.right);
    const height = isMobile
      ? 350 - margin.top - margin.bottom
      : 600 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Get all owner names
    const ownerNames = Object.keys(waiverData[0]).filter(
      (key) => key !== "week" && key !== "tooltipData"
    );

    // Prepare data for D3
    const d3Data: D3DataPoint[] = [];
    ownerNames.forEach((ownerName) => {
      waiverData.forEach((point) => {
        const budgetRemaining = point[ownerName];
        // Only add data points that have valid budget remaining values
        if (
          budgetRemaining !== undefined &&
          budgetRemaining !== null &&
          !isNaN(Number(budgetRemaining))
        ) {
          d3Data.push({
            week: point.week,
            budgetRemaining: Number(budgetRemaining),
            owner: ownerName,
            transactions:
              point.tooltipData?.filter(
                (t) => t.owner === ownerName && t.week === point.week
              ) || [],
          });
        }
      });
    });

    // Scales
    const weekExtent = d3.extent(d3Data, (d) => d.week) as [number, number];
    const budgetExtent = d3.extent(d3Data, (d) => d.budgetRemaining) as [
      number,
      number
    ];

    // Horizontal bar chart: x-axis is budget, y-axis is weeks
    const xScale = d3
      .scaleLinear()
      .domain(
        budgetExtent[0] !== undefined && budgetExtent[1] !== undefined
          ? [0, Math.max(200, budgetExtent[1] || 200)]
          : [0, 200]
      )
      .range([width, 0]); // Reversed: right-to-left (higher to lower)

    const yScale = d3
      .scaleLinear()
      .domain(
        weekExtent[0] !== undefined && weekExtent[1] !== undefined
          ? [weekExtent[1], weekExtent[0]] // Flipped to descending order
          : [4, 1]
      )
      .range([height, 0]);

    // Line generator for horizontal lines
    const line = d3
      .line<D3DataPoint>()
      .x((d) => xScale(d.budgetRemaining))
      .y((d) => yScale(d.week));

    // Add grid lines for line chart
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => "")
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => "")
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    // Add axes for line chart
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .append("text")
      .attr("x", width / 2)
      .attr("y", isMobile ? 35 : 40)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style("font-size", isMobile ? "10px" : "14px")
      .text("Budget Remaining ($)");

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(d3.format("d"))
          .ticks(
            Math.max(
              1,
              Math.ceil(weekExtent[1] || 4) - Math.floor(weekExtent[0] || 1) + 1
            )
          ) // One tick per week
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", isMobile ? -5 : -40)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style("font-size", isMobile ? "10px" : "14px")
      .text("Week");

    // Draw lines for each owner
    ownerNames.forEach((ownerName, index) => {
      const ownerData = d3Data.filter((d) => d.owner === ownerName);
      const color = getOwnerColor(ownerName, index);

      // Sort data by week to ensure proper line drawing
      ownerData.sort((a, b) => a.week - b.week);

      // Add line
      g.append("path")
        .datum(ownerData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("d", line);

      // Add dots
      g.selectAll(`.dot-${ownerName}`)
        .data(ownerData)
        .enter()
        .append("circle")
        .attr("class", `dot-${ownerName}`)
        .attr("cx", (d) => xScale(d.budgetRemaining))
        .attr("cy", (d) => yScale(d.week))
        .attr("r", 4)
        .attr("fill", color)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: D3DataPoint) {
          const [mouseX, mouseY] = d3.pointer(event, svgRef.current);
          setHoveredPoint({
            ...d,
            x: mouseX,
            y: mouseY,
          });
        })
        .on("mouseout", function () {
          setHoveredPoint(null);
        });
    });

    // Add legend at the bottom
    if (isMobile) {
      // Mobile: Multi-line legend below x-axis label
      const itemsPerRow = Math.ceil(Math.sqrt(ownerNames.length * 2)); // Roughly square layout
      const legendSpacing = 50;
      const rowHeight = 20;

      ownerNames.forEach((ownerName, index) => {
        const row = Math.floor(index / itemsPerRow);
        const col = index % itemsPerRow;

        const legendItem = g
          .append("g")
          .attr("class", "legend-item")
          .attr(
            "transform",
            `translate(${col * legendSpacing}, ${
              height + 45 + row * rowHeight
            })`
          );

        legendItem
          .append("rect")
          .attr("width", 8)
          .attr("height", 8)
          .attr("fill", getOwnerColor(ownerName, index));

        legendItem
          .append("text")
          .attr("x", 12)
          .attr("y", 6)
          .attr("font-size", "9px")
          .text(ownerName);
      });
    } else {
      // Desktop: Single line legend
      const legendSpacing = 80;
      const legend = g
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          `translate(${Math.max(
            0,
            width / 2 - (ownerNames.length * legendSpacing) / 2
          )}, ${height + 50})`
        );

      ownerNames.forEach((ownerName, index) => {
        const legendRow = legend
          .append("g")
          .attr("transform", `translate(${index * legendSpacing}, 0)`);

        legendRow
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", getOwnerColor(ownerName, index));

        legendRow
          .append("text")
          .attr("x", 18)
          .attr("y", 9)
          .attr("font-size", "11px")
          .text(ownerName);
      });
    }
  }, [waiverData, getOwnerColor]);

  useEffect(() => {
    drawChart();

    // Add resize handler
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [waiverData, drawChart]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading waiver transaction data: {error.message}
      </Alert>
    );
  }

  if (!waiverData || waiverData.length === 0) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No waiver transaction data found for {selectedYear}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Make sure you have waiver transactions in your database for this year.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#155263", mb: 2 }}
        >
          WAIVER TRANSACTIONS
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            label="Year"
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#155263", mb: 1 }}
        textAlign="center"
      >
        Budget Remaining by Week
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#666", mb: 3, textAlign: "center" }}
      >
        Track each owner's remaining budget throughout the {selectedYear}{" "}
        season. All owners start with $200 budget. Lines move from left to right
        as they spend on waiver transactions.
      </Typography>

      <Box sx={{ position: "relative", width: "100%" }}>
        <svg
          ref={svgRef}
          width="100%"
          height={window.innerWidth < 768 ? 420 : 700}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Tooltip */}
        {hoveredPoint && hoveredPoint.owner && (
          <Box
            ref={tooltipRef}
            sx={{
              position: "absolute",
              left: hoveredPoint.x
                ? `${
                    hoveredPoint.budgetRemaining < 100
                      ? hoveredPoint.x - 210
                      : hoveredPoint.x + 10
                  }px`
                : "10px", // Position to the left if budget < 100, right if >= 100
              top: hoveredPoint.y
                ? `${Math.max(10, hoveredPoint.y - 50)}px`
                : "10px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              minWidth: 200,
              zIndex: 1000,
              pointerEvents: "none", // Prevent tooltip from interfering with mouse events
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", mb: 1, color: "#155263" }}
            >
              {hoveredPoint.owner} - Week {hoveredPoint.week}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
              Budget Remaining: ${hoveredPoint.budgetRemaining}
            </Typography>
            {hoveredPoint.transactions &&
            Array.isArray(hoveredPoint.transactions) &&
            hoveredPoint.transactions.length > 0 ? (
              <>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", display: "block", mb: 1 }}
                >
                  Transactions this week:
                </Typography>
                {hoveredPoint.transactions.map((transaction, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      pb: 1,
                      borderBottom:
                        index < hoveredPoint.transactions.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {transaction.playerName} ({transaction.position})
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", color: "#DC2626" }}
                    >
                      -${transaction.amountSpent}
                    </Typography>
                  </Box>
                ))}
              </>
            ) : (
              <Typography variant="caption" sx={{ color: "#999" }}>
                No transactions this week
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WaiverTransactions;
