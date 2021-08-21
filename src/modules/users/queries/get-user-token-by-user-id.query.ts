import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTokenEntity } from '../entities/user-token.entity';
import { UserTokenRepository } from '../repositories/user-token.repository';

export class GetUserTokenByUserIdQuery extends Query<UserTokenEntity[]> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetUserTokenByUserIdQuery)
export class GetUserTokenByUserIdHandler
  implements IQueryHandler<GetUserTokenByUserIdQuery, UserTokenEntity[]>
{
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async execute(query: GetUserTokenByUserIdQuery) {
    const { userId } = query;

    return this.userTokenRepository.find({
      where: { userId },
    });
  }
}
