import { Note, NoteEvent } from "@repo/contracts";
import { Size } from "@note/domain/value-objects/size";

import { DomainEvent } from "./event";

export class NoteResized implements DomainEvent {
  readonly type = NoteEvent.NoteResized;

  constructor(
    public readonly noteId: Note["id"],
    public readonly size: Size
  ) {}
}
