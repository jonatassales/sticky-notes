import { Note, NotePosition } from "@repo/contracts";
import { stickyNotes } from "@web/atoms";

export function moveStickyNote(noteId: Note["id"], newPosition: NotePosition) {
  stickyNotes.value = stickyNotes.value.map((note) => {
    const hasEventPosition = !!newPosition.x && !!newPosition.y;

    if (note.id === noteId && hasEventPosition) {
      return {
        ...note,
        position: newPosition,
      };
    }
    return note;
  });
}
