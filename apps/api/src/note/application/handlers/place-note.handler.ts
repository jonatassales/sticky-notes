import { PlaceNoteCommand } from "@note/application/commands";
import { Position } from "@note/domain/value-objects";
import { NoteRepository } from "@note/infrastructure/persistance";

import { EventHandler } from "./handler";

export class PlaceNoteHandler implements EventHandler {
  repository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.repository = noteRepository;
  }

  async execute(command: PlaceNoteCommand) {
    const note = await this.repository.findById(command.id);
    note.place(new Position(command.x, command.y));

    await this.repository.update(note.id, command);

    return { note: note.toPrimitives(), events: note.pullEvents() };
  }
}
