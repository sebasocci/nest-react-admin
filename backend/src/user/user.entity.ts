import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Role } from '../enums/role.enum';
import { Favorite } from 'src/favorite/favorite.entity';
import { Inscription } from 'src/inscription/inscription.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Favorite, (favorite) => favorite.course)
  favorites: Favorite[];

  @OneToMany(() => Inscription, (inscription) => inscription.user)
  inscriptions: Inscription;
}
