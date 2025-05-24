import { IconButton, Toolbar, Typography } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";

export interface LeftMenuHeaderProps {
  isMobile: boolean;
  onMenuToogle: (b: boolean) => void;
}
export default function LeftMenuHeader({
  isMobile,
  onMenuToogle,
}: LeftMenuHeaderProps) {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: isMobile ? "space-between" : "center",
        width: "100%",
        px: 2,
        minHeight: 56,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "'Courier Prime', monospace",
          fontWeight: 600,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        Echora
      </Typography>
      {isMobile ? (
        <IconButton onClick={() => onMenuToogle(false)}>
          <MenuOpen />
        </IconButton>
      ) : (
        <></>
      )}
    </Toolbar>
  );
}
