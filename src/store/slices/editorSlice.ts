// editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../../types/states";

const initialState: EditorState = {
  content: "",
  preview: "",
  selected: null,
  dialogs: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { updateContent } = editorSlice.actions;
export default editorSlice.reducer;
