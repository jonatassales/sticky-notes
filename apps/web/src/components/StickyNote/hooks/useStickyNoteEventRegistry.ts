import { Ref, useEffect, useRef } from "react";
import { useStickyNotes } from "@web/providers";
import { Note, NotePosition, NoteState } from "@repo/contracts";
import { stickyNotesStateOf } from "@web/utils";

export interface StickyNoteEventRegistryResult {
  noteRef: Ref<HTMLDivElement>;
  dragRef: Ref<HTMLButtonElement>;
  resizeRef: Ref<HTMLButtonElement>;
}

export function useStickyNoteEventRegistry(note: Note) {
  const { setStickyNotes } = useStickyNotes();

  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onMouseDownHandler = (event: MouseEvent) => {
      event.stopPropagation();
    };

    const onMouseResizeHandler = (event: MouseEvent) => {
      event.stopPropagation();

      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({
          state: NoteState.Resizing,
          prevNotes,
          note,
        })
      );
    };

    const onMouseDragHandler = (event: MouseEvent) => {
      event.stopPropagation();

      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({
          state: NoteState.Dragging,
          prevNotes,
          note,
        })
      );
    };

    const onMouseMoveHandler = (event: MouseEvent) => {
      if (note.state === NoteState.Dragging) {
        const position: NotePosition = { x: event.x, y: event.x };

        setStickyNotes((prevNotes) =>
          prevNotes.map((prevNote) => {
            if (note.id !== prevNote.id) return note;

            return {
              ...note,
              position,
            };
          })
        );

        return;
      }

      if (note.state === NoteState.Resizing) {
        setStickyNotes((prevNotes) =>
          prevNotes.map((prevNote) => {
            if (note.id !== prevNote.id) return prevNote;

            return {
              ...note,
              width: Math.max(event.x - prevNote.position.x, 10),
              height: Math.max(event.y - prevNote.position.y, 10),
            };
          })
        );

        return;
      }
    };

    noteRef.current?.addEventListener("mousedown", onMouseDownHandler);
    resizeRef.current?.addEventListener("mousedown", onMouseResizeHandler);
    dragRef.current?.addEventListener("mousedown", onMouseDragHandler);
    document.addEventListener("mousemove", onMouseMoveHandler);

    return () => {
      noteRef.current?.addEventListener("mousedown", onMouseDownHandler);
      resizeRef.current?.removeEventListener("mousedown", onMouseResizeHandler);
      dragRef.current?.removeEventListener("mousedown", onMouseDragHandler);
      document.addEventListener("mousemove", onMouseMoveHandler);
    };
  }, []);

  return {
    noteRef,
    dragRef,
    resizeRef,
  };
}
