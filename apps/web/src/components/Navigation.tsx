import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Handyman as HandymanIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Museum as MuseumIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Members", path: "/members", icon: <PeopleIcon /> },
    { text: "Hardware Store", path: "/hardware-store", icon: <HandymanIcon /> },
    { text: "Analytics", path: "/analytics", icon: <AnalyticsIcon /> },
    {
      text: "League Lore",
      path: "/league-lore",
      icon: <MuseumIcon />,
    },
    {
      text: "By-Laws",
      path: "https://docs.google.com/document/d/1pJQ_SrG_yooaJzuMaXOznfc_lNiDYxmY/edit",
      icon: <DescriptionIcon />,
      external: true,
    },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: "#155263",
          color: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Jags', system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: "1px",
          }}
        >
          JAKE'S DAD
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#ffffff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.external ? "a" : Link}
              {...(item.external
                ? {
                    href: item.path,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : { to: item.path })}
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor:
                  !item.external && location.pathname === item.path
                    ? "rgba(39, 152, 183, 0.1)"
                    : "transparent",
                borderLeft:
                  !item.external && location.pathname === item.path
                    ? "4px solid #2798b7"
                    : "4px solid transparent",
                "&:hover": {
                  backgroundColor: "rgba(39, 152, 183, 0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    !item.external && location.pathname === item.path
                      ? "#155263"
                      : "#0c2f39",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily:
                      '"Inter", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight:
                      !item.external && location.pathname === item.path
                        ? 600
                        : 400,
                    color:
                      !item.external && location.pathname === item.path
                        ? "#155263"
                        : "#0c2f39",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          maxWidth: "100vw",
          backgroundColor: "#155263",
          boxShadow: "0 2px 8px rgba(21, 82, 99, 0.3)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: "#ffffff",
              fontFamily: "'Jags', system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: "1px",
              fontSize: "1.5rem",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                color: "#2798b7",
              },
            }}
          >
            JAKE'S DAD
          </Typography>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(39, 152, 183, 0.2)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
