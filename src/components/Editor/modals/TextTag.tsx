import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  createEditor,
  Transforms,
  Element as SlateElement,
  Descendant,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CharacterElement } from "../../../types/entities";
import BaseModal from "../../Core/BaseModal";

type CustomElement =
  | CharacterElement
  | { type: "paragraph"; children: Descendant[] };

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
  }
}

interface Props {
  open: boolean;
  moods: string[];
  mood: string;
  bgColor: string;
  unassign: () => void;
  onClose: () => void;
  onApply: () => void;
  setMood: (mood: string) => void;
  setBgColor: (bgColor: string) => void;
}

export default function TextTagModal({
  open,
  moods,
  mood,
  bgColor,
  unassign,
  onClose,
  onApply,
  setMood,
  setBgColor,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const editor = useMemo(() => {
  //   const e = withHistory(withReact(createEditor())) as ReactEditor;
  //   // Make 'character' elements inline so they don't break lines
  //   const { isInline } = e;
  //   e.isInline = (element) =>
  //     element.type === "character" ? true : isInline(element);
  //   return e;
  // }, []);

  // const [mood, setMood] = useState<string>("");
  // const [bgColor, setBgColor] = useState<string>("#ffffff");

  // // Apply mood and background
  // const applyAttrs = () => {
  //   if (currentPath) {
  //     Transforms.setNodes(editor, { mood, bgColor } as any, {
  //       at: currentPath,
  //     });
  //   }
  //   onClose();
  // };

  return (
    <BaseModal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: isMobile ? "100%" : 400,
          maxWidth: "100%",
          maxHeight: isMobile ? "90vh" : "80vh",
          display: "flex",
          flexDirection: "column",
          p: isMobile ? "5%" : "2%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Dialog</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          select
          label="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          sx={{ mt: 2 }}
        >
          {moods.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Background Color
          </Typography>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ width: "100%", height: 36, border: "none" }}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={onApply} sx={{ flex: 1 }}>
            Apply
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={unassign}
            sx={{ flex: 1 }}
          >
            Unassign
          </Button>
        </Box>
      </Paper>
    </BaseModal>
  );
}
