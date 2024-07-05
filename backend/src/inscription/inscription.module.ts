import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { Inscription } from './inscription.entity';
import { Schedule } from '../schedule/schedule.entity';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inscription, Schedule])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports: [InscriptionService],
})
export class InscriptionModule {}
