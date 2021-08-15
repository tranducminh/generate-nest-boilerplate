import { RedisKey } from '@common/constants/redis-key.const';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';
import { GetUserQuery } from './get-user.query';

export class GetUserStatusRecordQuery extends Query<string> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetUserStatusRecordQuery)
export class GetUserStatusRecordHandler
  implements IQueryHandler<GetUserStatusRecordQuery, string>
{
  constructor(
    private readonly redisService: RedisService,
    private readonly queryBus: QueryBus
  ) {}

  async execute(query: GetUserStatusRecordQuery): Promise<string> {
    const status = await this.redisService
      .getClient()
      .get(`${RedisKey.USER_STATUS}_${query.userId}`);

    if (status) {
      return status;
    }

    const user = await this.queryBus.execute(new GetUserQuery(query.userId));

    const userStatus = user.status;

    await this.redisService
      .getClient()
      .set(`${RedisKey.USER_STATUS}_${query.userId}`, userStatus);

    return userStatus;
  }
}
