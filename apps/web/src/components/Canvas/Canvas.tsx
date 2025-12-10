import { Note } from "@repo/contracts";
import { TrashZone, StickyNote } from "@web/components";
import { noteStyleFactory } from "@web/factory";

import "./Canvas.css";

interface CanvasProps {
  stickyNotes: Note[];
  currentStickyNote: Note | null;
}

export function Canvas(props: CanvasProps) {
  const { stickyNotes, currentStickyNote } = props;

  return (
    <div className="canvas">
      {stickyNotes.length &&
        stickyNotes.map((note) => (
          <StickyNote key={note.id} style={noteStyleFactory(note)} />
        ))}

      {currentStickyNote?.id && (
        <StickyNote style={noteStyleFactory(currentStickyNote)} />
      )}
      <TrashZone />
    </div>
  );
}
