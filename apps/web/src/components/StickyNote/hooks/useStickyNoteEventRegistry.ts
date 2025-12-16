import { useEffect, useRef } from "react";
import { Note, NoteState } from "@repo/contracts";
import { useStickyNotes } from "@web/providers";
import { stickyNotesStateOf } from "@web/utils";
import { draggingListener, resizingListener } from "@web/events/listeners";
import { saveStickyNote } from "@web/actions";

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

  const notesRef = useRef<Note[]>([]);

  useEffect(() => {
    notesRef.current = stickyNotes;
  }, [stickyNotes]);

  useEffect(() => {
    let state: NoteState;

    const onCardMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
    };

    const onMouseDownDrag = () => {
      state = NoteState.Dragging;
      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({ state: NoteState.Dragging, prevNotes, note })
      );
    };

    const onMouseDownResize = () => {
      state = NoteState.Resizing;
      setStickyNotes((prevNotes) =>
        stickyNotesStateOf({ state: NoteState.Resizing, prevNotes, note })
      );
    };

    const isCardOverTrashZone = () => {
      const trashZoneElement = document.querySelector(".trash-zone");
      const cardElement = noteRef.current;

      if (!trashZoneElement || !cardElement) return false;

      const trashRect = trashZoneElement.getBoundingClientRect();
      const cardRect = cardElement.getBoundingClientRect();

      return (
        cardRect.left < trashRect.right &&
        cardRect.right > trashRect.left &&
        cardRect.top < trashRect.bottom &&
        cardRect.bottom > trashRect.top
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      const eventListenerArgs = {
        event,
        note,
        setStickyNotes,
      };

      if (state === NoteState.Dragging) {
        draggingListener(eventListenerArgs);
      }

      if (state === NoteState.Resizing) {
        resizingListener(eventListenerArgs);
      }
    };

    const notifyTrashZoneDrop = (event: MouseEvent) => {
      const trashZoneElement = document.querySelector(".trash-zone");

      if (!trashZoneElement) return;

      const dropEvent = new CustomEvent<{
        noteId: string;
        clientX: number;
        clientY: number;
      }>("drop", {
        detail: {
          noteId: note.id,
          clientX: event.clientX,
          clientY: event.clientY,
        },
        bubbles: true,
      });

      trashZoneElement.dispatchEvent(dropEvent);
    };

    const onMouseUp = (event: MouseEvent) => {
      if (state === NoteState.Dragging || state === NoteState.Resizing) {
        const isDroppedInTrash =
          state === NoteState.Dragging && isCardOverTrashZone();

        if (isDroppedInTrash) {
          notifyTrashZoneDrop(event);
          return;
        }

        const currentNote = notesRef.current.find(
          (noteRef) => noteRef.id === note.id
        );

        if (currentNote) {
          saveStickyNote(currentNote);
        }

        state = NoteState.Stale;

        setStickyNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
            prevNote.id === note.id
              ? { ...prevNote, state: NoteState.Stale }
              : prevNote
          )
        );
      }
    };

    noteRef.current?.addEventListener("mousedown", onCardMouseDown);
    dragRef.current?.addEventListener("mousedown", onMouseDownDrag);
    resizeRef.current?.addEventListener("mousedown", onMouseDownResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      noteRef.current?.removeEventListener("mousedown", onCardMouseDown);
      dragRef.current?.removeEventListener("mousedown", onMouseDownDrag);
      resizeRef.current?.removeEventListener("mousedown", onMouseDownResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [note.id]);

  return { noteRef, dragRef, resizeRef };
}
