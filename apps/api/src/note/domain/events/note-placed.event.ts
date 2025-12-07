import { Note, NoteEvent } from "@repo/contracts";
import { Position } from "@note/domain/value-objects";

import { DomainEvent } from "./event";

export class NotePlaced implements DomainEvent {
  readonly type = NoteEvent.NotePlaced;

  constructor(
    public readonly noteId: Note["id"],
    public readonly position: Position
  ) {}
}
