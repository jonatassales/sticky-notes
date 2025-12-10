import { Note } from "@repo/contracts";

export function generateElevation(stickyNotes: Note[]) {
  return stickyNotes.length
    ? (parseInt(stickyNotes[stickyNotes.length - 1].elevation) + 1).toString()
    : "1000";
}
