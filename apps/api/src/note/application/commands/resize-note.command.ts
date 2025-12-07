import { ResizeNote } from "@repo/contracts";

import { Command } from "./command";

export class ResizeNoteCommand implements Command {
  body: ResizeNote;
}
