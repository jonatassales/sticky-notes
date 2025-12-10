import { Note, NotePosition } from "@repo/contracts";
import { noteFactory } from "@web/factory";

interface CreateCurrentStickyNoteArgs {
  setCurrentStickyNote: React.Dispatch<React.SetStateAction<Note | null>>;
  position: NotePosition;
}

export function createCurrentStickyNoteListener({
  setCurrentStickyNote,
  position,
}: CreateCurrentStickyNoteArgs) {
  return function onMouseDown() {
    // setCurrentStickyNote(noteFactory(position));
  };
}
