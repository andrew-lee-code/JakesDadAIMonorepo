import { Box, Typography, Paper } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

interface TimelineYear {
  year: number;
  events: TimelineEvent[];
}

const LeagueTimeline = () => {
  const timelineYears: TimelineYear[] = [
    {
      year: 2012,
      events: [
        {
          year: 2012,
          title: "League Formation",
          description:
            "League forms as 8-team league with Craig, Justin, Andrew, Selim, Jake, Matt, Dalton and Tyler as its original members.",
        },
      ],
    },
    {
      year: 2013,
      events: [
        {
          year: 2013,
          title: "Tyler leaves, Pippins joins",
          description: "Tyler is replaced by Pippins.",
        },
        {
          year: 2013,
          title: "GSARDUCT",
          description:
            "GSARDUCT set the precedent for a ‘free-market’ league where managers are allowed considerable autonomy and the power of the regulatory league body is limited. GSARDUCT ideals are deeply ingrained into the league, and they act as a foundation from which new league policy is shaped. In the fallout from GSARDUCT, Craig was permanently stripped of commissioner duties",
        },
      ],
    },
    {
      year: 2015,
      events: [
        {
          year: 2015,
          title: "12 Team Expansion",
          description:
            "Taylor, Michael, Paul, Tim and Milo join. Pippins leaves.",
        },
      ],
    },
    {
      year: 2016,
      events: [
        {
          year: 2016,
          title: "Modern Era Begins",
          description:
            "A 10-team league is establiished. Milo and Dalton are removed as nonserious members.",
        },
      ],
    },
    {
      year: 2017,
      events: [
        {
          year: 2017,
          title: "Tim leaves, Milo returns",
          description:
            "Tim is replaced by Milo after Tim withdraws from modern society.",
        },
      ],
    },
    {
      year: 2018,
      events: [
        {
          year: 2018,
          title: "Milo leaves, Dalton returns",
          description:
            "The league attains its core membership, with Dalton replacing Milo.",
        },
      ],
    },
    {
      year: 2022,
      events: [
        {
          year: 2022,
          title: "Half Point PPR",
          description: "Half point PPR scoring system is introduced.",
        },
        {
          year: 2022,
          title: "FA Bidding System",
          description:
            "Waiver Hawking is abolished and replaced by bidding system after a successful 4 week pilot to start the season.",
        },
        {
          year: 2022,
          title: "Febreezy Asterisk Ring",
          description: "Damar Hamlin",
        },
      ],
    },
    {
      year: 2025,
      events: [
        {
          year: 2025,
          title: "Platform Turmoil",
          description:
            "NFL.com buys a 10% stake in ESPN, throwing the league platform into turmoil. A Sleeper pilot is introduced to explore platform migration.",
        },
      ],
    },
  ];

  const getEventColor = (year: number) => {
    // Pre-modern era (2015 and earlier) - Gold
    if (year <= 2015) {
      return "#DAA520"; // Goldenrod
    }
    // Modern era (2016 and later) - Teal
    return "#155263"; // Teal
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        mb: 6,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 600,
          color: "#155263",
          textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
        }}
      >
        League Timeline
      </Typography>

      <Timeline
        sx={{
          "& .MuiTimelineItem-root:before": {
            content: "none", // Remove default spacing
          },
        }}
      >
        {timelineYears.map((yearData, index) => (
          <TimelineItem key={yearData.year}>
            <TimelineOppositeContent
              sx={{
                flex: 0.2,
                px: 2,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: getEventColor(yearData.year),
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                {yearData.year}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: getEventColor(yearData.year),
                  width: { xs: 16, sm: 20 },
                  height: { xs: 16, sm: 20 },
                  border: "3px solid white",
                  boxShadow: `0 0 0 3px ${getEventColor(yearData.year)}40`,
                }}
              />
              {index < timelineYears.length - 1 && (
                <TimelineConnector
                  sx={{
                    background: `linear-gradient(180deg, ${getEventColor(
                      yearData.year
                    )} 0%, ${getEventColor(
                      timelineYears[index + 1].year
                    )} 100%)`,
                    width: 2,
                    minHeight: { xs: 40, sm: 60 },
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ px: 2, pb: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 },
                  border: `2px solid ${getEventColor(yearData.year)}20`,
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    left: -10,
                    top: 15,
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderRight: `8px solid ${getEventColor(yearData.year)}20`,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: getEventColor(yearData.year),
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    display: { xs: "block", sm: "none" },
                    mb: 1,
                  }}
                >
                  {yearData.year}
                </Typography>

                {yearData.events.map((event, eventIndex) => (
                  <Box
                    key={`${event.year}-${eventIndex}`}
                    sx={{
                      mb: eventIndex < yearData.events.length - 1 ? 1.5 : 0,
                      pb: eventIndex < yearData.events.length - 1 ? 1.5 : 0,
                      borderBottom:
                        eventIndex < yearData.events.length - 1
                          ? `1px solid ${getEventColor(yearData.year)}30`
                          : "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: getEventColor(yearData.year),
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        mb: 0.5,
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: 1.4,
                        fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      }}
                    >
                      {event.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
};

export default LeagueTimeline;
