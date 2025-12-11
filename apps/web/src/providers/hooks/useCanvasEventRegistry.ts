import { useEffect, useRef } from "react";
import { Note } from "@repo/contracts";
import { noteFactory } from "@web/factory";

import { useStickyNotes } from "./useStickyNotes";

export function useCanvasEventRegistry() {
  const { stickyNotes, setStickyNotes } = useStickyNotes();

  const stickyNotesRef = useRef<Note[]>([]);

  useEffect(() => {
    stickyNotesRef.current = stickyNotes;
  }, [stickyNotes]);

  useEffect(() => {
    const notes = stickyNotesRef.current;

    const onMouseDownHandler = (event: MouseEvent) => {
      const position = { x: event.x, y: event.y };
      const newNote = noteFactory({ notes, position });

      setStickyNotes((prevNotes) => [...prevNotes, newNote]);
    };

    document.addEventListener("mousedown", onMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", onMouseDownHandler);
    };
  }, []);
}
