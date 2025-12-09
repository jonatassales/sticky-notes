import { stickyNotes } from "@web/atoms";

export function generateElevation() {
  stickyNotes.value.length
    ? (
        parseInt(stickyNotes.value[stickyNotes.value.length - 1].elevation) + 1
      ).toString()
    : "1000";
}
