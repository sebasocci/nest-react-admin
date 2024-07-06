import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { Inscription } from './inscription.entity';

@Controller('inscription')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Inscriptions')
export class InscriptionController {
  constructor(private readonly InscriptionService: InscriptionService) {}

  @Post(':userId/:scheduleId')
  @Roles(Role.Admin, Role.Editor)
  async inscribe(
    @Param('userId') userId: string,
    @Param('scheduleId') scheduleId: string,
  ): Promise<Inscription> {
    return await this.InscriptionService.inscribe(userId, scheduleId);
  }

  @Delete(':userId/:scheduleId')
  @Roles(Role.Admin, Role.Editor)
  async unsubscribe(
    @Param('userId') userId: string,
    @Param('scheduleId') scheduleId: string,
  ): Promise<void> {
    await this.InscriptionService.unsubscribe(userId, scheduleId);
  }

  @Get(':userId')
  async getUserInscriptions(
    @Param('userId') userId: string,
  ): Promise<Inscription[]> {
    return await this.InscriptionService.getUserInscriptions(userId);
  }
}
