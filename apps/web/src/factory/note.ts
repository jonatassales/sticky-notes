import { v4 as uuid } from "uuid";
import { Note, NotePosition, NoteState } from "@repo/contracts";
import { generateElevation } from "@web/utils";

interface NoteFactoryProps {
  position: NotePosition;
  prevNotes: Note[];
}

export function noteFactory(props: NoteFactoryProps) {
  const { position, prevNotes } = props;

  return {
    id: uuid(),
    position,
    width: 216,
    height: 216,
    state: NoteState.Stale,
    elevation: generateElevation(prevNotes),
  };
}
