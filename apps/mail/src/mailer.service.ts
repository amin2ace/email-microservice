import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerOptionsService implements MailerOptionsFactory {
  constructor(protected readonly configService: ConfigService) {}
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      transport: {
        // mailpit: {
        host: this.configService.getOrThrow<string>('SMTP_HOST'),
        port: this.configService.getOrThrow<number>('SMTP_PORT'),

        // These options (secure and tls) must be changed in real production
        secure: false,
        tls: {
          rejectUnauthorized: false,
          // },
        },
      },

      template: {
        adapter: new EjsAdapter({ inlineCssEnabled: true }),
        dir: this.configService.getOrThrow<string>('EMAIL_TEMLATES_DIRECTORY'),
      },

      defaults: {
        date: new Date(),
        debug: true,
      },
    };
  }
}
