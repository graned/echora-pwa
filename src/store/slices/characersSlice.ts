// store/charactersSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharactersState } from "../../types/states";
import { Character } from "../../types/entities";

const initialState: CharactersState = {
  list: [
    {
      id: "1",
      name: "Aric the Brave",
      code: "aric_the_brave",
      description: "Warrior from the north",
    },
    {
      id: "2",
      name: "Liora the Wise",
      code: "liora_the_wise",
      description: "Scholar and mage",
    },
    {
      id: "3",
      name: "Garrick the Strong",
      description: "Blacksmith and fighter",
      code: "garrick_the_strong",
    },
    {
      id: "4",
      name: "Elara the Swift",
      description: "Rogue and scout",
      code: "elara_the_swift",
    },
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
  extraReducers: (builder) => {
    builder.addCase(findCharacterByCode.fulfilled, (state, action) => {
      const character = action.payload;
      if (character) {
        state.list.push(character);
      }
    });
  },
});

export const findCharacterByCode = createAsyncThunk(
  "characters/findCharacterByCode",
  async (code: string) => {
    const character = charactersSlice
      .getInitialState()
      .list.find((char) => char.code === code);
    return character;
  }
);

export const { addCharacter, removeCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
