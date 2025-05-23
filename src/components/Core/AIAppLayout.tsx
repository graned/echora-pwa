import { ReactNode, useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Toolbar,
  AppBar,
  IconButton,
} from "@mui/material";

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
        {showLeftSideMenu && (
          <SideMenu
            direction="left"
            open={leftMenuComponents?.openState}
            header={leftMenuComponents?.header}
            footer={leftMenuComponents?.footer}
            defaultOpen={leftMenuComponents?.defaultOpen}
            width={leftMenuComponents?.width}
            collapsedWidth={leftMenuComponents?.collapsedWidth}
            contentStyle={leftMenuComponents?.style}
          >
            {leftMenuComponents?.content}
          </SideMenu>
        )}

        {showRightSideMenu && (
          <SideMenu
            open={rightMenuComponents?.openState}
            direction="right"
            header={rightMenuComponents?.header}
            footer={rightMenuComponents?.footer}
            defaultOpen={rightMenuComponents?.defaultOpen}
            width={rightMenuComponents?.width}
            collapsedWidth={rightMenuComponents?.collapsedWidth}
            contentStyle={rightMenuComponents?.style}
          >
            {rightMenuComponents?.content}
          </SideMenu>
        )}
      </Box>
      {/* Toolbar */}
      <Box>
        {!isMobile && (
          <AppBar position="fixed" elevation={0} color="transparent">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                minHeight: 56,
                ml: leftMenuComponents?.openState
                  ? `${leftMenuComponents?.width}px`
                  : "0px",
                mr: rightMenuComponents?.openState
                  ? `${rightMenuComponents?.width}px`
                  : "0px",
                transition: "margin 0.3s ease-in-out",
              }}
            >
              {toolbarContent}
            </Toolbar>
          </AppBar>
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
