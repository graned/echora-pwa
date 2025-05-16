import { ReactNode, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  Settings,
  ExitToApp,
  Home,
  Book,
  Edit,
  Group,
  Star,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

export default function AppLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userPlan = useAppSelector((state) => state.auth.user?.plan) || "Free";

  const [mobileNavValue, setMobileNavValue] = useState(
    location.pathname.startsWith("/stories")
      ? "stories"
      : location.pathname.startsWith("/characters")
      ? "characters"
      : "home"
  );

  const handleMobileNavChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setMobileNavValue(newValue);
    switch (newValue) {
      case "home":
        navigate("/");
        break;
      case "stories":
        navigate("/stories");
        break;
      case "characters":
        navigate("/characters");
        break;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "premium":
        return "success";
      case "pro":
        return "warning";
      case "enterprise":
        return "secondary";
      default:
        return "default";
    }
  };

  const toolbarContent = (
    <div>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Chip
            label={isMobile ? "" : userPlan}
            size="small"
            color={getPlanColor(userPlan)}
            sx={{
              fontSize: "0.6rem",
              height: "18px",
              "& .MuiChip-label": {
                px: isMobile ? 0 : 0.5,
                display: isMobile ? "none" : "flex",
              },
            }}
          />
        }
      >
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={isMobile ? { padding: "6px" } : {}}
        >
          <Avatar
            sx={{
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
            }}
          >
            U
          </Avatar>
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: isMobile ? "50vh" : "none",
            width: isMobile ? "100vw" : "200px",
          },
        }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );

  const menuContent = (
    <List dense={isMobile}>
      {["Dashboard", "Characters", "Campaigns", "Library"].map((text) => (
        <ListItem button key={text} sx={{ py: isMobile ? 0.5 : 1 }}>
          <ListItemIcon sx={{ minWidth: isMobile ? "36px" : "40px" }}>
            <Star fontSize={isMobile ? "small" : "medium"} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{text}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );

  const menuFooter = (
    <Button
      fullWidth
      startIcon={<Star fontSize={isMobile ? "small" : "medium"} />}
      sx={{
        py: isMobile ? 1 : 1.5,
        justifyContent: "flex-start",
        textAlign: "left",
      }}
    >
      <Box>
        <Typography variant="caption" display="block">
          Current Plan
        </Typography>
        <Typography
          variant="body2"
          color={getPlanColor(userPlan)}
          sx={{ fontWeight: 500 }}
        >
          {userPlan}
        </Typography>
      </Box>
    </Button>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pb: isMobile ? "56px" : 0, // Add padding for bottom nav
      }}
    >
      <Layout
        toolbarContent={toolbarContent}
        menuContent={menuContent}
        menuHeader={
          <Typography variant={isMobile ? "subtitle1" : "h6"}>Menu</Typography>
        }
        menuFooter={menuFooter}
        menuWidth={isMobile ? 180 : 240}
        collapsedWidth={isMobile ? 48 : 56}
        showSideMenu={!isMobile}
      >
        <Box
          sx={{
            p: isMobile ? 1.5 : 3,
            pb: isMobile ? "80px" : "40px", // Add space for mobile bottom nav
          }}
        >
          {children}
        </Box>
      </Layout>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={mobileNavValue}
            onChange={handleMobileNavChange}
          >
            <BottomNavigationAction label="Home" value="home" icon={<Home />} />
            <BottomNavigationAction
              label="Stories"
              value="stories"
              icon={<Book />}
            />
            <BottomNavigationAction
              label="Characters"
              value="characters"
              icon={<Group />}
            />
            <BottomNavigationAction
              label="Write"
              value="write"
              icon={<Edit />}
              onClick={() => navigate("/stories/new")}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}
