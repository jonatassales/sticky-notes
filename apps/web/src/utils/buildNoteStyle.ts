import { Note } from "@repo/contracts";

export function buildNoteStyle(note: Note) {
  return {
    left: `${note.position.x}px`,
    top: `${note.position.y}px`,
    width: `${note.width}px`,
    height: `${note.height}px`,
    zIndex: note.elevation,
    backgroundColor: "#FFEB99",
  };
}
