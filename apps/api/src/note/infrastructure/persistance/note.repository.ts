import { Injectable } from "@nestjs/common";
import { Note } from "@repo/contracts";
import {
  CreateNoteCommand,
  PlaceNoteCommand,
} from "@note/application/commands";
import { Note as NoteEntity } from "@note/domain/note.entity";

type NoteResponse = NoteEntity | null;

@Injectable()
export class NoteRepository {
  findById(id: Note["id"]): NoteResponse {
    return null;
  }

  create(body: CreateNoteCommand): NoteResponse {
    return null;
  }

  update(id: Note["id"], body: PlaceNoteCommand): NoteResponse {
    return null;
  }

  delete(id: Note["id"]): Note["id"] {
    return id;
  }
}
