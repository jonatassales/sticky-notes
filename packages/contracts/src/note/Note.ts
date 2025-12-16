import { NoteState } from "./enum/NoteState";
import { NotePosition } from "./NotePosition";

export interface Note {
  id: string;
  content: string;
  elevation: string;
  width: number;
  height: number;
  position: NotePosition;
  state: NoteState;
}
