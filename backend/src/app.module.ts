import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ScheduleModule } from './schedule/schedule.module';
import { InscriptionController } from './inscription/inscription.controller';
import { InscriptionModule } from './inscription/inscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
    FavoriteModule,
    ScheduleModule,
    InscriptionModule,
  ],
  controllers: [InscriptionController],
  providers: [],
})
export class AppModule {}
