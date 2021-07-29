import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUserByEmailQuery extends Query<UserEntity> {
  constructor(public readonly email: string) {
    super();
  }
}

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery, UserEntity>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<UserEntity> {
    const { email } = query;

    const user = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
