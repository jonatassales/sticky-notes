import { SquareArrowDownRight, Grip } from "lucide-react";
import { Note } from "@repo/contracts";
import { Card, IconButton } from "@repo/ds/ui";
import { Default, noteStyleFactory } from "@web/factory";
import { saveStickyNote } from "@web/actions";

import { useStickyNoteEventRegistry } from "./hooks";
import "./StickyNote.css";

export interface StickyNoteProps {
  note: Note;
}

export function StickyNote({ note }: StickyNoteProps) {
  const { noteRef, dragRef, resizeRef } = useStickyNoteEventRegistry(note);

  const handleOnBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value || "";
    const updatedNote = { ...note, content: value };
    saveStickyNote(updatedNote);
  };

  return (
    <Card ref={noteRef} className="sticky-note" style={noteStyleFactory(note)}>
      <IconButton
        ref={dragRef}
        className="sticky-note__header"
        aria-label="Grab sticky note"
        aria-description="Left click and hold to move the sticky note"
      >
        <Grip
          size={Default.NoteGrabIconSize}
          className="sticky-note__grab-icon"
        />
      </IconButton>
      <textarea
        id={note.id}
        className="sticky-note__text"
        defaultValue={note.content}
        onBlur={handleOnBlur}
        placeholder="Enter your note here"
      />
      <IconButton
        ref={resizeRef}
        className="sticky-note__footer"
        aria-label="Resize sticky note"
        aria-description="Left click and hold to resize the sticky note"
      >
        <SquareArrowDownRight
          size={Default.NoteResizeIconSize}
          className="sticky-note__resize-icon"
        />
      </IconButton>
    </Card>
  );
}
