import { Note } from "@repo/contracts";
import { noteFactory } from "@web/factory";

interface CurrentStickyNotesListenerArgs {
  stickyNotes: Note[];
  setCurrentStickyNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export function createCurrentStickyNoteListener({
  setCurrentStickyNote,
  stickyNotes,
}: CurrentStickyNotesListenerArgs) {
  return function onMouseDown(event: MouseEvent) {
    setCurrentStickyNote(
      noteFactory({
        position: {
          x: event.x,
          y: event.y,
        },
        prevNotes: stickyNotes,
      })
    );
  };
}
