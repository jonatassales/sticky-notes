import { NestFactory } from "@nestjs/core";

import { NoteModule } from "@note/note.module";

async function bootstrap() {
  const app = await NestFactory.create(NoteModule);
  app.enableCors();
  await app.listen(5000);
}

void bootstrap();
