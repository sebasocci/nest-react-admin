// schedule.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Inscription } from '../inscription/inscription.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('simple-array')
  daysOfWeek: string[]; // ["Tuesday", "Thursday"]

  @Column()
  startTime: string; // "18:00"

  @Column()
  endTime: string; // "21:00"

  @Column({ default: 10 })
  userLimit: number;

  @Column()
  dateCreated: Date;

  @ManyToOne(() => Course, (course) => course.schedules)
  course: Course;

  @OneToMany(() => Inscription, (inscription) => inscription.schedule)
  inscriptions: Inscription[];
}
