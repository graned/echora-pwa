import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Button, Chip, Typography } from "@mui/material";
import { PersonAdd, GraphicEq } from "@mui/icons-material";
import { ReactEditor } from "slate-react";
import { CharacterElement } from "../../types/entities";
import { Range, Transforms } from "slate";
import CharacterSelectionModal from "./modals/CharacterSelection";
import { removeCharacter } from "../../store/slices/editorSlice";

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
  const editorState = useSelector((state: RootState) => state.editor);

  const handleRemoveCharacter = (id: string) => {
    dispatch(removeCharacter({ id }));
  };

  // Wrap selection in a Character element
  const insertCharacter = (char: Character) => {
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
        {Object.values(editorState.selectedCharacters).length > 0 ? (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {Object.values(editorState.selectedCharacters).map((char) => (
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
      <CharacterSelectionModal open={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
};

export default ToolbarEditor;
