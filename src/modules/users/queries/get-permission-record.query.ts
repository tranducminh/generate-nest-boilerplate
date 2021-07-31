import { RedisKey } from '@common/constants/redis-key.const';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';
import { GetUserQuery } from './get-user.query';

export class GetPermissionRecordQuery extends Query<string[]> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetPermissionRecordQuery)
export class GetPermissionRecordHandler
  implements IQueryHandler<GetPermissionRecordQuery, string[]>
{
  constructor(
    private readonly redisService: RedisService,
    private readonly queryBus: QueryBus
  ) {}

  async execute(query: GetPermissionRecordQuery): Promise<string[]> {
    const permissions = await this.redisService
      .getClient()
      .get(`${RedisKey.PERMISSION}_${query.userId}`);

    if (permissions) {
      return permissions.split('|');
    }

    const user = await this.queryBus.execute(new GetUserQuery(query.userId));

    const userPermissions = user.permissions;

    await this.redisService
      .getClient()
      .set(`${RedisKey.PERMISSION}_${query.userId}`, userPermissions.join('|'));

    return userPermissions;
  }
}
