import { useEffect, useRef } from "react";
import { deleteStickyNote } from "@web/actions";
import { DropEvent } from "@web/events/handlers";
import { cancelBubblingEventListener } from "@web/events/listeners";

interface TrashZoneEventRegistryResult {
  trashZoneRef: React.Ref<HTMLDivElement>;
}

export function useTrashZoneEventRegistry(): TrashZoneEventRegistryResult {
  const trashZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOnDrop(event: Event) {
      const customEvent = event as CustomEvent<DropEvent>;

      const noteId = customEvent.detail?.noteId;

      if (noteId) {
        deleteStickyNote(noteId);
      }
    }

    trashZoneRef.current?.addEventListener(
      "mousedown",
      cancelBubblingEventListener
    );
    trashZoneRef.current?.addEventListener("drop", handleOnDrop);

    return () => {
      trashZoneRef.current?.removeEventListener(
        "mousedown",
        cancelBubblingEventListener
      );
      trashZoneRef.current?.removeEventListener("drop", handleOnDrop);
    };
  }, []);

  return {
    trashZoneRef,
  };
}
