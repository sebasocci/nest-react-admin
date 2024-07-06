import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailerDto } from './mailer.dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({     
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
          user: '929b5958071345',
          pass: '166ddbcc8a1718',
        },
    });
    //token: 'eyJhbGciOiJIUzUxMiJ9.eyJkYXRhIjp7InRva2VuIjoiMTU1YzIyYTQxNmMwOTNkOWY4YjlhMjZhNTRmZTM4YWUifX0.vN1c0V_RZuq-CHDevVbiNMPk2ECJqyMC9naKNlrRxBlkan-wqXlHmWdxE-uqYsAQEv-5s05qO4Z3l60_9j4Xyg' })
    }

  async sendEmail(sendMailerDto: SendMailerDto): Promise<void> {
    const mailOptions = {
      from: 'sebasocci87@gmail.com', 
      ...sendMailerDto
    };

    await this.transporter.sendMail(mailOptions);
  }
}
