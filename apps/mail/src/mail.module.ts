import { Logger, Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationScehema } from './config';
import { MailerOptionsService } from './mailer.service';

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
  ],
  controllers: [MailController],
  providers: [MailService, MailerOptionsService],
})
export class MailModule {}
