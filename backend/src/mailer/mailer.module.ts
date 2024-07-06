import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './mailer.service';
import { ContactController } from './mailer.controller';

@Module({  
  controllers: [ContactController],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailerModule {}
