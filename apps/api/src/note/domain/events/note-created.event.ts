import { Note, NoteEvent } from "@repo/contracts";

import { DomainEvent } from "./event";

export class NoteCreated implements DomainEvent {
  readonly type = NoteEvent.NoteCreated;

  constructor(public readonly noteId: Note["id"]) {}
}
