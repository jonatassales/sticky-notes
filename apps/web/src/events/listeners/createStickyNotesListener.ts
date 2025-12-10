import { Note } from "@repo/contracts";
import { noteFactory } from "@web/factory";

interface StickyNotesListenerArgs {
  setStickyNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function createStickyNotesListener({
  setStickyNotes,
}: StickyNotesListenerArgs) {
  return function onMouseDown(event: MouseEvent) {
    setStickyNotes((prev) => [
      ...prev,
      noteFactory({
        position: {
          x: event.x,
          y: event.y,
        },
        prevNotes: prev,
      }),
    ]);
  };
}
