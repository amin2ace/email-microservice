import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailRequestDto } from './dto/send-email-request.dto';

@Injectable()
export class MailService {
  constructor(
    // @Inject('SEND_MAIL') private readonly response: ClientProxy,
    protected readonly configService: ConfigService,
    protected readonly mailer: MailerService,
  ) {}

  protected logger = new Logger(MailService.name, { timestamp: true });

  async sendWelcome(data: SendEmailRequestDto) {
    this.logger.log(`Data recieved from ${data.appName}`);

    this.logger.log('Verifing All Transporters...');
    if (!(await this.mailer.verifyAllTransporters())) {
      this.logger.log('Transporters Verification Failed!');
    }

    const { context, mail } = await this.extractData(data);

    await this.mailer.sendMail(mail);
    return this.logger.log(`Welcome email sent to ${context.userName}`);
  }

  async extractData(data: SendEmailRequestDto) {
    const context = {
      to: data.to, // Recipient's email address
      from: data.from, // Sender's email address
      cc: data.cc, // CC email address (optional)
      bcc: data.bcc, // BCC email address (optional)
      subject: data.subject, // Email subject
      template: data.template, // Template name
      userName: data.userName, // User's name
      appUrl: data.appUrl, // Application URL
      appName: data.appName, // Application name
      ...data.context, // Additional context data (if any)
    };

    const mail: ISendMailOptions = {
      template: 'welcome',
      from: 'ss',
      to: context.to,
      subject: context.subject,
      context,
    };

    return { context, mail };
  }
}
