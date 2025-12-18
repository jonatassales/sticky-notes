import { useEffect, useRef } from "react";
import { Note, NotePosition } from "@repo/contracts";
import { noteFactory } from "@web/factory";
import { useStickyNotes } from "@web/providers/hooks";
import { saveStickyNote } from "@web/actions";

export function useCanvasEventRegistry() {
  const { stickyNotes, setStickyNotes } = useStickyNotes();

  useEffect(() => {
    const onMouseDownHandler = (event: MouseEvent) => {
      const position: NotePosition = { x: event.x, y: event.y };

      setStickyNotes((prevNotes) => {
        const newNote: Note = noteFactory({ notes: prevNotes, position });
        saveStickyNote(newNote);
        return [...prevNotes, newNote];
      });
    };

    document.addEventListener("mousedown", onMouseDownHandler);

    return () => {
      document.removeEventListener("mousedown", onMouseDownHandler);
    };
  }, []);
}
