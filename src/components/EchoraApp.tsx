import { useNavigate } from "react-router-dom";
import StoryEditorPage from "../pages/StoryEditorPage";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import AIAppLayout from "./Core/AIAppLayout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExitToApp, Person, Settings, Star } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function EchoraApp({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userPlan =
    useAppSelector((state: RootState) => state.auth.user?.plan) || "Free";

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
    <Box>
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
    </Box>
  );

  const menuContent = (
    <List dense={isMobile}>
      {["Dashboard", "Characters", "Campaigns", "Library"].map((text) => (
        <ListItemButton key={text} sx={{ py: isMobile ? 0.5 : 1 }}>
          <ListItemIcon sx={{ minWidth: isMobile ? "36px" : "40px" }}>
            <Star fontSize={isMobile ? "small" : "medium"} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{text}</Typography>}
          />
        </ListItemButton>
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
    <AIAppLayout
      showLeftSideMenu
      leftMenuComponents={{
        footer: menuFooter,
        header: (
          <Typography variant={isMobile ? "subtitle1" : "h6"}>Menu</Typography>
        ),
        content: menuContent,
        collapsedWidth: 0,
        defaultOpen: false,
      }}
      toolbarContent={toolbarContent}
      contentStyle={{
        // Use theme colors for the gradient:
        backgroundImage: `linear-gradient(
                      135deg,
                      ${theme.palette.primary.dark} 0%,
                      ${theme.palette.secondary.light} 100%
                    )`,
        color: theme.palette.common.white,
      }}
    >
      {children}
    </AIAppLayout>
  );
}
