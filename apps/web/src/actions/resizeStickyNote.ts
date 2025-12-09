import { NoteState } from "@repo/contracts";
import { currentStickyNote } from "@web/atoms";
import { updateCurrentStickyNote } from "./updateCurrentStickyNote";

export function resizeStickyNote(event: React.MouseEvent<HTMLDivElement>) {
  const note = currentStickyNote.value;
  if (!note || note.state !== NoteState.Creating) return;

  const width = Math.max(event.clientX - note.position.x, 10);
  const height = Math.max(event.clientY - note.position.y, 10);

  updateCurrentStickyNote({ width, height });
}
