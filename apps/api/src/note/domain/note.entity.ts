import { NoteEvent, Note as NoteType } from "@repo/contracts";

import { Size, Position } from "@note/domain/value-objects";
import {
  NoteCreated,
  NoteDragged,
  NoteResized,
  NotePlaced,
  NoteDeleted,
} from "@note/domain/events";

export class Note {
  private domainEvents: NoteEvent[] = [];

  constructor(
    public readonly id: NoteType["id"],
    private position: Position,
    private size: Size
  ) {}

  static create(id: NoteType["id"], position: Position, size: Size) {
    const note = new Note(id, position, size);
    note.addEvent(new NoteCreated(id));
    return note;
  }

  dragTo(draggedPosition: Position) {
    this.position = draggedPosition;
    this.addEvent(new NoteDragged(this.id, draggedPosition));
  }

  resize(size: Size) {
    this.size = size;
    this.addEvent(new NoteResized(this.id, size));
  }

  place(pos: Position) {
    this.position = pos;
    this.addEvent(new NotePlaced(this.id, pos));
  }

  delete() {
    this.addEvent(new NoteDeleted(this.id));
  }

  toPrimitives() {
    return {
      id: this.id,
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height,
    };
  }

  addEvent(event: any) {
    this.domainEvents.push(event);
  }

  pullEvents() {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }
}
