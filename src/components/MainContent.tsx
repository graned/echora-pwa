import { ReactNode } from "react";
import { Box, Toolbar, Avatar, useMediaQuery, useTheme } from "@mui/material";

type MainContentProps = {
  children: ReactNode;
  showToolbar?: boolean;
  toolbarContent?: ReactNode;
  userAvatarUrl?: string;
};

export default function MainContent({
  children,
  showToolbar = true,
  toolbarContent,
  userAvatarUrl,
}: MainContentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: "100%",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      {showToolbar && (
        <Toolbar
          sx={{
            position: "fixed",
            top: 0,
            zIndex: 1100,
            width: "100%",
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            display: "block",
            alignItems: "center",
            px: 2,
            minHeight: "56px !important",
          }}
        >
          {/* Left side: Avatar */}
          {userAvatarUrl && (
            <Avatar
              src={userAvatarUrl}
              sx={{
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
                mr: 2,
              }}
            />
          )}

          {/* Spacer pushes the next Box to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right side: your toolbarContent */}
          <Box sx={{ display: "flex", gap: 1 }}>{toolbarContent}</Box>
        </Toolbar>
      )}

      {children}
    </Box>
  );
}
