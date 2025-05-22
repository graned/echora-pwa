import { Descendant } from "slate";

export interface Character {
  id: string;
  name: string;
  description?: string;
  code: string;
  bgColor?: string;
  mood?: string;
}

export interface Dialog {
  id: string;
  character: Character;
  text: string;
  start: number;
  end: number;
  html?: string;
}

// Define the Character element type
export type CharacterElement = {
  type: "character";
  characterId: string;
  name: string;
  mood?: string;
  bgColor?: string;
  children: Descendant[];
};
