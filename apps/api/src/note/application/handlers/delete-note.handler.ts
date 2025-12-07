import { DeleteNoteCommand } from "@note/application/commands";
import { NoteRepository } from "@note/infrastructure/persistance";

import { EventHandler } from "./handler";

export class DeleteNoteHandler implements EventHandler {
  repository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.repository = noteRepository;
  }

  async execute(command: DeleteNoteCommand) {
    const note = await this.repository.findById(command.id);

    await this.repository.delete(command.id);
    return { events: note.pullEvents() };
  }
}
