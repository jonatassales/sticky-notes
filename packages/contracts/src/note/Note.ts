import { NoteState } from "./enum/NoteState";
import { NotePosition } from "./NotePosition";

export interface Note {
  id: string;
  content: string;
  elevation: string;
  width: string;
  height: string;
  position: NotePosition;
  state: NoteState;
}
