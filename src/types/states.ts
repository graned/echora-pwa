import { Character, Dialog } from "./entities";

export interface EditorState {
  content: string;
  dialogs: Record<string, Dialog>;
  preview: string;
  selected: {
    start: number;
    end: number;
  } | null;
}

export interface CharactersState {
  list: Character[];
}
