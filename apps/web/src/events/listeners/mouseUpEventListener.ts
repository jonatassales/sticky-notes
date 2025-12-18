import { Note } from "@repo/contracts";
import { saveStickyNote } from "@web/actions";
import { notifyTrashZoneDropEventHandler } from "@web/events/handlers";
import { isCardOverTrashZone } from "@web/utils";

interface MouseUpEventListenerArgs {
  event: MouseEvent;
  note: Note;
  cardElement: HTMLDivElement | null;
  stickyNotes: Note[];
}

export function mouseUpEventListener({
  event,
  note,
  cardElement,
  stickyNotes,
}: MouseUpEventListenerArgs): void {
  const updatedNote = stickyNotes.find(
    (stickyNote) => stickyNote.id === note.id
  );

  if (!updatedNote) {
    return;
  }

  const positionChanged =
    updatedNote.position.x !== note.position.x ||
    updatedNote.position.y !== note.position.y;

  const sizeChanged =
    updatedNote.width !== note.width || updatedNote.height !== note.height;

  const hasInteraction = positionChanged || sizeChanged;

  if (!hasInteraction) {
    return;
  }

  const isDroppedInTrash =
    positionChanged && cardElement && isCardOverTrashZone(cardElement);

  if (isDroppedInTrash) {
    notifyTrashZoneDropEventHandler(event, note.id);
    return;
  }

  saveStickyNote(updatedNote);
}
