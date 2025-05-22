import { ReactNode, useState } from "react";
import { Box, useMediaQuery, useTheme, Toolbar } from "@mui/material";

import SideMenu from "./SideMenu";

interface MobileMenuContent {
  label: string;
  value: string;
  icon: ReactNode;
  navPath: string;
}
interface MenuComponentProps {
  header?: ReactNode;
  footer?: ReactNode;
  content: JSX.Element;
  defaultOpen?: boolean;
  width?: number;
  collapsedWidth?: number;
}

export interface AIAppLayoutProps {
  showLeftSideMenu?: boolean;
  showRightSideMenu?: boolean;
  leftMenuComponents?: MenuComponentProps;
  rightMenuComponents?: MenuComponentProps;
  toolbarContent?: JSX.Element;
  contentStyle?: React.CSSProperties;
  children: ReactNode;
}

export default function AIAppLayout({
  children,
  showLeftSideMenu = true,
  showRightSideMenu = false,
  leftMenuComponents,
  rightMenuComponents,
  toolbarContent,
  contentStyle,
}: AIAppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [leftMenuOpen, setLeftMenuOpen] = useState<boolean>(false);
  const [rightMenuOpen, setRightMenuOpen] = useState<boolean>(false);

  // Determine how much to offset from each side:
  const leftOffset = showLeftSideMenu ? (leftMenuOpen ? 240 : 0) : 0;
  const rightOffset = showRightSideMenu ? (rightMenuOpen ? 240 : 0) : 0;
  // AIAppLayout
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        "& .MuiDrawer-paper": {
          position: "fixed", // Fix for mobile viewport
          height: "100vh", // Full viewport height
        },
      }}
    >
      {/* Side menu */}
      <Box>
        {showLeftSideMenu && (
          <SideMenu
            direction="left"
            open={leftMenuOpen}
            header={leftMenuComponents?.header}
            footer={leftMenuComponents?.footer}
            defaultOpen={leftMenuComponents?.defaultOpen}
            width={leftMenuComponents?.width}
            collapsedWidth={leftMenuComponents?.collapsedWidth}
            onToggle={setLeftMenuOpen}
          >
            {leftMenuComponents?.content}
          </SideMenu>
        )}

        {showRightSideMenu && (
          <SideMenu
            open={rightMenuOpen}
            direction="right"
            header={rightMenuComponents?.header}
            footer={rightMenuComponents?.footer}
            defaultOpen={rightMenuComponents?.defaultOpen}
            width={rightMenuComponents?.width}
            collapsedWidth={rightMenuComponents?.collapsedWidth}
            onToggle={setRightMenuOpen}
          >
            {rightMenuComponents?.content}
          </SideMenu>
        )}
      </Box>
      {/* Toolbar */}
      <Box>
        {!isMobile && (
          <Toolbar
            sx={{
              position: "fixed",
              top: 0,
              zIndex: 1100,
              width: "100%",
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "block",
              alignItems: "center",
              px: 2,
              minHeight: "56px !important",
            }}
          >
            {/* Spacer pushes the next Box to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Right side: your toolbarContent */}
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              {toolbarContent}
            </Box>
          </Toolbar>
        )}
      </Box>
      {/* MainContent */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // mt: !isMobile ? "56px" : 0, // push below toolbar
          overflow: "auto",
          ...contentStyle,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
