import { useEffect, useRef } from "react";
import { Note, NoteState } from "@repo/contracts";
import { useStickyNotes } from "@web/providers";
import {
  dragEventListener,
  resizeEventListener,
  staleEventListener,
  cancelBubblingEventListener,
} from "@web/events/listeners";

export interface StickyNoteEventRegistryResult {
  noteRef: React.Ref<HTMLDivElement>;
  dragRef: React.Ref<HTMLButtonElement>;
  resizeRef: React.Ref<HTMLButtonElement>;
}

export function useStickyNoteEventRegistry(
  note: Note
): StickyNoteEventRegistryResult {
  const { setStickyNotes } = useStickyNotes();

  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onMouseDragDown = (event: MouseEvent) => {
      dragEventListener({ event, note, setStickyNotes });
    };

    const onMouseResizeDown = (event: MouseEvent) => {
      resizeEventListener({ event, note, setStickyNotes });
    };

    const onMouseMove = (event: MouseEvent) => {
      if (
        note.state === NoteState.Dragging ||
        note.state === NoteState.Resizing
      )
        return;

      const eventListenerArgs = {
        event,
        note,
        setStickyNotes,
      };

      if (NoteState.Dragging) dragEventListener(eventListenerArgs);
      if (NoteState.Resizing) resizeEventListener(eventListenerArgs);
    };

    const onMouseUp = (event: MouseEvent) => {
      if (!noteRef.current) return;

      const cardElement = noteRef.current;
      staleEventListener({ cardElement, event, note, setStickyNotes });
    };

    noteRef.current?.addEventListener("mousedown", cancelBubblingEventListener);
    dragRef.current?.addEventListener("mousedown", onMouseDragDown);
    resizeRef.current?.addEventListener("mousedown", onMouseResizeDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      noteRef.current?.removeEventListener(
        "mousedown",
        cancelBubblingEventListener
      );
      dragRef.current?.removeEventListener("mousedown", onMouseDragDown);
      resizeRef.current?.removeEventListener("mousedown", onMouseResizeDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return { noteRef, dragRef, resizeRef };
}
