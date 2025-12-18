import { Note, NoteState } from "@repo/contracts";

interface ResizeEventListenerArgs {
  event: MouseEvent;
  note: Note;
  setStickyNotes: (value: React.SetStateAction<Note[]>) => void;
}

export function resizeEventListener({
  event,
  note,
  setStickyNotes,
}: ResizeEventListenerArgs) {
  setStickyNotes((prevNotes) =>
    prevNotes.map((prevNote) => {
      const width = Math.max(event.clientX - prevNote.position.x, 50);
      const height = Math.max(event.clientY - prevNote.position.y, 50);
      const newNote = { ...prevNote, width, height, state: NoteState.Resizing };

      return prevNote.id === note.id ? newNote : prevNote;
    })
  );
}
