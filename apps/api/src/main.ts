import { NestFactory } from "@nestjs/core";

import { NotesModule } from "@note/notes.module";

async function bootstrap() {
  const app = await NestFactory.create(NotesModule);
  app.enableCors();
  await app.listen(5000);
}

void bootstrap();
