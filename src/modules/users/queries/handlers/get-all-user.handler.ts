import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserQuery } from '../impl/get-all-user.query';

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
