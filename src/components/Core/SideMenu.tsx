import { ReactNode } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  styled,
  css,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface MenuComponentProps {
  content: JSX.Element;
  style?: React.CSSProperties;
}
type SideMenuProps = {
  open?: boolean;
  variant?: "permanent" | "temporary";
  onToggle?: (b: boolean) => void;
  direction?: "left" | "right";
  width?: number;
  collapsedWidth?: number;
  children: ReactNode;
  header?: MenuComponentProps;
  footer?: MenuComponentProps;
  contentStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  defaultOpen?: boolean;
};

const SmoothDrawer = styled(Drawer)(
  ({ theme }) => css`
    & .MuiDrawer-paper {
      z-index: ${theme.zIndex.drawer + 1}; /* always above AppBar */
      transition: all 0.3s ease-in-out;
      overflow-x: hidden;
      box-shadow: ${theme.shadows[4]};
      display: flex;
      flex-direction: column;
    }
  `
);

export default function SideMenu({
  open = true,
  variant = "permanent",
  direction = "left",
  width = 240,
  collapsedWidth = 56,
  children,
  header,
  footer,
  onToggle = () => {},
  contentStyle,
  drawerStyle,
}: SideMenuProps) {
  const theme = useTheme();

  return (
    <Box>
      {/* Collapsed Menu Toggle (shown when menu is hidden) */}
      {!open && (
        <IconButton
          onClick={() => onToggle(true)}
          sx={{
            position: "fixed",
            left: direction === "left" ? 8 : "auto",
            right: direction === "right" ? 8 : "auto",
            top: 8,
            zIndex: 1200,
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
              color: "black",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Main Drawer */}
      <SmoothDrawer
        variant={variant}
        anchor={direction}
        open={open}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            transition: "width 0.3s ease-in-out",
            width: open ? width : collapsedWidth,
            boxSizing: "border-box",
          },
          ...drawerStyle,
        }}
      >
        {/* Header Section (optional) */}
        {header && (
          <Box>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                p: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "48px",
                ...header.style,
              }}
            >
              {header.content}
            </Box>

            <Divider />
          </Box>
        )}

        {/* Scrollable Content */}
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
            ...contentStyle,
          }}
        >
          {open ? children : null}
        </Box>

        {/* Footer Section (optional) */}
        {footer && (
          <>
            <Divider />
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 1,
                backgroundColor: "background.paper",
                borderTop: "1px solid",
                borderColor: "divider",
                p: open ? 2 : 1,
                textAlign: open ? "left" : "center",
                ...footer.style,
              }}
            >
              {footer.content}
            </Box>
          </>
        )}
      </SmoothDrawer>
    </Box>
  );
}
