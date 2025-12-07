import { ResizeNoteCommand } from "@note/application/commands";
import { Size } from "@note/domain/value-objects";
import { NoteRepository } from "@note/infrastructure/persistance";

import { EventHandler } from "./handler";

export class ResizeNoteHandler implements EventHandler {
  repository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.repository = noteRepository;
  }

  async execute(command: ResizeNoteCommand) {
    const note = await this.repository.findById(command.id);
    note.resize(new Size(command.width, command.height));

    // TODO: handle
    // await this.repository.update(note.id, command);

    return { note: note.toPrimitives(), events: note.pullEvents() };
  }
}
