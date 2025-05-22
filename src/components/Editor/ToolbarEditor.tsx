import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  Box,
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import { Search, Close, PersonAdd, GraphicEq } from "@mui/icons-material";
import { ReactEditor } from "slate-react";
import { CharacterElement } from "../../types/entities";
import { Range, Transforms } from "slate";

interface Character {
  id: string;
  name: string;
  description?: string;
  code: string;
}

interface ToolbarProps {
  editor: ReactEditor;
  onSynth?: () => void;
}

const ToolbarEditor: React.FC<ToolbarProps> = ({
  editor,
  onSynth,
}: ToolbarProps) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const characters = useSelector((state: RootState) => state.characters.list);

  const handleSelectCharacter = (character: Character) => {
    if (!selectedCharacters.some((c) => c.id === character.id)) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
    setOpenModal(false);
    setSearchTerm("");
  };

  const handleRemoveCharacter = (id: string) => {
    setSelectedCharacters(selectedCharacters.filter((c) => c.id !== id));
  };

  // Wrap selection in a Character element
  const insertCharacter = (char: { id: string; name: string }) => {
    const { selection } = editor;
    if (!selection || Range.isCollapsed(selection)) return;
    const element: CharacterElement = {
      type: "character",
      characterId: char.id,
      name: char.name,
      children: [],
    };
    Transforms.wrapNodes(editor, element, { split: true, at: selection });
    Transforms.collapse(editor, { edge: "end" });
  };

  return (
    <Box>
      {/* Toolbar Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PersonAdd />}
          onClick={() => setOpenModal(true)}
          sx={{ textTransform: "none" }}
        >
          Add Character
        </Button>
        <Button
          variant="outlined"
          startIcon={<GraphicEq />}
          onClick={onSynth}
          sx={{ textTransform: "none" }}
        >
          Synth
        </Button>
      </Box>

      {/* Selected Characters Display */}
      <Box
        sx={{
          flex: 1,
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          pt: 1,
        }}
      >
        {selectedCharacters.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {selectedCharacters.map((char) => (
              <Chip
                key={char.id}
                label={char.name}
                onDelete={() => handleRemoveCharacter(char.id)}
                sx={{
                  border: "1px solid #A7D0CD",
                  cursor: "pointer",
                }}
                onClick={() => insertCharacter(char)}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No characters selected
          </Typography>
        )}
      </Box>

      {/* Character Selection Modal */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSearchTerm("");
        }}
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
            <Typography variant="h6">Select Character</Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            {characters.length > 0 ? (
              <List dense>
                {characters.map((char) => (
                  <ListItem
                    key={char.id}
                    button
                    onClick={() => handleSelectCharacter(char)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#A7D0CD",
                        color: "black",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ "&:hover": { color: "black" } }}>
                          {char.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ "&:hover": { color: "black" } }}>
                          {char.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Search sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {searchTerm
                    ? "No characters match your search"
                    : "No characters available"}
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          <Box sx={{ p: 2, textAlign: "center" }}>
            <Button
              variant="text"
              startIcon={<PersonAdd />}
              onClick={() => {
                // Create New Character logic here
                console.log("Create new character");
              }}
              sx={{ textTransform: "none" }}
            >
              Create New Character
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default ToolbarEditor;
