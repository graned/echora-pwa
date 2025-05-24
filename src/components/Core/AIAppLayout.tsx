import { ReactNode } from "react";
import { Box, useTheme, Toolbar, AppBar } from "@mui/material";

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
  variant?: "permanent" | "temporary";
}

export interface AIAppLayoutProps {
  showLeftSideMenu?: boolean;
  showRightSideMenu?: boolean;
  leftMenuComponents?: MenuComponentProps;
  rightMenuComponents?: MenuComponentProps;
  toolbarComponent?: {
    content: JSX.Element;
    style: React.CSSProperties;
  };
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
  toolbarComponent,
  contentStyle,
  drawerStyle = {},
}: AIAppLayoutProps) {
  const theme = useTheme();

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
            variant={leftMenuComponents?.variant}
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
            variant={rightMenuComponents?.variant}
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
        <AppBar position="fixed" elevation={0} color="transparent">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              minHeight: 56,
              ...toolbarComponent?.style,
            }}
          >
            {toolbarComponent?.content}
          </Toolbar>
        </AppBar>
      </Box>
      {/* MainContent */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          ...contentStyle,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
