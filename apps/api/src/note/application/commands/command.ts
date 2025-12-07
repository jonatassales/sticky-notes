import { CreateNote, Note, PlaceNote, ResizeNote } from "@repo/contracts";

type Body = CreateNote | PlaceNote | ResizeNote;

export class Command {
  id?: Note["id"];
  body: Body;

  constructor(requestBody: Body, id?: Note["id"]) {
    this.body = requestBody;
    this.id = id;
  }
}
