import { Note, NotePosition, NoteState } from "@repo/contracts";

// import { updateCurrentStickyNote } from "./updateCurrentStickyNote";

export function resizeStickyNote(
  currentNote: Note,
  eventPosition: NotePosition
) {
  if (currentNote.state !== NoteState.Resizing) return;

  const width = Math.max(eventPosition.x - currentNote.position.x, 10);
  const height = Math.max(eventPosition.y - currentNote.position.y, 10);

  // updateCurrentStickyNote({ width, height });
}
