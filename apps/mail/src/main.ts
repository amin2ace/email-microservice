import { NestFactory } from '@nestjs/core';
import { MailModule } from './mail.module';
import { Logger } from '@nestjs/common';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      // Listening Microservice Options
      bufferLogs: true,
      logger: new Logger('Bootstrap'),
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3005,
      },
    },
  );

  await app.listen();
}

bootstrap();
