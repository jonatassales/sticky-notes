import { Note } from "./Note";
import { NotePosition } from "./NotePosition";

export interface PlaceNote {
  id: Note["id"];
  position: NotePosition;
}
