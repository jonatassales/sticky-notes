import { Note, NotePosition, NoteState } from "@repo/contracts";

interface DragEventListenerArgs {
  event: MouseEvent;
  note: Note;
  setStickyNotes: (value: React.SetStateAction<Note[]>) => void;
}

export function dragEventListener({
  event,
  note,
  setStickyNotes,
}: DragEventListenerArgs) {
  const position: NotePosition = { x: event.clientX, y: event.clientY };
  const newNote = { ...note, position, state: NoteState.Dragging };

  setStickyNotes((prevNotes) =>
    prevNotes.map((prevNote) => (prevNote.id === note.id ? newNote : prevNote))
  );
}
