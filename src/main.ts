import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { appPort } from './config';

(async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(appPort);
})();
