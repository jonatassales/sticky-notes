import { useEffect, useRef } from "react";
import { Note } from "@repo/contracts";
import { useStickyNotes } from "@web/providers";
import {
  dragEventListener,
  resizeEventListener,
  cancelBubblingEventListener,
} from "@web/events/listeners";
import { saveStickyNote } from "@web/actions";
import { notifyTrashZoneDropEventHandler } from "@web/events/handlers";
import { isCardOverTrashZone } from "@web/utils";

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
      if (isDragging || isResizing) {
        if (
          isDragging &&
          noteRef.current &&
          isCardOverTrashZone(noteRef.current)
        ) {
          notifyTrashZoneDropEventHandler(event, note.id);
        } else {
          const updatedNote = stickyNotesRef.current.find(
            (stickyNote) => stickyNote.id === note.id
          );

          if (updatedNote) {
            saveStickyNote(updatedNote);
          }
        }
      }

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
  }, [note, setStickyNotes]);

  return { noteRef, dragRef, resizeRef };
}
