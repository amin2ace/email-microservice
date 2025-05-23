import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { SendEmailRequestDto } from './dto/send-email-request.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('email.welcome')
  async sendWelcomeEmail(@Payload() data: SendEmailRequestDto) {
    try {
      return await this.mailService.sendWelcome(data);
    } catch (error) {
      console.error('Error handling email.welcome message:', error);
      throw error;
    }
  }
}
