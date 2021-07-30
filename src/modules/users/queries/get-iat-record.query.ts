import { RedisKey } from '@common/constants/redis-key.const';
import { UserTokenRepository } from '@modules/users/repositories/user-token.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';
import { LessThan } from 'typeorm';

export class GetIatRecordQuery extends Query<number[]> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetIatRecordQuery)
export class GetIatRecordHandler
  implements IQueryHandler<GetIatRecordQuery, number[]>
{
  constructor(
    private readonly redisService: RedisService,
    private readonly userTokenRepository: UserTokenRepository
  ) {}

  async execute(query: GetIatRecordQuery): Promise<number[]> {
    const iats = await this.redisService
      .getClient()
      .get(`${RedisKey.IAT}_${query.userId}`);
    if (iats) {
      return iats.split('|').map(Number);
    }

    const userIats = await this.findIatsByUserId(query.userId);

    await this.redisService
      .getClient()
      .set(`${RedisKey.IAT}_${query.userId}`, userIats.join('|'));

    return userIats;
  }

  async findIatsByUserId(userId: number) {
    const now = new Date().getTime() / 1000;

    await this.userTokenRepository.delete({ userId, exp: LessThan(now) });

    const tokens = await this.userTokenRepository.find({ userId });

    return tokens.map((token) => token.iat);
  }
}
