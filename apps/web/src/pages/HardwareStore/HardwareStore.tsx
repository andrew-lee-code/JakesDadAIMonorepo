import { Box, Typography } from "@mui/material";
import HallOfFame from "../../components/HallOfFame";
import HardwareGraphs from "../../components/HardwareGraphs";

const HardwareStore = () => {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: 4,
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#e6e6e6",
        background: "linear-gradient(135deg, #e6e6e6 0%, #ffffff 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
          color: "#155263",
          textShadow: "0 2px 4px rgba(21, 82, 99, 0.1)",
        }}
      >
        Hardware Hall of Fame
      </Typography>
      <HardwareGraphs />
      <HallOfFame />
    </Box>
  );
};

export default HardwareStore;
