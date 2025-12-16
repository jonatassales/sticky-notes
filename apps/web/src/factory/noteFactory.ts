import { v4 as uuid } from "uuid";
import { Note, NotePosition, NoteState } from "@repo/contracts";
import { Default, noteElevationFactory } from "@web/factory";

interface NoteFactoryProps {
  position: NotePosition;
  notes: Note[];
}

export function noteFactory({ position, notes }: NoteFactoryProps): Note {
  return {
    id: uuid(), // TODO: will be created on database insert
    content: "",
    position,
    width: Default.NoteDefaultSize,
    height: Default.NoteDefaultSize,
    state: NoteState.Stale,
    elevation: noteElevationFactory(notes).toString(),
  };
}
