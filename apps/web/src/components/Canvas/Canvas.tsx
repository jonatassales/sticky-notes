import { useSignals } from "@preact/signals-react/runtime";
import { TrashZone, StickyNote } from "@web/components";
import { createStickyNote } from "@web/actions";
import { buildNoteStyle, escapeNoteCreateEvent } from "@web/utils";
import { currentStickyNote, stickyNotes } from "@web/atoms";

import "./Canvas.css";

export function Canvas() {
  useSignals();

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (escapeNoteCreateEvent(event)) return;

    createStickyNote(event.clientX, event.clientY);
  };

  console.log(currentStickyNote.value);

  return (
    <div className="cv-root" onMouseDown={handleMouseDown}>
      {stickyNotes.value.map((note) => (
        <StickyNote id={note.id} key={note.id} style={buildNoteStyle(note)} />
      ))}
      <TrashZone />
    </div>
  );
}
