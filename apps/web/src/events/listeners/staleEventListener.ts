import { Note, NoteState } from "@repo/contracts";
import { saveStickyNote } from "@web/actions";
import { isCardOverTrashZone, stickyNotesStateOf } from "@web/utils";
import { notifyTrashZoneDropEventHandler } from "@web/events/handlers";

interface StaleEventListenerArgs {
  event: MouseEvent;
  note: Note;
  cardElement: HTMLDivElement;
  setStickyNotes: (value: React.SetStateAction<Note[]>) => void;
}

export function staleEventListener({
  event,
  note,
  cardElement,
  setStickyNotes,
}: StaleEventListenerArgs) {
  const isDroppedInTrash =
    note.state === NoteState.Dragging && isCardOverTrashZone(cardElement);

  if (isDroppedInTrash) {
    notifyTrashZoneDropEventHandler(event, note.id);
    return;
  }

  setStickyNotes((prevNotes) =>
    stickyNotesStateOf({ state: NoteState.Stale, prevNotes, note })
  );

  saveStickyNote(note);
}
