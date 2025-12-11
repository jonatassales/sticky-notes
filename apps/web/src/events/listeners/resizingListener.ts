import { Note, NotePosition } from "@repo/contracts";

interface DraggingListenerArgs {
  event: MouseEvent;
  note: Note;
  setStickyNotes: (value: React.SetStateAction<Note[]>) => void;
}

export function resizingListener({
  event,
  note,
  setStickyNotes,
}: DraggingListenerArgs) {
  setStickyNotes((prevNotes) =>
    prevNotes.map((prevNote) => {
      const width = Math.max(event.clientX - prevNote.position.x, 50);
      const height = Math.max(event.clientY - prevNote.position.y, 50);

      return prevNote.id === note.id
        ? {
            ...prevNote,
            width,
            height,
          }
        : prevNote;
    })
  );
}
