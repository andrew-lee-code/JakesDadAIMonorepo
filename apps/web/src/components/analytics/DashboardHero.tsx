import { Box, Typography, Button, Chip } from "@jakes-dad/shared";

interface QuickStat {
  label: string;
  value: string;
}

interface Section {
  id: string;
  label: string;
}

interface DashboardHeroProps {
  title: string;
  subtitle?: string;
  quickStats: QuickStat[];
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  spreadsheetUrl?: string;
}

const DashboardHero = ({
  title,
  subtitle,
  quickStats,
  sections,
  activeSection,
  onSectionClick,
  spreadsheetUrl,
}: DashboardHeroProps) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #155263 0%, #2798b7 100%)",
        px: { xs: 2, md: 6 },
        pt: { xs: 4, md: 5 },
        pb: { xs: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.03) 35px,
            rgba(255, 255, 255, 0.03) 70px
          )`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Title */}
      <Box sx={{ textAlign: "center", mb: 3, position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "28px", md: "42px" },
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: { xs: "14px", md: "16px" },
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Quick Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: { xs: 1.5, md: 3 },
          mb: 3,
          position: "relative",
          zIndex: 1,
          maxWidth: { xs: "320px", md: "600px" },
          mx: "auto",
        }}
      >
        {quickStats.map((stat) => (
          <Box
            key={stat.label}
            sx={{
              textAlign: "center",
              px: { xs: 1.5, md: 3 },
              py: { xs: 1.5, md: 2 },
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                color: "#daa520",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "24px" },
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: "10px", md: "12px" },
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Section Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {sections.map((section) => (
          <Chip
            key={section.id}
            label={section.label}
            onClick={() => onSectionClick(section.id)}
            sx={{
              backgroundColor:
                activeSection === section.id
                  ? "#fff"
                  : "rgba(255,255,255,0.2)",
              color: activeSection === section.id ? "#155263" : "#fff",
              fontWeight: 600,
              fontSize: { xs: "11px", md: "13px" },
              height: { xs: 30, md: 34 },
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  activeSection === section.id
                    ? "#fff"
                    : "rgba(255,255,255,0.3)",
              },
            }}
          />
        ))}
      </Box>

      {/* OG Spreadsheet Link */}
      {spreadsheetUrl && (
        <Box
          sx={{ textAlign: "center", mt: 2, position: "relative", zIndex: 1 }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              window.open(spreadsheetUrl, "_blank", "noopener,noreferrer")
            }
            sx={{
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Open OG Analytics Spreadsheet
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DashboardHero;
