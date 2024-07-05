import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Course])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
