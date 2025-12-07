import { Note, NoteEvent } from "@repo/contracts";

import { DomainEvent } from "./event";

export class NoteDeleted implements DomainEvent {
  readonly type = NoteEvent.NoteDeleted;

  constructor(public readonly noteId: Note["id"]) {}
}
