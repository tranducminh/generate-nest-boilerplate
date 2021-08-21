import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTokenEntity } from '../entities/user-token.entity';
import { UserTokenRepository } from '../repositories/user-token.repository';

export class GetUserTokenQuery extends Query<UserTokenEntity> {
  constructor(public readonly userId: number, public readonly iat: number) {
    super();
  }
}

@QueryHandler(GetUserTokenQuery)
export class GetUserTokenHandler
  implements IQueryHandler<GetUserTokenQuery, UserTokenEntity>
{
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async execute(query: GetUserTokenQuery) {
    const { userId, iat } = query;

    const userToken = await this.userTokenRepository.findOne({
      where: { userId, iat },
    });

    if (!userToken) throw new NotFoundException('Device not found');

    return userToken;
  }
}
