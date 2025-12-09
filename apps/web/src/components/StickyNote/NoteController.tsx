import { Scaling, Grip } from "lucide-react";
import { IconButton } from "@repo/ds/ui";
import { NoteState } from "@repo/contracts";

import { escapeNoteCreateEvent } from "@web/utils";
import {
  moveStickyNote,
  resizeStickyNote,
  updateCurrentStickyNote,
} from "@web/actions";

import "./StickyNote.css";

export function NoteController() {
  const handleMove = (event: React.DragEvent<HTMLDivElement>) => {
    // @ts-ignore
    const draggedStickyNoteId = event.target.id;

    moveStickyNote(draggedStickyNoteId, { x: event.clientX, y: event.clientY });
  };

  const handleResize = (event: React.MouseEvent<HTMLDivElement>) => {
    escapeNoteCreateEvent(event);
    resizeStickyNote(event);
  };

  const handleMouseUp = () => {
    updateCurrentStickyNote({ state: NoteState.Stale });
  };

  return (
    <nav className="nc-root">
      <div onDrag={handleMove} onMouseUp={handleMouseUp}>
        <IconButton
          className="nc-grab"
          aria-label="Sticky note grab button"
          aria-description="Left click and hold to move the sticky note around."
        >
          <Grip size={20} />
        </IconButton>
      </div>
      <div onDrag={handleResize}>
        <IconButton
          className="nc-resize"
          aria-label="Sticky note resize button"
          aria-description="Left click and hold to resize the sticky note."
        >
          <Scaling size={20} />
        </IconButton>
      </div>
    </nav>
  );
}
