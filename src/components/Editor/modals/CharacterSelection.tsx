import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  Button,
  TextField,
  List,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { Character } from "../../../types/entities";
import { addCharacters } from "../../../store/slices/editorSlice";
import BaseModal from "../../Core/BaseModal";

interface Props {
  open: boolean;
  setOpenModal: (open: boolean) => void;
}

const CharacterSelectionModal: React.FC<Props> = ({ open, setOpenModal }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const characters = useSelector((state: RootState) => state.characters.list);
  const editorState = useSelector((state: RootState) => state.editor);
  const [selectedChars, setSelectedChars] = useState<Character[]>(
    Object.values(editorState.selectedCharacters)
  );

  useEffect(() => {
    // Update selected characters when editor state changes
    setSelectedChars(Object.values(editorState.selectedCharacters));
  }, [editorState.selectedCharacters]);

  // Toggle character selection
  const handleToggle = (char: Character) => {
    setSelectedChars((prev) => {
      const exists = prev.find((c) => c.id === char.id);
      if (exists) return prev.filter((c) => c.id !== char.id);
      return [...prev, char];
    });
  };

  // Filter based on search
  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = () => {
    dispatch(addCharacters(selectedChars));
    setSearchTerm("");
    setOpenModal(false);
  };

  const content = (
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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">Select Characters</Typography>
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </Box>

      {/* Search Input */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
      </Box>

      <Divider />

      {/* List of characters with checkboxes */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List dense>
          {filtered.map((char) => (
            <ListItemButton key={char.id} onClick={() => handleToggle(char)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!selectedChars.find((c) => c.id === char.id)}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={char.name} secondary={char.description} />
            </ListItemButton>
          ))}
          {filtered.length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No characters found.
              </Typography>
            </Box>
          )}
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="text" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={selectedChars.length === 0}
            onClick={handleConfirm}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <BaseModal open={open} onClose={() => setOpenModal(false)}>
      {content}
    </BaseModal>
  );
};

export default CharacterSelectionModal;
