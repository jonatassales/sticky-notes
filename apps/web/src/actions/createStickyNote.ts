import { v4 as uuid } from "uuid";

import { Note, NoteState } from "@repo/contracts";
import { currentStickyNote, stickyNotes } from "@web/atoms";

import { generateElevation } from "@web/utils";

export function createStickyNote(startX: number, startY: number) {
  const note: Note = {
    id: uuid(),
    position: { x: startX, y: startY },
    state: NoteState.Creating,
    width: 216,
    height: 216,
    elevation: generateElevation(),
  };

  currentStickyNote.value = note;
  stickyNotes.value = [...stickyNotes.value, note];
}
