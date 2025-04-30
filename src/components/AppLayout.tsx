import { ReactNode, useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Badge,
  Chip,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  Settings,
  ExitToApp,
  Star,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

export default function AppLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userPlan = useAppSelector((state) => state.auth.user?.plan) || "Free";

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
    <>
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
    </>
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
    <Layout
      toolbarContent={toolbarContent}
      menuContent={menuContent}
      menuHeader={
        <Typography variant={isMobile ? "subtitle1" : "h6"}>Menu</Typography>
      }
      menuFooter={menuFooter}
      menuWidth={isMobile ? 180 : 240}
      collapsedWidth={isMobile ? 48 : 56}
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
  );
}
