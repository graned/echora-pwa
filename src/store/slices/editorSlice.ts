// editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  id: string;
  name: string;
  description?: string;
  code: string;
}

interface EditorState {
  content: string;
  selected: {
    start: number;
    end: number;
  } | null;
}

const initialState: EditorState = {
  content: "",
  selected: null,
};

function replaceBetween(
  origin: string,
  startIndex: number,
  endIndex: number,
  insertion: string
): string {
  return (
    origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
  );
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    tagSelectedText: (state, action: PayloadAction<Character>) => {
      const subText = state.content.substring(
        state.selected?.start || 0,
        state.selected?.end || 0
      );

      const tagged = `<${action.payload.code} class="tag">${subText}</${action.payload.code}>`;
      state.content = replaceBetween(
        state.content,
        state.selected?.start || 0,
        state.selected?.end || 0,
        tagged
      );
    },
    setSelection: (
      state,
      action: PayloadAction<{ start: number; end: number } | null>
    ) => {
      state.selected = action.payload;
    },
  },
});

export const { updateContent, tagSelectedText, setSelection } =
  editorSlice.actions;
export default editorSlice.reducer;
