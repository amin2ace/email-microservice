import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailRequestDto } from './dto/send-email-request.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('email.welcome')
  async sendWelcomeEmail(@Payload() data: SendEmailRequestDto) {
    return this.mailService.sendWelcome(data);
  }
}
