import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateNote, Note, PlaceNote, ResizeNote } from "@repo/contracts";
import {
  CreateNoteCommand,
  DeleteNoteCommand,
  PlaceNoteCommand,
  ResizeNoteCommand,
} from "@note/application/commands";

@Controller("notes")
export class NotesController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  create(@Body() body: CreateNote) {
    return this.commandBus.execute(new CreateNoteCommand(body));
  }

  @Patch(":id/resize")
  resize(@Param("id") id: Note["id"], @Body() body: ResizeNote) {
    return this.commandBus.execute(new ResizeNoteCommand(body));
  }

  @Patch(":id/place")
  place(@Param("id") id: Note["id"], @Body() body: PlaceNote) {
    return this.commandBus.execute(new PlaceNoteCommand(body));
  }

  @Delete(":id")
  delete(@Param("id") id: Note["id"]) {
    return this.commandBus.execute(new DeleteNoteCommand(id));
  }
}
