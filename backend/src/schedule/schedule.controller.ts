import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './schedule.dto';

@Controller('schedules')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(Role.Admin, Role.Editor)
  async save(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleService.save(createScheduleDto);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return await this.scheduleService.findAll();
  }

  @Get('/:courseId')
  async findAllByUser(
    @Param('courseId') courseId: string,
  ): Promise<Schedule[]> {
    return await this.scheduleService.findAllByUserId(courseId);
  }
}
