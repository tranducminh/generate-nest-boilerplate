import { UserEntity } from '@modules/users/entities/user.entity';
import { Query } from '@nestjs-architects/typed-cqrs';

export class GetUserQuery extends Query<UserEntity> {
  constructor(public readonly id: number) {
    super();
  }
}
