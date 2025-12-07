import { CreateNote } from "@repo/contracts";

import { Command } from "./command";

export class CreateNoteCommand implements Command {
  body: CreateNote;
}
