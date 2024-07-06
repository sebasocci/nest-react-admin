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
  ParseIntPipe
} from '@nestjs/common';
import { Ranking } from '../ranking/ranking.entity';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './ranking.dto';

@Controller('ranking')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Rankings')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  @Roles(Role.User)
  async save(
    //@Param('courseId', ParseIntPipe) courseId: number,
    @Body() createRankingDto: CreateRankingDto    
  ): Promise<Ranking> {
    return this.rankingService.save(createRankingDto);
  }

  @Get(':courseId')
  async getSumByCourseId(@Param('courseId') courseId: string): Promise<number> {
    return this.rankingService.getCourseRanking(courseId);
  }
}
