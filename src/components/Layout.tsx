import { ReactNode } from "react";
import { Box } from "@mui/material";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";

type LayoutProps = {
  children: ReactNode;
  menuContent?: ReactNode;
  menuHeader?: ReactNode;
  menuFooter?: ReactNode;
  toolbarContent?: ReactNode;
  showToolbar?: boolean;
  menuDirection?: "left" | "right";
  menuOpen?: boolean;
  menuWidth?: number;
  collapsedWidth?: number;
};

export default function Layout({
  children,
  menuContent,
  menuHeader,
  menuFooter,
  toolbarContent,
  showToolbar = true,
  menuDirection = "left",
  menuOpen = true,
  menuWidth = 240,
  collapsedWidth = 56,
}: LayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        "& .MuiDrawer-paper": {
          position: "fixed", // Fix for mobile viewport
          height: "100vh", // Full viewport height
        },
      }}
    >
      <SideMenu
        direction={menuDirection}
        header={menuHeader}
        footer={menuFooter}
        defaultOpen={menuOpen}
        width={menuWidth}
        collapsedWidth={collapsedWidth}
      >
        {menuContent}
      </SideMenu>
      <MainContent showToolbar={showToolbar} toolbarContent={toolbarContent}>
        {children}
      </MainContent>
    </Box>
  );
}
