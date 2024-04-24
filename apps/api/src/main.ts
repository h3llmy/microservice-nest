import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorHandler } from 'utils/errorHandling/validationErrorHandler.utils';
import { AllExceptionsFilter } from 'utils/errorHandling/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationErrorHandler());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(4000);
}
bootstrap();
