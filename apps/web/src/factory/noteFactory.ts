import { v4 as uuid } from "uuid";
import { Note, NotePosition, NoteState } from "@repo/contracts";
import { noteElevationFactory } from "@web/factory";

const DEFAULT_WIDTH = 216;
const DEFAULT_HEIGHT = 216;

interface NoteFactoryProps {
  position: NotePosition;
  notes: Note[];
}

export function noteFactory({ position, notes }: NoteFactoryProps): Note {
  return {
    id: uuid(), // TODO: will be created on database insert
    position,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    state: NoteState.Stale,
    elevation: noteElevationFactory(notes),
  };
}
