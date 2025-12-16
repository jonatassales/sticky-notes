import { useEffect, useRef } from "react";
import { Note, NotePosition } from "@repo/contracts";
import { noteFactory } from "@web/factory";
import { useStickyNotes } from "@web/providers/hooks";
import { saveStickyNote } from "@web/actions";

export function useCanvasEventRegistry() {
  const { stickyNotes, setStickyNotes } = useStickyNotes();

  useEffect(() => {
    const notes = stickyNotes;

    const onMouseDownHandler = (event: MouseEvent) => {
      const position: NotePosition = { x: event.x, y: event.y };
      const newNote: Note = noteFactory({ notes, position });

      setStickyNotes((prevNotes) => [...prevNotes, newNote]); // TODO: This won't be necessary once BE in responding
      saveStickyNote(newNote);
    };

    document.addEventListener("mousedown", onMouseDownHandler);

    return () => {
      document.removeEventListener("mousedown", onMouseDownHandler);
    };
  }, []);
}
