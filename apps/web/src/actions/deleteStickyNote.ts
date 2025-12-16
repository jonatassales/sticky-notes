import { Note } from "@repo/contracts";

export async function deleteStickyNote(noteId: Note["id"]) {
  console.log("deleting...", noteId);
}
