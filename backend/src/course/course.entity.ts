import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Content } from '../content/content.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dateCreated: Date;

  @OneToMany(() => Content, (content) => content.course)
  contents: Content[];

  @OneToMany(() => Favorite, (favorite) => favorite.course)
  favorites: Favorite[];

  @OneToMany(() => Schedule, (schedule) => schedule.course)
  schedules: Schedule[];
}
