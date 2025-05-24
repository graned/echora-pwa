import AIAppLayout from "../components/Core/AIAppLayout";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ToolbarComponent from "../components/Toolbar";
import LeftMenuHeader from "../components/LeftMenu/Header";
import LeftMenuContent from "../components/LeftMenu/Content";
import LeftMenuFooter from "../components/LeftMenu/Footer";

export default function EchoraApp({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [leftMenuOpen, setLeftMenuOpen] = useState<boolean>(false);

  const onNewProject = () => {};

  return (
    <AIAppLayout
      showLeftSideMenu
      leftMenuComponents={{
        footer: {
          content: <LeftMenuFooter isMobile={isMobile} />,
        },
        header: {
          content: (
            <LeftMenuHeader
              isMobile={isMobile}
              onMenuToogle={setLeftMenuOpen}
            />
          ),
        },
        content: (
          <LeftMenuContent isMobile={isMobile} onNewProject={onNewProject} />
        ),
        collapsedWidth: 240,
        width: 240,
        defaultOpen: true,
        openState: leftMenuOpen,
        style: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
        },
        variant: isMobile ? "temporary" : "permanent",
      }}
      toolbarComponent={{
        content: (
          <ToolbarComponent
            isMobile={isMobile}
            menuOpen={leftMenuOpen}
            onNewProject={onNewProject}
            ontoogleMenu={setLeftMenuOpen}
          />
        ),
        style: {
          marginLeft: leftMenuOpen && !isMobile ? `${240}px` : "0px",
          transition: "margin 0.3s ease-in-out",
        },
      }}
      contentStyle={{
        // Use theme colors for the gradient:
        backgroundImage: `linear-gradient(
                      135deg,
                      ${theme.palette.primary.dark} 0%,
                      ${theme.palette.secondary.light} 100%
                    )`,
        color: theme.palette.common.white,
        marginLeft: leftMenuOpen && !isMobile ? "240px" : "0px",
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
      }}
      drawerStyle={{
        zIndex: leftMenuOpen ? 1200 : 0,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {children}
    </AIAppLayout>
  );
}
