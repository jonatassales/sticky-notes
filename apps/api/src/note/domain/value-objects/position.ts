import { Note } from "@repo/contracts";

export class Position {
  constructor(
    public readonly x: Note["position"]["x"],
    public readonly y: Note["position"]["y"]
  ) {}
}
