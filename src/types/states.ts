import { Character, Dialog } from "./entities";

export interface EditorState {
  content: string;
  selectedCharacters: Record<string, Character>;
}

export interface CharactersState {
  list: Character[];
}
