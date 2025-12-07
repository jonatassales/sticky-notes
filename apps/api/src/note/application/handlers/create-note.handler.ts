import { Note } from "@note/domain/note.entity";
import { Position, Size } from "@note/domain/value-objects";
import { NoteRepository } from "@note/infrastructure/persistance";
import { CreateNoteCommand } from "@note/application/commands";

import { EventHandler } from "./handler";

export class CreateNoteHandler implements EventHandler {
  repository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.repository = noteRepository;
  }

  async execute(command: CreateNoteCommand) {
    const note = Note.create(
      command.id,
      new Position(command.x, command.y),
      new Size(command.width, command.height)
    );

    // TODO: Handle Event

    const events = note.pullEvents();
    return { note: note.toPrimitives(), events };
  }
}
