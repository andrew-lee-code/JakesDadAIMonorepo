import React from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Avatar,
} from "@jakes-dad/shared";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { getOwnerAvatarUrl } from "../utils/imageUtils";

interface HardwareBoxProps {
  name: string;
  title: string;
  borderColor: string;
  textColor: string;
}

const HardwareBox = ({
  name,
  title,
  textColor,
  borderColor,
}: HardwareBoxProps) => (
  <Box
    sx={{
      textAlign: "center",
      p: { xs: 0.5, sm: 1 },
      minHeight: { xs: 120, sm: 140 },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box
      sx={{
        position: "relative",
        mb: 0.5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={getOwnerAvatarUrl(name)}
        sx={{
          width: "20vw",
          height: "20vw",
          maxWidth: { xs: 90, sm: 110 },
          maxHeight: { xs: 90, sm: 110 },
          minWidth: { xs: 60, sm: 70 },
          minHeight: { xs: 60, sm: 70 },
          border: `3px solid ${borderColor}`,
          boxShadow: 3,
        }}
      >
        {name?.charAt(0).toUpperCase()}
      </Avatar>
    </Box>
    <Box>
      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "0.7rem", sm: "0.8rem" },
          lineHeight: 1.2,
        }}
      >
        {name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: textColor,
          fontWeight: 600,
          fontSize: { xs: "0.5rem", sm: "0.6rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

const HallOfFame: React.FC = () => {
  const {
    data: hardware,
    isLoading,
    error,
  } = useSupabaseQuery("hardware_by_season", {
    orderBy: { column: "year", ascending: false },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading Hall of Fame...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading Hall of Fame: {error?.message}
      </Alert>
    );
  }

  if (!hardware || hardware.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No Hall of Fame data found.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#155263",
            mb: 4,
          }}
        >
          Modern Era
        </Typography>
      </Box>
      {hardware.map((season: any, index: number) => (
        <Box key={season.year}>
          {season.year === 2015 && (
            <Box
              sx={{
                textAlign: "center",
                mt: index > 0 ? 4 : 0,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#155263",
                  mb: 4,
                }}
              >
                Pre-Modern Era
              </Typography>
            </Box>
          )}
          {index > 0 && season.year !== 2015 && (
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "#c0c0c0",
                my: 3,
              }}
            />
          )}
          <Typography
            variant="h5"
            sx={{
              minWidth: { xs: "auto", sm: "120px" },
              fontWeight: 700,
              color: "#1e758d",
              textShadow: "0 1px 3px rgba(30, 117, 141, 0.2)",
              mb: { xs: 1, sm: 0 },
            }}
          >
            {season.year}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              flex: 1,
              justifyContent: "space-around",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            {/* Winners Group */}
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <HardwareBox
                name={season.playoff_champ}
                title="CHAMPION 👑"
                borderColor="#B8860B"
                textColor="#B8860B"
              />

              <HardwareBox
                name={season.reg_szn_champ}
                title="REG SEASON CHAMP 🏆"
                borderColor="#B8860B"
                textColor="#B8860B"
              />
            </Box>

            {/* Losers Group */}
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <HardwareBox
                name={season.ultimate_loser}
                title="ULITMATE LOSER 💩"
                borderColor="#8B0000"
                textColor="#8B0000"
              />

              <HardwareBox
                name={season.reg_szn_loser}
                title="REG SEASON LOSER 🤡"
                borderColor="#8B0000"
                textColor="#8B0000"
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HallOfFame;
