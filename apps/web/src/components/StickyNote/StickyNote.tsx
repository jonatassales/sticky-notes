import { SquareArrowDownRight, Grip } from "lucide-react";
import { Note } from "@repo/contracts";
import { noteStyleFactory } from "@web/factory";
import { Card, IconButton } from "@repo/ds/ui";

import { useStickyNoteEventRegistry } from "./hooks";
import "./StickyNote.css";

export interface StickyNoteProps {
  note: Note;
}

export function StickyNote(props: StickyNoteProps) {
  const { note } = props;

  const { noteRef, dragRef, resizeRef } = useStickyNoteEventRegistry(note);

  const hanndleOnBlur = () => {
    console.log("Updates stickyNotes: ");
  };

  return (
    <Card ref={noteRef} className="sticky-note" style={noteStyleFactory(note)}>
      <IconButton
        ref={dragRef}
        className="sticky-note__header"
        aria-label="Sticky note grab button"
        aria-description="Left click and hold to move the sticky note around."
      >
        <Grip size={20} className="sticky-note__grab-icon" />
      </IconButton>
      <input
        id={note.id}
        name="sticky-note-content"
        className="sticky-note__text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your note here"
      />
      <IconButton
        ref={resizeRef}
        className="sticky-note__footer"
        aria-label="Sticky note resize button"
        aria-description="Left click and hold to resize the sticky note."
      >
        <SquareArrowDownRight size={20} className="sticky-note__resize-icon" />
      </IconButton>
    </Card>
  );
}
