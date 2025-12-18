import { TrashZone, StickyNote } from "@web/components";
import { useStickyNotes } from "@web/providers";

import "./Canvas.css";

export function Canvas() {
  const { stickyNotes } = useStickyNotes();

  console.log(stickyNotes);

  return (
    <div className="canvas">
      {!!stickyNotes.length &&
        stickyNotes.map((note) => <StickyNote key={note.id} note={note} />)}
      <TrashZone />
    </div>
  );
}
