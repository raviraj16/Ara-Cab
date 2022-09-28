import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/admin');
  await app.listen(parseInt(process.env.SERVER_PORT));
}
bootstrap();
