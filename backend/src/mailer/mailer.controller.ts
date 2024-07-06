import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './mailer.service';
import { SendMailerDto } from './mailer.dto';

@Controller('contact')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail(
    @Body() sendMailerDto: SendMailerDto
  ): Promise<void> {
    try {
      await this.emailService.sendEmail(sendMailerDto);
    } catch (error) {      
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
