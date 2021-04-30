import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateContentDto, UpdateContentDto } from 'src/content/content.dto';
import { Content } from 'src/content/content.entity';
import { ContentService } from 'src/content/content.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseService } from './course.service';

@Controller('courses')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly contentService: ContentService,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.Editor)
  async save(@Body() createCourseDto: CreateCourseDto): Promise<void> {
    await this.courseService.save(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return await this.courseService.findById(id);
  }

  @Put('/:id')
  @Roles(Role.Admin, Role.Editor)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<void> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<void> {
    await this.courseService.delete(id);
  }

  @Post('/:id/contents')
  @Roles(Role.Admin, Role.Editor)
  async saveContent(
    @Param('id') id: string,
    @Body() createContentDto: CreateContentDto,
  ): Promise<void> {
    await this.contentService.save(id, createContentDto);
  }

  @Get('/:id/contents')
  async findAllContentsByCourseId(@Param('id') id: string): Promise<Content[]> {
    return await this.contentService.findAllByCourseId(id);
  }

  @Put('/:id/contents/:contentId')
  @Roles(Role.Admin, Role.Editor)
  async updateContent(
    @Param('id') id: string,
    @Param('contentId') contentId: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<void> {
    await this.contentService.update(id, contentId, updateContentDto);
  }

  @Delete('/:id/contents/:contentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  async deleteContent(
    @Param('id') id: string,
    @Param('contentId') contentId: string,
  ): Promise<void> {
    await this.contentService.delete(id, contentId);
  }
}
