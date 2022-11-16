import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmFilter } from './shared/filters/typeorm-error.filter';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    passphrase: process.env.CERT_PASS,
    pfx: fs.readFileSync(process.env.CERT_PATH),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    enableDebugMessages: true,
  }));
  app.useGlobalFilters(new TypeOrmFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api');

  await app.listen(parseInt(process.env.SERVER_PORT));
}

/**
 * This function forces postgres driver to convert numeric string to javascript float
 * By default postgres javascript driver converts numeric type to string in order to
 * prevent precision loss
 */
function preventPostgresNumericToStringConversion() {
  const types = require('pg').types;
  types.setTypeParser(1700, (val) => {
    return parseFloat(val);
  });
}
preventPostgresNumericToStringConversion();
bootstrap();
