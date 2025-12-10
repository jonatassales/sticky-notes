import { Note } from "@repo/contracts";
import { TrashZone, StickyNote } from "@web/components";
import { noteStyleFactory } from "@web/factory";

import "./Canvas.css";

interface CanvasProps {
  stickyNotes: Note[];
}

export function Canvas(props: CanvasProps) {
  const { stickyNotes } = props;

  return (
    <div className="canvas">
      {stickyNotes.length &&
        stickyNotes.map((note) => (
          <StickyNote
            noteId={note.id}
            key={note.id}
            style={noteStyleFactory(note)}
          />
        ))}
      <TrashZone />
    </div>
  );
}
