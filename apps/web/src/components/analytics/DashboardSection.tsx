import { Box, Typography } from "@jakes-dad/shared";
import type { SvgIconProps } from "@mui/material";
import type { ComponentType } from "react";

interface DashboardSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ComponentType<SvgIconProps>;
  children: React.ReactNode;
}

const DashboardSection = ({
  id,
  title,
  subtitle,
  icon: Icon,
  children,
}: DashboardSectionProps) => {
  return (
    <Box
      id={id}
      sx={{
        mb: 6,
        scrollMarginTop: "20px",
      }}
    >
      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: subtitle ? 0.5 : 0,
          }}
        >
          {Icon && (
            <Icon sx={{ fontSize: { xs: 28, md: 32 }, color: "#155263" }} />
          )}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#155263",
              fontSize: { xs: "1.5rem", md: "1.75rem" },
            }}
          >
            {title}
          </Typography>
        </Box>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontStyle: "italic",
              ml: Icon ? 5.5 : 0,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Section Content */}
      {children}
    </Box>
  );
};

export default DashboardSection;
