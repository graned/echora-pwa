import { ReactNode, useState } from "react";
import { Box, useMediaQuery, useTheme, Toolbar } from "@mui/material";

import SideMenu from "./SideMenu";

interface MenuComponentProps {
  header?: {
    content: JSX.Element;
  };
  footer?: {
    content: JSX.Element;
  };
  content: JSX.Element;
  defaultOpen?: boolean;
  width?: number;
  collapsedWidth?: number;
  openState: boolean;
  onToggle: (shouldOpen: boolean) => void;
  style?: React.CSSProperties;
}

export interface AIAppLayoutProps {
  showLeftSideMenu?: boolean;
  showRightSideMenu?: boolean;
  leftMenuComponents?: MenuComponentProps;
  rightMenuComponents?: MenuComponentProps;
  toolbarContent?: JSX.Element;
  contentStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
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
  drawerStyle = {},
}: AIAppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // AIAppLayout
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Side menu */}
      <Box
        sx={{
          ...drawerStyle,
        }}
      >
        {showLeftSideMenu && leftMenuComponents?.onToggle !== undefined && (
          <SideMenu
            direction="left"
            open={leftMenuComponents?.openState}
            header={leftMenuComponents?.header}
            footer={leftMenuComponents?.footer}
            defaultOpen={leftMenuComponents?.defaultOpen}
            width={leftMenuComponents?.width}
            collapsedWidth={leftMenuComponents?.collapsedWidth}
            onToggle={leftMenuComponents.onToggle}
            contentStyle={leftMenuComponents?.style}
          >
            {leftMenuComponents?.content}
          </SideMenu>
        )}

        {showRightSideMenu && rightMenuComponents?.onToggle !== undefined && (
          <SideMenu
            open={rightMenuComponents?.openState}
            direction="right"
            header={rightMenuComponents?.header}
            footer={rightMenuComponents?.footer}
            defaultOpen={rightMenuComponents?.defaultOpen}
            width={rightMenuComponents?.width}
            collapsedWidth={rightMenuComponents?.collapsedWidth}
            onToggle={rightMenuComponents.onToggle}
            contentStyle={rightMenuComponents?.style}
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
              // ml: leftMenuComponents?.openState
              //   ? `${leftMenuComponents?.width}px`
              //   : "0px",
              // mr: rightMenuComponents?.openState
              //   ? `${rightMenuComponents?.width}px`
              //   : "0px",
              // transition: "all 0.3s ease-in-out",
            }}
          >
            {/* Spacer pushes the next Box to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Right side: your toolbarContent */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                // mr: leftMenuComponents?.openState
                //   ? `${leftMenuComponents?.width}px`
                //   : "0px",
                // ml: rightMenuComponents?.openState
                //   ? `${rightMenuComponents?.width}px`
                //   : "0px",
              }}
            >
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
