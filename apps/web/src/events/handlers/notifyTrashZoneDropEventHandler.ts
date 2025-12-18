import { Note } from "@repo/contracts";

export type DropEvent = {
  noteId: string;
  clientX: number;
  clientY: number;
};

export const notifyTrashZoneDropEventHandler = (
  event: MouseEvent,
  noteId: Note["id"]
) => {
  const trashZoneElement = document.querySelector(".trash-zone");

  if (!trashZoneElement) return;

  const { clientX, clientY } = event;

  const dropEvent = new CustomEvent<DropEvent>("drop", {
    detail: { noteId, clientX, clientY },
    bubbles: true,
  });

  trashZoneElement.dispatchEvent(dropEvent);
};
