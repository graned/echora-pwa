// components/LeftMenuFooter.tsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";
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

  const planColor = planColors[userPlan] || theme.palette.text.primary;
  const onOpenPlans = () => {};

  return (
    <Box sx={{ p: 1 }}>
      <Button
        fullWidth
        onClick={onOpenPlans}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          py: paddingY,
        }}
      >
        <Box sx={{ textAlign: "left" }}>
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
