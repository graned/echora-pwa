// components/LeftMenuFooter.tsx
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

interface LeftMenuFooterProps {
  isMobile: boolean;
}

/** Map plan names to a highlight color */
const planColors: Record<string, string> = {
  Free: "#888", // gray
  Pro: "#1976d2", // blue
  Enterprise: "#f9a825", // gold
};

export default function LeftMenuFooter({ isMobile }: LeftMenuFooterProps) {
  const theme = useTheme();
  const paddingY = isMobile ? theme.spacing(1) : theme.spacing(1.5);
  const userPlan =
    useAppSelector((state: RootState) => state.auth.user?.plan) || "Free";
  const tokensLeft = 800;

  const planColor = planColors[userPlan] || theme.palette.text.primary;
  const onOpenPlans = () => {};

  return (
    <Box sx={{ p: 1 }}>
      {/* Tokens Remaining Display */}
      <Box
        sx={{
          mt: 1,
          px: 1,
          gap: 2,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          Tokens Left
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.25 }}>
          {tokensLeft.toLocaleString()}
        </Typography>
      </Box>
      <Button
        fullWidth
        onClick={onOpenPlans}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          py: paddingY,
        }}
      >
        {/* User plan */}
        <Box
          sx={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="caption" color="textSecondary">
            Current Plan
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: planColor }}
          >
            {userPlan}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}
