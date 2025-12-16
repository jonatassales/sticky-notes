import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Note } from "@repo/contracts";
import { HydratedDocument } from "mongoose";

export type NoteHydratedDocument = HydratedDocument<NoteDocument>;

@Schema()
export class NoteDocument {
  @Prop()
  content: Note["content"];

  @Prop()
  elevation: Note["elevation"];

  @Prop()
  width: Note["width"];

  @Prop()
  height: Note["height"];

  @Prop()
  position: Note["position"];
}

export const NoteSchema = SchemaFactory.createForClass(NoteDocument);
