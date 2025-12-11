import { Note, NotePosition } from "@repo/contracts";

interface DraggingListenerArgs {
  event: MouseEvent;
  note: Note;
  setStickyNotes: (value: React.SetStateAction<Note[]>) => void;
}

export function draggingListener({
  event,
  note,
  setStickyNotes,
}: DraggingListenerArgs) {
  const position: NotePosition = { x: event.clientX, y: event.clientY };

  setStickyNotes((prevNotes) =>
    prevNotes.map((prevNote) =>
      prevNote.id === note.id ? { ...prevNote, position } : prevNote
    )
  );
}
