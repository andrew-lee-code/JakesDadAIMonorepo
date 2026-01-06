import { Box, Typography, Paper, Avatar } from "@jakes-dad/shared";
import { useState } from "react";

// Mock data for demonstration
const mockOwners = [
  { name: "Michael", avatar: "/images/owner_pictures/michael.webp" },
  { name: "Matt", avatar: "/images/owner_pictures/matt.webp" },
  { name: "Taylor", avatar: "/images/owner_pictures/taylor.webp" },
  { name: "Andrew", avatar: "/images/owner_pictures/andrew.webp" },
  { name: "Kyle", avatar: "/images/owner_pictures/kyle.webp" },
  { name: "Justin", avatar: "/images/owner_pictures/justin.webp" },
  { name: "Jake", avatar: "/images/owner_pictures/jake.webp" },
  { name: "Colin", avatar: "/images/owner_pictures/colin.webp" },
];

// Mock win/loss data: [wins, losses] per year
const mockRecords: Record<string, Array<[number, number] | null>> = {
  Michael: [
    [8, 5],
    [10, 3],
    [7, 6],
    [9, 4], // Pre-Modern 2012-2015
    [11, 2],
    [8, 5],
    [9, 4],
    [7, 6],
    [10, 3],
    [8, 5], // Modern 2016-2021
    [12, 1],
    [9, 4],
    [10, 3],
    [11, 2], // HPPR 2022-2025
  ],
  Matt: [
    [9, 4],
    [11, 2],
    [10, 3],
    [8, 5],
    [10, 3],
    [9, 4],
    [11, 2],
    [7, 6],
    [8, 5],
    [10, 3],
    [10, 3],
    [11, 2],
    [9, 4],
    [10, 3],
  ],
  Taylor: [
    [7, 6],
    [8, 5],
    [9, 4],
    [10, 3],
    [8, 5],
    [9, 4],
    [7, 6],
    [11, 2],
    [9, 4],
    [8, 5],
    [9, 4],
    [10, 3],
    [8, 5],
    [9, 4],
  ],
  Andrew: [
    null,
    null,
    null,
    null, // Not active Pre-Modern
    [6, 7],
    [7, 6],
    [8, 5],
    [9, 4],
    [7, 6],
    [8, 5],
    [9, 4],
    [8, 5],
    [10, 3],
    [7, 6],
  ],
  Kyle: [
    [5, 8],
    [6, 7],
    [4, 9],
    [7, 6],
    [6, 7],
    [5, 8],
    [7, 6],
    [6, 7],
    [5, 8],
    [6, 7],
    [7, 6],
    [6, 7],
    [5, 8],
    [6, 7],
  ],
  Justin: [
    [4, 9],
    [5, 8],
    [6, 7],
    [5, 8],
    [4, 9],
    [6, 7],
    [5, 8],
    [4, 9],
    [6, 7],
    [5, 8],
    [6, 7],
    [5, 8],
    [7, 6],
    [6, 7],
  ],
  Jake: [
    null,
    null,
    [5, 8],
    [6, 7], // Joined late Pre-Modern
    [7, 6],
    [6, 7],
    [8, 5],
    [7, 6],
    [6, 7],
    [7, 6],
    [8, 5],
    [7, 6],
    [6, 7],
    [7, 6],
  ],
  Colin: [
    [6, 7],
    [7, 6],
    [8, 5],
    [6, 7],
    [7, 6],
    [8, 5],
    [6, 7],
    [9, 4],
    [7, 6],
    [6, 7],
    [8, 5],
    [9, 4],
    [7, 6],
    [8, 5],
  ],
};

// Era definitions
const eras = [
  {
    key: "pre-modern",
    label: "Pre-Modern",
    range: "2012-2015",
    years: [2012, 2013, 2014, 2015],
    bgColor: "rgba(250, 250, 250, 0.6)",
  },
  {
    key: "modern",
    label: "Modern",
    range: "2016-2021",
    years: [2016, 2017, 2018, 2019, 2020, 2021],
    bgColor: "rgba(240, 248, 249, 0.6)",
  },
  {
    key: "hppr",
    label: "HPPR",
    range: "2022-2025",
    years: [2022, 2023, 2024, 2025],
    bgColor: "rgba(255, 250, 240, 0.6)",
  },
];

export const WinLossTableRedesign = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ maxWidth: 1400, mx: "auto", mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            mb: 1,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(21, 82, 99, 0.5)",
          }}
        >
          Raw Win/Loss Records
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            color: "#daa520",
            textAlign: "center",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          The Complete Historical Record • 2012-2025
        </Typography>
      </Box>

      {/* Main Table Container */}
      <Paper
        elevation={24}
        sx={{
          maxWidth: 1400,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
          background: "linear-gradient(to bottom, #ffffff, #fafafa)",
          border: "3px solid #155263",
        }}
      >
        {/* Table Wrapper with Horizontal Scroll */}
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 900 }}>
            {/* Era Header Row */}
            <Box
              sx={{
                display: "flex",
                borderBottom: "3px solid #155263",
                background: "#155263",
              }}
            >
              {/* Empty space for owner column */}
              <Box
                sx={{
                  width: { xs: 120, md: 160 },
                  flexShrink: 0,
                  borderRight: "3px solid #155263",
                  background: "#155263",
                }}
              />

              {/* Era labels */}
              {eras.map((era) => (
                <Box
                  key={era.key}
                  sx={{
                    flex: era.years.length,
                    py: 2,
                    px: 2,
                    textAlign: "center",
                    borderRight:
                      era.key !== "hppr" ? "4px solid #daa520" : "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: { xs: "1.125rem", md: "1.375rem" },
                      fontWeight: 700,
                      color: "#daa520",
                      letterSpacing: "0.15em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {era.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 500,
                    }}
                  >
                    {era.range}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Combined Year + W/L Header Rows */}
            <Box sx={{ display: "flex" }}>
              {/* OWNER header cell (spans both rows) */}
              <Box
                sx={{
                  width: { xs: 120, md: 160 },
                  flexShrink: 0,
                  borderRight: "3px solid #155263",
                  borderBottom: "3px solid #155263",
                  background: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 700,
                    color: "#155263",
                    letterSpacing: "0.1em",
                  }}
                >
                  OWNER
                </Typography>
              </Box>

              {/* Year + W/L headers column */}
              <Box sx={{ flex: 1 }}>
                {/* Year Header Row */}
                <Box
                  sx={{
                    display: "flex",
                    borderBottom: "2px solid #e0e0e0",
                    background: "#f5f5f5",
                  }}
                >
                  {/* Year headers */}
              {eras.map((era) =>
                era.years.map((year, yearIdx) => {
                  return (
                    <Box
                      key={year}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        textAlign: "center",
                        borderLeft:
                          yearIdx === 0 ? "4px solid #155263" : "1px solid #e0e0e0",
                        background: era.bgColor,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: { xs: "1rem", md: "1.125rem" },
                          fontWeight: 700,
                          color: "#155263",
                        }}
                      >
                        {year}
                      </Typography>
                    </Box>
                  );
                })
              )}
                </Box>

                {/* W/L Sub-header Row */}
                <Box
                  sx={{
                    display: "flex",
                    borderBottom: "3px solid #155263",
                    background: "#fafafa",
                  }}
                >

              {/* W/L headers */}
              {eras.map((era) =>
                era.years.map((year, yearIdx) => {
                  return (
                    <Box
                      key={`${year}-wl`}
                      sx={{
                        flex: 1,
                        display: "flex",
                        borderLeft:
                          yearIdx === 0 ? "4px solid #155263" : "1px solid #e0e0e0",
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          py: 0.75,
                          textAlign: "center",
                          borderRight: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "0.75rem", md: "0.875rem" },
                            fontWeight: 700,
                            color: "#155263",
                          }}
                        >
                          W
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, py: 0.75, textAlign: "center" }}>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.75rem", md: "0.875rem" },
                            fontWeight: 700,
                            color: "#155263",
                          }}
                        >
                          L
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
                </Box>
              </Box>
            </Box>

            {/* Data Rows */}
            {mockOwners.map((owner, ownerIdx) => {
              const records = mockRecords[owner.name];
              return (
                <Box
                  key={owner.name}
                  onMouseEnter={() => setHoveredRow(owner.name)}
                  onMouseLeave={() => setHoveredRow(null)}
                  sx={{
                    display: "flex",
                    borderBottom: "1px solid #e0e0e0",
                    background:
                      hoveredRow === owner.name
                        ? "#f0f0f0"
                        : ownerIdx % 2 === 0
                        ? "#fff"
                        : "#fafafa",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.005)",
                      boxShadow: "0 2px 8px rgba(21, 82, 99, 0.15)",
                    },
                  }}
                >
                  {/* Owner Cell (Frozen) */}
                  <Box
                    sx={{
                      width: { xs: 120, md: 160 },
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1, md: 1.5 },
                      px: { xs: 1, md: 2 },
                      py: { xs: 1.5, md: 2 },
                      borderRight: "3px solid #155263",
                      background: "inherit",
                    }}
                  >
                    <Avatar
                      src={owner.avatar}
                      alt={owner.name}
                      sx={{
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                        border: "2px solid #155263",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      {owner.name[0]}
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        fontWeight: 700,
                        color: "#155263",
                      }}
                    >
                      {owner.name}
                    </Typography>
                  </Box>

                  {/* Record Cells */}
                  {eras.map((era) =>
                    era.years.map((year, yearIdx) => {
                      const globalYearIdx = eras
                        .slice(0, eras.indexOf(era))
                        .reduce((acc, e) => acc + e.years.length, 0) + yearIdx;
                      const record = records[globalYearIdx];

                      if (!record) {
                        // No data for this year
                        return (
                          <Box
                            key={year}
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              py: { xs: 1.5, md: 2 },
                              borderLeft:
                                yearIdx === 0
                                  ? "4px solid #155263"
                                  : "1px solid #e0e0e0",
                              background: era.bgColor,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "1rem", color: "#ccc" }}
                            >
                              —
                            </Typography>
                          </Box>
                        );
                      }

                      const [wins, losses] = record;

                      return (
                        <Box
                          key={year}
                          sx={{
                            flex: 1,
                            display: "flex",
                            borderLeft:
                              yearIdx === 0
                                ? "4px solid #155263"
                                : "1px solid #e0e0e0",
                          }}
                        >
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              py: { xs: 1.5, md: 2 },
                              borderRight: "1px solid rgba(0,0,0,0.05)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: { xs: "0.875rem", md: "1rem" },
                                fontWeight: 700,
                                color: "#155263",
                              }}
                            >
                              {wins}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              py: { xs: 1.5, md: 2 },
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: { xs: "0.875rem", md: "1rem" },
                                fontWeight: 700,
                                color: "#155263",
                              }}
                            >
                              {losses}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>

      {/* Design Notes */}
      <Paper
        sx={{
          maxWidth: 1400,
          mx: "auto",
          mt: 4,
          p: 3,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#155263",
            mb: 2,
          }}
        >
          Design Enhancements Demonstrated
        </Typography>
        <Box component="ul" sx={{ pl: 3, color: "#666" }}>
          <li>
            <strong>Era Delineation:</strong> Visual grouping with labeled
            headers, thick borders between eras, and subtle background colors
          </li>
          <li>
            <strong>Owner Avatars:</strong> Profile pictures in frozen column
            for quick visual recognition
          </li>
          <li>
            <strong>Striped Rows:</strong> Alternating backgrounds improve
            scannability
          </li>
          <li>
            <strong>Hover Effects:</strong> Row highlighting for premium feel
          </li>
          <li>
            <strong>Combined Header:</strong> OWNER header cell spans both year
            and W/L rows for cleaner layout
          </li>
          <li>
            <strong>Premium Typography:</strong> Bebas Neue for sports
            analytics aesthetic (Jags font would be used in production)
          </li>
          <li>
            <strong>Responsive Design:</strong> Adjusts cell sizes and spacing
            for mobile/desktop
          </li>
        </Box>
      </Paper>
    </Box>
  );
};
