import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async save(courseId: string, userId: string): Promise<Favorite> {
    const existingFavorite = await this.favoriteRepository.findOne({ where: { courseId, userId } });

    if (existingFavorite) {
      return existingFavorite;
    }

    const newFavorite = this.favoriteRepository.create({
      courseId,
      userId,
      dateCreated: new Date(),
    });

    await this.favoriteRepository.save(newFavorite);    
    return newFavorite;
  }

  async find(courseId: string, userId: string): Promise<Favorite> {
    return Favorite.findOne({ where: { courseId, userId } });    
  }

  async findAllByUserId(userId: string): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: { userId },
      relations: ['course'],
    });
  }

  async delete(userId: string, courseId: string): Promise<void> {
    await this.favoriteRepository.delete({ userId, courseId });
  }
}
