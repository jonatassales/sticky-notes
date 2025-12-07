import { Note } from "@repo/contracts";

export class Size {
  constructor(
    public readonly width: Note["width"],
    public readonly height: Note["height"]
  ) {}
}
