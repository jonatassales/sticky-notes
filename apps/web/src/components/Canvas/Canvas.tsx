import { Note } from "@repo/contracts";
import { TrashZone, StickyNote } from "@web/components";
import { buildNoteStyle } from "@web/utils";

import "./Canvas.css";

interface CanvasProps {
  stickyNotes: Note[];
}

export function Canvas(props: CanvasProps) {
  const { stickyNotes } = props;

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
