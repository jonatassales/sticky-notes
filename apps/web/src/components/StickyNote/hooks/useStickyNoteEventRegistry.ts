import { useEffect, useRef } from "react";
import { Note } from "@repo/contracts";
import { useStickyNotes } from "@web/providers";
import {
  dragEventListener,
  resizeEventListener,
  cancelBubblingEventListener,
  mouseUpEventListener,
} from "@web/events/listeners";

export interface StickyNoteEventRegistryResult {
  noteRef: React.Ref<HTMLDivElement>;
  dragRef: React.Ref<HTMLButtonElement>;
  resizeRef: React.Ref<HTMLButtonElement>;
}

export function useStickyNoteEventRegistry(
  note: Note
): StickyNoteEventRegistryResult {
  const { stickyNotes, setStickyNotes } = useStickyNotes();

  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);
  const stickyNotesRef = useRef<Note[]>([]);

  useEffect(() => {
    stickyNotesRef.current = stickyNotes;
  }, [stickyNotes]);

  useEffect(() => {
    let isResizing = false;
    let isDragging = false;

    const onMouseDragDown = () => {
      isDragging = true;
    };

    const onMouseResizeDown = () => {
      isResizing = true;
    };

    const onMouseMove = (event: MouseEvent) => {
      const eventListenerArgs = {
        event,
        note,
        setStickyNotes,
      };

      if (isDragging) {
        dragEventListener(eventListenerArgs);
        return;
      }

      if (isResizing) {
        resizeEventListener(eventListenerArgs);
        return;
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      mouseUpEventListener({
        event,
        note,
        cardElement: noteRef.current,
        stickyNotes: stickyNotesRef.current,
      });

      isDragging = false;
      isResizing = false;
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
