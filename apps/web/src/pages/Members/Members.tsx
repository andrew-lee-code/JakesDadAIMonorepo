import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from "@jakes-dad/shared";
import { useState } from "react";
import { useMemberStats } from "../../hooks/useRecords";

interface MemberData {
  name: string;
  overallRecord: string;
  winPercentage: string;
  hardware: number;
  avatar?: string;
}

const Members = () => {
  const [modernEraOnly, setModernEraOnly] = useState(true);
  const { data: memberStats, isLoading, error } = useMemberStats(modernEraOnly);

  if (isLoading) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress />
          <Typography variant="body1">Loading member data...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
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
        }}
      >
        <Alert severity="error" sx={{ mt: 4 }}>
          Error loading member data: {error?.message}
        </Alert>
      </Box>
    );
  }

  if (!memberStats || memberStats.length === 0) {
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
        }}
      >
        <Alert severity="info" sx={{ mt: 4 }}>
          No member data found.
        </Alert>
      </Box>
    );
  }

  // Transform the live data to match the component's expected format
  const membersData: MemberData[] = memberStats.map((member) => ({
    name: member.name,
    overallRecord: `${member.totalWins} - ${member.totalLosses}`,
    winPercentage: member.winPercentage,
    hardware: member.hardware,
    avatar: member.avatar,
  }));

  const getHardwareColor = (hardware: number) => {
    if (hardware >= 3) return "#B8860B"; // Gold for 3+
    if (hardware >= 1) return "#2798b7"; // Blue for 1-2
    return "#8B0000"; // Red for 0
  };

  const getWinPercentageColor = (percentage: string) => {
    const percent = parseFloat(percentage.replace("%", ""));
    if (percent >= 55) return "#155263"; // Dark teal for high win %
    if (percent >= 50) return "#1e758d"; // Medium teal for average
    return "#0c2f39"; // Darkest teal for low win %
  };

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
        League Members
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mb: 3,
          color: "#666",
          fontStyle: "italic",
          fontSize: "0.95rem",
        }}
      >
        Ordered by all-time win percentage
      </Typography>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <FormControlLabel
          control={
            <Switch
              checked={modernEraOnly}
              onChange={(e) => setModernEraOnly(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#2798b7" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#2798b7",
                },
              }}
            />
          }
          label={
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "#155263" }}
            >
              Modern Era Only
            </Typography>
          }
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(21, 82, 99, 0.15)",
          border: "1px solid #e6e6e6",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: { xs: 320, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#155263" }}>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontFamily:
                      '"Inter", "Helvetica Neue", "Arial", sans-serif',
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Manager
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontFamily:
                      '"Inter", "Helvetica Neue", "Arial", sans-serif',
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Overall Record
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontFamily:
                      '"Inter", "Helvetica Neue", "Arial", sans-serif',
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Win Percentage
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontFamily:
                      '"Inter", "Helvetica Neue", "Arial", sans-serif',
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  }}
                >
                  Hardware
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((member) => (
                <TableRow
                  key={member.name}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "rgba(21, 82, 99, 0.02)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(39, 152, 183, 0.05)",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        gap: { xs: 0.5, sm: 2 },
                        py: { xs: 1, sm: 0 },
                      }}
                    >
                      <Avatar
                        src={member.avatar}
                        sx={{
                          width: { xs: 48, sm: 96 },
                          height: { xs: 48, sm: 96 },
                          border: "2px solid #155263",
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "#0c2f39",
                          fontFamily:
                            '"Inter", "Helvetica Neue", "Arial", sans-serif',
                          fontSize: { xs: "0.75rem", sm: "1rem" },
                          textAlign: { xs: "center", sm: "left" },
                          lineHeight: { xs: 1.2, sm: 1.5 },
                        }}
                      >
                        {member.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily:
                          '"Inter", "Helvetica Neue", "Arial", sans-serif',
                        color: "#155263",
                        fontWeight: 500,
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      }}
                    >
                      {member.overallRecord}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily:
                          '"Inter", "Helvetica Neue", "Arial", sans-serif',
                        color: getWinPercentageColor(member.winPercentage),
                        fontWeight: 600,
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      }}
                    >
                      {member.winPercentage}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={member.hardware}
                      size="small"
                      sx={{
                        backgroundColor: getHardwareColor(member.hardware),
                        color: "#ffffff",
                        fontWeight: 700,
                        minWidth: { xs: 30, sm: 35 },
                        fontSize: { xs: "0.6rem", sm: "0.75rem" },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Members;
