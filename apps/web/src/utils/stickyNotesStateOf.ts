import { NoteState, Note } from "@repo/contracts";

interface StickyNotesStateOfArgs {
  state: NoteState;
  prevNotes: Note[];
  note: Note;
}

export function stickyNotesStateOf({
  state,
  prevNotes,
  note,
}: StickyNotesStateOfArgs) {
  return prevNotes.map((prevNote) => {
    if (note.id !== prevNote.id) return prevNote;

    return { ...note, state };
  });
}
