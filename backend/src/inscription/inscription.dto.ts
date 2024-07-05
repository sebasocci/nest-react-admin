import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateInscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UpdateInscriptionDto {
  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
