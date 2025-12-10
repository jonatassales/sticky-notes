import { Note, NotePosition, NoteState } from "@repo/contracts";
// import { stickyNotes } from "@web/atoms";

export function moveStickyNote(currentNote: Note, newPosition: NotePosition) {
  const hasEventPosition = !!newPosition.x && !!newPosition.y;

  if (
    !currentNote ||
    currentNote.state !== NoteState.Dragging ||
    !hasEventPosition
  )
    return;

  // stickyNotes.value = stickyNotes.value.map((note) => {
  //   if (note.id === currentNote.id && hasEventPosition) {
  //     return {
  //       ...note,
  //       position: newPosition,
  //     };
  //   }
  //   return note;
  // });
}
