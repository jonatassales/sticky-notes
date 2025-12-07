import { Note, NoteEvent } from "@repo/contracts";
import { Position } from "@note/domain/value-objects";

import { DomainEvent } from "./event";

export class NoteDragged implements DomainEvent {
  readonly type = NoteEvent.NoteDragged;

  constructor(
    public readonly noteId: Note["id"],
    public readonly position: Position
  ) {}
}
