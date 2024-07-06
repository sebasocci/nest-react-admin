import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { CreateRankingDto } from './ranking.dto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
  ) {}
 
  async save(createRankingDto: CreateRankingDto): Promise<Ranking> {
    return await Ranking.create({
      ...createRankingDto,
      dateCreated: new Date(),
    }).save();
  }

  async getCourseRanking(courseId: string): Promise<number> {
    const result = await this.rankingRepository
      .createQueryBuilder('ranking')
      .select('SUM(ranking.rating)', 'sum')
      .where('ranking.courseId = :courseId', { courseId })
      .getRawOne();

    return result.sum || 0;
  }
}
