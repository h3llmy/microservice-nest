import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorHandler } from 'utils/validation/validationErrorHandler.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationErrorHandler());
  await app.listen(4000);
}
bootstrap();
