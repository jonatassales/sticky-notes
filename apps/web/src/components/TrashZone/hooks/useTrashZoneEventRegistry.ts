import { useEffect, useRef } from "react";
import { Note } from "@repo/contracts";
import { useStickyNotes } from "@web/providers/hooks";
import { deleteStickyNote } from "@web/actions";

interface TrashZoneEventRegistryResult {
  trashZoneRef: React.Ref<HTMLDivElement>;
}

export function useTrashZoneEventRegistry(): TrashZoneEventRegistryResult {
  const { stickyNotes } = useStickyNotes();

  const stickyNotesRef = useRef<Note[]>([]);
  const trashZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stickyNotesRef.current = stickyNotes;
  }, [stickyNotes]);

  useEffect(() => {
    function handleOnMouseDown(event: MouseEvent) {
      event.stopPropagation();
    }

    function handleOnDrop(event: Event) {
      const customEvent = event as CustomEvent<{
        noteId?: string;
        clientX?: number;
        clientY?: number;
      }>;

      const noteId = customEvent.detail?.noteId;

      if (noteId) {
        deleteStickyNote(noteId);
      }
    }

    trashZoneRef.current?.addEventListener("mousedown", handleOnMouseDown);
    trashZoneRef.current?.addEventListener("drop", handleOnDrop);

    return () => {
      trashZoneRef.current?.removeEventListener("mousedown", handleOnMouseDown);
      trashZoneRef.current?.removeEventListener("drop", handleOnDrop);
    };
  }, []);

  return {
    trashZoneRef,
  };
}
