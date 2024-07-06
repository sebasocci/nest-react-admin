import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateRankingDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}

