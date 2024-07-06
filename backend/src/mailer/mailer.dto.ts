import { IsNotEmpty } from 'class-validator';

export class SendMailerDto {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}