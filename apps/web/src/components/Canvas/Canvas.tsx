import { v4 as uuid } from "uuid";
import { useSignals } from "@preact/signals-react/runtime";

import { Note, NoteState } from "@repo/contracts";
import { TrashZone, StickyNote } from "@web/components";
import { stickyNotes, currentStickyNote } from "@web/atoms";
import { generateElevation } from "@web/utils";

import "./Canvas.css";

export function Canvas() {
  useSignals();

  const updateCurrentNote = (partial: Partial<Note>) => {
    if (!currentStickyNote.value) return;

    const updated = { ...currentStickyNote.value, ...partial };
    currentStickyNote.value = updated;

    stickyNotes.value = stickyNotes.value.map((note) =>
      note.id === updated.id ? updated : note
    );
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (event.target.className !== "cv-root") return;

    const startX = event.clientX;
    const startY = event.clientY;

    const note: Note = {
      id: uuid(),
      position: { x: startX, y: startY },
      state: NoteState.Creating,
      width: 120,
      height: 90,
      elevation: generateElevation(),
    };

    currentStickyNote.value = note;
    stickyNotes.value = [...stickyNotes.value, note];
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (event.target.className !== "cv-root") return;

    const note = currentStickyNote.value;
    if (!note || note.state !== NoteState.Creating) return;

    const width = Math.max(event.clientX - note.position.x, 10);
    const height = Math.max(event.clientY - note.position.y, 10);

    updateCurrentNote({ width, height });
  };

  const handleMouseUp = () => {
    updateCurrentNote({ state: NoteState.Stale });
  };

  return (
    <div
      className="cv-root"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {stickyNotes.value.map((note) => (
        <StickyNote
          key={note.id}
          style={{
            left: `${note.position.x}px`,
            top: `${note.position.y}px`,
            width: `${note.width}px`,
            height: `${note.height}px`,
            zIndex: note.elevation,
          }}
        />
      ))}
      <TrashZone />
    </div>
  );
}
