import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Toolbar,
  styled,
  css,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Person,
  Settings,
  ExitToApp,
  Star,
} from "@mui/icons-material";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SmoothDrawer = styled(Drawer)(
  ({ theme }) => css`
    & .MuiDrawer-paper {
      transition: all 0.3s ease-in-out;
      overflow-x: hidden;
      box-shadow: ${theme.shadows[4]};
    }
  `
);

const MenuContent = styled(Box)(
  ({ theme }) => css`
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
  `
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Drawer with Smooth Animation */}
      <SmoothDrawer
        variant="permanent"
        open={leftOpen}
        sx={{
          width: leftOpen ? 240 : 56,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: leftOpen ? 240 : 56,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Sticky Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            p: 1,
          }}
        >
          <MenuContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: leftOpen ? 240 : 56,
            }}
          >
            {leftOpen && (
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  px: 2,
                  transition: "opacity 0.2s ease-in-out",
                  opacity: leftOpen ? 1 : 0,
                }}
              >
                Menu
              </Typography>
            )}
            <IconButton
              onClick={() => setLeftOpen(!leftOpen)}
              sx={{
                transform: leftOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <ChevronLeft />
            </IconButton>
          </MenuContent>
        </Box>

        {/* Scrollable Body */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "grey.700",
              borderRadius: 2,
            },
          }}
        >
          <List>
            {["Dashboard", "Characters", "Campaigns", "Library"].map((text) => (
              <ListItem
                button
                key={text}
                sx={{
                  transition: "padding 0.3s ease-in-out",
                  px: leftOpen ? 3 : 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: leftOpen ? 56 : 40 }}>
                  <Star />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: leftOpen ? 1 : 0,
                    transition: "opacity 0.2s ease-in-out",
                    overflow: "hidden",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Sticky Footer */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            p: 2,
          }}
        >
          <Button
            fullWidth
            startIcon={<Star />}
            sx={{
              justifyContent: leftOpen ? "flex-start" : "center",
              px: leftOpen ? 2 : 0,
              transition: "all 0.3s ease-in-out",
              minWidth: "auto",
            }}
          >
            <Box
              sx={{
                opacity: leftOpen ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              <Typography variant="body2">Current Plan</Typography>
              <Typography variant="subtitle2">Premium</Typography>
            </Box>
          </Button>
        </Box>
      </SmoothDrawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* App Header */}
        <Toolbar
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setLeftOpen(!leftOpen)}
            sx={{
              transform: leftOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                transition: "all 0.3s ease-in-out",
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Toolbar>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
