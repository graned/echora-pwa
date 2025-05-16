import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { RootState } from "../store/store";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const RetroEditorContainer = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  padding: "2rem",
  background: "#f8f5e6",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  borderRadius: "4px",
  border: "1px solid #e8e5d5",
});

const PreviewContainer = styled("div")({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  width: "100%",
  minHeight: "500px",
  border: "none",
  outline: "none",
  resize: "none",
  background: "transparent",
  fontFamily: '"Courier Prime", monospace',
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#333",
  padding: "1rem",
  caretColor: "#333",
  "& .tag": {
    transition: "all 0.2s",
    borderRadius: "2px",
    padding: "0 2px",
    display: "inline-block",
    cursor: "pointer",
  },
  "& .tag:hover": {
    backgroundColor: "rgba(200, 230, 255, 0.3)",
    outline: "1px dashed rgba(0, 0, 255, 0.5)",
  },
  "& .badge": {
    display: "inline-block",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "4px",
    padding: "0 4px",
    fontSize: "0.75rem",
    marginRight: "4px",
    verticalAlign: "middle",
    fontWeight: "bold",
  },
});

const convertTagsToSpans = (text: string) => {
  const decodedText = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  return decodedText.replace(
    /<([^ >]+)[^>]*?>([\s\S]*?)<\/\1>/g,
    (_match, tag, content) => {
      const cleanContent = content.trim();
      return `<br><span class="tag" data-character="${tag}" data-editable="true" title="${tag}"><span class="badge">${tag}</span>${cleanContent}</span>`;
    }
  );
};

const moodOptions = ["happy", "sad", "angry", "neutral"];

const EditorPreview: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [mood, setMood] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const selectedSpanRef = useRef<HTMLElement | null>(null);
  const content = useSelector((state: RootState) => state.editor.content);
  const htmlContent = convertTagsToSpans(content);

  useEffect(() => {
    const container = document.getElementById("preview-container");
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagSpan = target.closest(".tag[data-editable]") as HTMLElement;
      if (tagSpan) {
        const character = tagSpan.getAttribute("data-character");
        if (character) {
          setSelectedCharacter(character);
          selectedSpanRef.current = tagSpan;
          setModalOpen(true);
        }
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, []);

  const handleApply = () => {
    if (selectedSpanRef.current) {
      const rgbaColor = hexToRgba(bgColor, 0.3); // use alpha = 0.3
      selectedSpanRef.current.style.backgroundColor = rgbaColor;
      selectedSpanRef.current.setAttribute("data-mood", mood);
    }
    setModalOpen(false);
  };

  const hexToRgba = (hex: string, alpha = 0.3) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <>
      <RetroEditorContainer>
        <PreviewContainer
          id="preview-container"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </RetroEditorContainer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "400px",
            maxWidth: "90vw",
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6">
              Edit Character: {selectedCharacter}
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Background Color
              </Typography>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  background: "none",
                }}
              />
            </Box>
            <TextField
              fullWidth
              select
              label="Mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              sx={{ mt: 2 }}
            >
              {moodOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleApply}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default EditorPreview;
