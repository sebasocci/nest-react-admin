// schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { CreateScheduleDto } from '../schedule/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async save(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      dateCreated: new Date(),
    });
    return await this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ relations: ['course'] });
  }

  async findAllByUserId(courseId: string): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      where: { courseId },
      relations: ['course'],
    });
  }
}
