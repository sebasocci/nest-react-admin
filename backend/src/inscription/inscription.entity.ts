// Inscription.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { User } from '../user/user.entity';

@Entity()
export class Inscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.inscriptions)
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.inscriptions)
  user: User;

  @Column()
  dateInscribed: Date;
}
