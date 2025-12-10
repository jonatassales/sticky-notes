import { Note, NoteState } from "@repo/contracts";

interface CreateCurrentStickyNoteArgs {
  setCurrentStickyNote: React.Dispatch<React.SetStateAction<Note | null>>;
  stickyNotesRef: React.RefObject<Note[]>;
}

export function createCurrentStickyNoteListener({
  setCurrentStickyNote,
  stickyNotesRef,
}: CreateCurrentStickyNoteArgs) {
  return function onMouseDown(_: globalThis.MouseEvent) {
    const notes = stickyNotesRef.current;
    const lastNote = notes[notes.length - 1];

    setCurrentStickyNote({
      ...lastNote,
      state: NoteState.Stale,
    });
  };
}
