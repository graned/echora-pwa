import { ReactNode, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  styled,
  css,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
} from "@mui/icons-material";

type SideMenuProps = {
  direction?: "left" | "right";
  width?: number;
  collapsedWidth?: number;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  defaultOpen?: boolean;
};

const SmoothDrawer = styled(Drawer)(
  ({ theme }) => css`
    & .MuiDrawer-paper {
      transition: all 0.3s ease-in-out;
      overflow-x: hidden;
      box-shadow: ${theme.shadows[4]};
      display: flex;
      flex-direction: column;
    }
  `
);

export default function SideMenu({
  direction = "left",
  width = 240,
  collapsedWidth = 56,
  children,
  header,
  footer,
  defaultOpen = true,
}: SideMenuProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const ChevronIcon = open === true ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* Collapsed Menu Toggle (shown when menu is hidden) */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            left: direction === "left" ? 8 : "auto",
            right: direction === "right" ? 8 : "auto",
            top: 8,
            zIndex: 1200,
            backgroundColor: "background.paper",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "background.default",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Main Drawer */}
      <SmoothDrawer
        variant="permanent"
        anchor={direction}
        open={open}
        sx={{
          width: open ? width : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? width : collapsedWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Header Section (optional) */}
        {header && (
          <>
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
              }}
            >
              {open ? (
                <>
                  <Box sx={{ flexGrow: 1 }}>{header}</Box>
                  <Tooltip title="Collapse menu">
                    <IconButton onClick={() => setOpen(false)} size="small">
                      <ChevronIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Expand menu">
                  <IconButton
                    onClick={() => setOpen(true)}
                    size="small"
                    sx={{ mx: "auto" }}
                  >
                    <ChevronIcon
                      sx={{
                        transform:
                          direction === "right" ? "rotate(180deg)" : "none",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Divider />
          </>
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
              }}
            >
              {open && footer}
            </Box>
          </>
        )}
      </SmoothDrawer>
    </>
  );
}
