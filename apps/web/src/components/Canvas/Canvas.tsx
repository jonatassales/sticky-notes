import { TrashZone, StickyNote } from "@web/components";
import { buildNoteStyle } from "@web/utils";
import { useCanvasEventRegistry } from "@web/hooks";

import "./Canvas.css";

export function Canvas() {
  const { stickyNotes } = useCanvasEventRegistry();
  // const handleMouseUp = () => {
  //   if (!currentStickyNote?.id) return;

  //   setCurrentStickyNote({
  //     ...currentStickyNote,
  //     state: NoteState.Stale,
  //   });
  // };

  // const handleMouseMove = (event: MouseEvent) => {
  //   const newPosition = { x: event.x, y: event.y };

  //   if (!currentStickyNote?.id) return;

  //   if (currentStickyNote.state === NoteState.Dragging) {
  //     setStickyNotes(
  //       stickyNotes.map((note) => {
  //         if (note.id === currentStickyNote.id) {
  //           return {
  //             ...note,
  //             position: newPosition,
  //           };
  //         }

  //         return note;
  //       })
  //     );
  //   }

  //   if (currentStickyNote.state === NoteState.Resizing) {
  //     const width = Math.max(newPosition.x - currentStickyNote.position.x, 10);
  //     const height = Math.max(newPosition.y - currentStickyNote.position.y, 10);

  //     const updated = { ...currentStickyNote, width, height };

  //     setCurrentStickyNote(updated);

  //     const updatedStickyNotes = stickyNotes.map((note) =>
  //       note.id === updated.id ? updated : note
  //     );

  //     setStickyNotes(updatedStickyNotes);
  //     return;
  //   }
  // };

  return (
    <div className="cv-root">
      {!!stickyNotes.length &&
        stickyNotes.map((note) => (
          <StickyNote key={note.id} style={buildNoteStyle(note)} />
        ))}
      <TrashZone />
    </div>
  );
}
