// pages/StoryEditorPage.tsx
import React, { useMemo } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import SlateEditor from "../components/Editor/SlateEditor";

// A handful of inspiring story‐starter quotes
const QUOTES = [
  "“Every story begins with a single spark of imagination.”",
  "“In the silence between words, worlds unfold.”",
  "“Write what you wish had happened.”",
  "“Let your heart guide your pen.”",
  "“Stories are the roads we travel in our minds.”",
  "“The next adventure lives on this page.”",
];

export default function StoryEditorPage() {
  const theme = useTheme();

  // Pick one quote per load
  const quote = useMemo(() => {
    const idx = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[idx];
  }, []);

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
      {/* Page quote */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Courier Prime', monospace",
          fontStyle: "italic",
          fontWeight: 400,
          mb: 3,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {quote}
      </Typography>

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
        }}
      >
        <SlateEditor />
      </Box>
    </Box>
  );
}
