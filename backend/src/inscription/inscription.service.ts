// Inscription.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscription } from '../inscription/inscription.entity';
import { Schedule } from '../schedule/schedule.entity';

@Injectable()
export class InscriptionService {
  constructor(
    @InjectRepository(Inscription)
    private readonly InscriptionRepository: Repository<Inscription>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async inscribe(userId: string, scheduleId: string): Promise<Inscription> {
    const schedule = await this.scheduleRepository.findOne(scheduleId, {
      relations: ['Inscriptions'],
    });

    if (!schedule) {
      throw new BadRequestException('Schedule not found');
    }

    if (schedule.inscriptions.length >= schedule.userLimit) {
      throw new BadRequestException('Schedule is full');
    }

    const Inscription = this.InscriptionRepository.create({
      schedule: { id: scheduleId },
      user: { id: userId },
      dateInscribed: new Date(),
    });

    return await this.InscriptionRepository.save(Inscription);
  }

  async unsubscribe(userId: string, scheduleId: string): Promise<void> {
    const Inscription = await this.InscriptionRepository.findOne({
      where: { user: { id: userId }, schedule: { id: scheduleId } },
    });

    if (!Inscription) {
      throw new BadRequestException('Inscription not found');
    }

    await this.InscriptionRepository.remove(Inscription);
  }

  async getUserInscriptions(userId: string): Promise<Inscription[]> {
    return await this.InscriptionRepository.find({
      where: { user: { id: userId } },
      relations: ['schedule', 'schedule.course'],
    });
  }
}
