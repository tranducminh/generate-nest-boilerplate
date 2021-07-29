import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUserQuery extends Query<UserEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserEntity> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<UserEntity> {
    const { id } = query;

    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
