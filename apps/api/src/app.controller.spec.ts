import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env',
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'AUTH_SERVICE',
          useFactory: (configService: ConfigService) => {
            const USER = configService.get('RABBITMQ_USER');
            const PASSWORD = configService.get('RABBITMQ_PASS');
            const HOST = configService.get('RABBITMQ_HOST');
            const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE');

            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                queue: QUEUE,
                queueOptions: {
                  durable: true,
                },
              },
            });
          },
          inject: [ConfigService],
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('helo');
    });
  });
});
