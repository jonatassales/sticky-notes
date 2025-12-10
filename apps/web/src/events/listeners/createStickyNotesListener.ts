import { Note, NotePosition } from "@repo/contracts";
import { noteFactory } from "@web/factory";

interface StickyNotesListenerArgs {
  stickyNotesRef: React.RefObject<Note[]>;
  setStickyNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function createStickyNotesListener({
  stickyNotesRef,
  setStickyNotes,
}: StickyNotesListenerArgs) {
  return function onMouseDown(event: MouseEvent) {
    const prevNotes = stickyNotesRef.current;
    const position: NotePosition = { x: event.clientX, y: event.clientY };

    setStickyNotes((stickyNotes) => [
      ...stickyNotes,
      noteFactory({
        position,
        prevNotes,
      }),
    ]);
  };
}
