import { SquareArrowDownRight, Grip } from "lucide-react";
import { Note } from "@repo/contracts";
import { noteStyleFactory } from "@web/factory";
import { Card, IconButton } from "@repo/ds/ui";

import { useStickyNoteEventRegistry } from "./hooks";
import "./StickyNote.css";

export interface StickyNoteProps {
  note: Note;
}

export function StickyNote({ note }: StickyNoteProps) {
  const { noteRef, dragRef, resizeRef } = useStickyNoteEventRegistry(note);

  const handleOnBlur = () => {
    console.log("Updating sticky note content:", note.id);
  };

  return (
    <Card ref={noteRef} className="sticky-note" style={noteStyleFactory(note)}>
      <IconButton
        ref={dragRef}
        className="sticky-note__header"
        aria-label="Grab sticky note"
        aria-description="Left click and hold to move the sticky note"
      >
        <Grip size={20} className="sticky-note__grab-icon" />
      </IconButton>
      <input
        id={note.id}
        name="sticky-note-content"
        className="sticky-note__text"
        onBlur={handleOnBlur}
        placeholder="Enter your note here"
      />
      <IconButton
        ref={resizeRef}
        className="sticky-note__footer"
        aria-label="Resize sticky note"
        aria-description="Left click and hold to resize the sticky note"
      >
        <SquareArrowDownRight size={20} className="sticky-note__resize-icon" />
      </IconButton>
    </Card>
  );
}
