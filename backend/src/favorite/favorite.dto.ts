import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdateFavoriteDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  courseId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userId?: string;
}
