import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  id: string;
  name: string;
}

interface CharactersState {
  list: Character[];
}

const initialState: CharactersState = {
  list: [
    { id: "1", name: "Aric the Brave" },
    { id: "2", name: "Liora the Wise" },
    { id: "3", name: "Garrick the Strong" },
    { id: "4", name: "Elara the Swift" },
  ],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.list.push(action.payload);
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((char) => char.id !== action.payload);
    },
  },
});

export const { addCharacter, removeCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
