import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Ranking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @Column({ nullable: true }) 
  userId: string;

  @Column({ default: 0 })
  rating: number;  

  @Column()
  dateCreated: Date;

  @OneToMany(() => Course, (course) => course.ranking)
  course: Course[];
}
