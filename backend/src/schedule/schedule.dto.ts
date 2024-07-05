import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsIn(
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    { each: true },
  )
  daysOfWeek: string[];

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  userLimit: number;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}

export class UpdateScheduleDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    { each: true },
  )
  daysOfWeek?: string[];

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsNumber()
  userLimit?: number;
}
