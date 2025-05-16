import { ReactNode } from "react";
import { Box, Toolbar } from "@mui/material";

type MainContentProps = {
  children: ReactNode;
  showToolbar?: boolean;
  toolbarContent?: ReactNode;
};

export default function MainContent({
  children,
  showToolbar = true,
  toolbarContent,
}: MainContentProps) {
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
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            minHeight: "56px !important", // Fixed height for mobile
          }}
        >
          {toolbarContent}
        </Toolbar>
      )}
      {children}
    </Box>
  );
}
