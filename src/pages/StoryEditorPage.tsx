import { useMemo } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import SlateEditor from "../components/Editor/SlateEditor";

export default function StoryEditorPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        px: { xs: 2, md: 8 }, // responsive horizontal padding
        py: 4,
        pt: 8,
        paddingLeft: { xs: "2%", md: "10%" }, // remove left padding on mobile
        paddingRight: { xs: "2%", md: "10%" }, // remove left padding on mobile
      }}
    >
      {/* Editor container */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
          p: 3,
          // ensure child <Box> (editor) fills this
          display: "flex",
          flexDirection: "column",
          mt: 3,
        }}
      >
        <SlateEditor />
      </Box>
    </Box>
  );
}
