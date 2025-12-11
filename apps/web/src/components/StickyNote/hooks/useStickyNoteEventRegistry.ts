import { useEffect, useRef } from "react";
import { useStickyNotes } from "@web/providers";
import { Note, NoteState } from "@repo/contracts";
import { stickyNotesStateOf } from "@web/utils";
import { draggingListener, resizingListener } from "@web/events/listeners";

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
    let isDragging = false;
    let isResizing = false;

    const onMouseDownDrag = (event: MouseEvent) => {
      event.stopPropagation();
      isDragging = true;
      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({ state: NoteState.Dragging, prevNotes, note })
      );
    };

    const onMouseDownResize = (event: MouseEvent) => {
      event.stopPropagation();
      isResizing = true;
      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({ state: NoteState.Resizing, prevNotes, note })
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      const eventListenerArgs = {
        event,
        note,
        setStickyNotes,
      };

      if (isDragging) draggingListener(eventListenerArgs);

      if (isResizing) resizingListener(eventListenerArgs);
    };

    const onMouseUp = () => {
      if (isDragging || isResizing) {
        isDragging = false;
        isResizing = false;
        setStickyNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
            prevNote.id === note.id
              ? { ...prevNote, state: NoteState.Stale }
              : prevNote
          )
        );
      }
    };

    dragRef.current?.addEventListener("mousedown", onMouseDownDrag);
    resizeRef.current?.addEventListener("mousedown", onMouseDownResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      dragRef.current?.removeEventListener("mousedown", onMouseDownDrag);
      resizeRef.current?.removeEventListener("mousedown", onMouseDownResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [note.id]);

  return { noteRef, dragRef, resizeRef };
}
