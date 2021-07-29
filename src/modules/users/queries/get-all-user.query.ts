import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserFilterDto } from '../dtos/user-filter.dto';

export class GetAllUserQuery extends Query<UserEntity[]> {
  constructor(public readonly filter: UserFilterDto) {
    super();
  }
}

@QueryHandler(GetAllUserQuery)
export class GetALlUserHandler
  implements IQueryHandler<GetAllUserQuery, UserEntity[]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetAllUserQuery) {
    const { skip, limit } = query.filter;

    return await this.userRepository.find({
      skip,
      take: limit,
    });
  }
}
