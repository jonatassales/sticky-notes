import { NotePosition } from "./NotePosition";

export interface CreateNote {
  content: string;
  elevation: string;
  width: string;
  height: string;
  position: NotePosition;
}
