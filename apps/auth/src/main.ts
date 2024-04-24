import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from 'utils/errorHandling/rpcErrorHandler.utils';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new ExceptionFilter());

  const USER = configService.get('RABBITMQ_DEFAULT_USER');
  const PASSWORD = configService.get('RABBITMQ_DEFAULT_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = 'auth_queue';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: true,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
