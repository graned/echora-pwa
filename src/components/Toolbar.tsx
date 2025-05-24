import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  AddToPhotos,
  MenuOpen,
  Menu as MenuIcon,
  Person,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

import { logout } from "../store/slices/authSlice";

export interface ToolbarProps {
  isMobile: boolean;
  menuOpen: boolean;
  ontoogleMenu: (b: boolean) => void;
  onNewProject: () => void;
}
export default function Toolbar({
  isMobile,
  menuOpen,
  onNewProject,
  ontoogleMenu,
}: ToolbarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPlan =
    useAppSelector((state: RootState) => state.auth.user?.plan) || "Free";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  const newProjectButton = (
    <Button onClick={() => onNewProject()} color="inherit">
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <AddToPhotos />
        <Typography variant="caption">New Project</Typography>
      </Box>
    </Button>
  );
  return (
    <>
      <Box>
        {/* Left: Menu button */}
        <IconButton
          edge="start"
          onClick={() => ontoogleMenu(!menuOpen)}
          color="inherit"
          aria-label="open drawer"
        >
          {menuOpen ? <MenuOpen /> : <MenuIcon />}
        </IconButton>
        {!isMobile && newProjectButton}
      </Box>
      {isMobile && newProjectButton}
      {/* Right: Notifications + User avatar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton color="inherit">
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
        </IconButton>
      </Box>
    </>
  );
}
