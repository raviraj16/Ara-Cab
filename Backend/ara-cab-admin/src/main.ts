import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmFilter } from './shared/filters/typeorm-error.filter';

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    passphrase: process.env.CERT_PASS,
    pfx: fs.readFileSync('./aracabcert.pfx'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    enableDebugMessages: true,
  }));
  app.useGlobalFilters(new TypeOrmFilter())
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.SERVER_PORT));
}
bootstrap();
