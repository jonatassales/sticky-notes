import { PlaceNote } from "@repo/contracts";

import { Command } from "./command";

export class PlaceNoteCommand implements Command {
  body: PlaceNote;
}
