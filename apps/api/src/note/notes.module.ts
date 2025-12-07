import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { NotesController } from "@note/interfaces/http/controllers";

import { NoteRepository } from "@note/infrastructure/persistance";

import {
  CreateNoteHandler,
  ResizeNoteHandler,
  PlaceNoteHandler,
  DeleteNoteHandler,
} from "@note/application/handlers";

@Module({
  imports: [CqrsModule],
  controllers: [NotesController],
  providers: [
    NoteRepository,
    CreateNoteHandler,
    ResizeNoteHandler,
    PlaceNoteHandler,
    DeleteNoteHandler,
  ],
})
export class NotesModule {}
