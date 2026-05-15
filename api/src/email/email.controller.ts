import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('google/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('send')
  async sendEmail(@Query('userId') userId: string) {
    return this.emailService.sendEmail(userId);
  }
}
