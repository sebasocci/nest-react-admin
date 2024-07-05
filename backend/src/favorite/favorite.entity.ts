import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../course/course.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: false, nullable: false })
  courseId: string;

  @ManyToOne(() => Course, (course) => course.favorites)
  course: Course;

  @Column({ select: false, nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @Column()
  dateCreated: Date;
}
