import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './favorite.dto';

@Controller('favorite')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @Roles(Role.Admin, Role.Editor)
  async save(@Body() createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const { courseId, userId } = createFavoriteDto;
    return await this.favoriteService.save(courseId, userId);
  }

  @Get('/:userId')
  async findAll(@Param('userId') userId: string): Promise<Favorite[]> {
    return await this.favoriteService.findAllByUserId(userId);
  }

  @Delete('/:userId/:courseId')
  @Roles(Role.Admin, Role.Editor)
  async delete(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<void> {
    await this.favoriteService.delete(userId, courseId);
  }
}
