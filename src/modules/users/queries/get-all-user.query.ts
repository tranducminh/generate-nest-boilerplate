import { MultipleEntity } from '@common/entities/multiple-entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';
import { UserDto } from '../dtos/user.dto';

export class GetAllUserQuery extends Query<
  MultipleEntity<UserDto, UserAdminDto>
> {
  constructor(public readonly filter: UserFilterDto) {
    super();
  }
}

@QueryHandler(GetAllUserQuery)
export class GetALlUserHandler
  implements IQueryHandler<GetAllUserQuery, MultipleEntity>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetAllUserQuery) {
    const { skip, limit, page } = query.filter;

    const [users, count] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });

    const pagination = {
      page,
      itemCount: count,
      pageCount: Math.ceil(count / limit),
    };

    return new MultipleEntity(users, pagination);
  }
}
