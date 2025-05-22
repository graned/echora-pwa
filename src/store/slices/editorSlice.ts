// editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../../types/states";
import { Character } from "../../types/entities";

const initialState: EditorState = {
  content: "",
  selectedCharacters: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters[action.payload.id] = action.payload;
    },
    addCharacters: (state, action: PayloadAction<Character[]>) => {
      action.payload.forEach((char) => {
        state.selectedCharacters[char.id] = char;
      });
    },
    removeCharacter: (state, action: PayloadAction<{ id: string }>) => {
      delete state.selectedCharacters[action.payload.id];
      console.log("Removed character:", action.payload.id);
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { updateContent, addCharacter, addCharacters, removeCharacter } =
  editorSlice.actions;
export default editorSlice.reducer;
