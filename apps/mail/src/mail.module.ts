import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationScehema } from './config';
import { MailerOptionsService } from './mailer.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientService } from './client.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/mail/.env',
      isGlobal: true,
      skipProcessEnv: true,
      validationSchema: validationScehema,
    }),

    MailerModule.forRootAsync({
      inject: [ConfigService],
      useClass: MailerOptionsService,
    }),

    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'SEND_MAIL', // Producer and lintener name must be the same
          inject: [ConfigService],
          useClass: ClientService,
        },
      ],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailerOptionsService],
})
export class MailModule {}
