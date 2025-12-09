import { Note } from "@repo/contracts";
import { stickyNotes, currentStickyNote } from "@web/atoms";

export function updateCurrentStickyNote(partial: Partial<Note>) {
  if (!currentStickyNote.value) return;

  const updated = { ...currentStickyNote.value, ...partial };
  currentStickyNote.value = updated;

  stickyNotes.value = stickyNotes.value.map((note) =>
    note.id === updated.id ? updated : note
  );
}
