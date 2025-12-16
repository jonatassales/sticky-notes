import { Note } from "@repo/contracts";

import { Default } from "./enum/Default";

export function noteElevationFactory(stickyNotes: Note[]) {
  return stickyNotes.length
    ? stickyNotes[stickyNotes.length - 1].elevation + 1
    : Default.NoteStartElevation;
}
