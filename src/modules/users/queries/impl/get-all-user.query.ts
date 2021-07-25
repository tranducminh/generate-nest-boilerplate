import { UserFilterDto } from '@modules/users/dtos/user-filter.dto';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Query } from '@nestjs-architects/typed-cqrs';

export class GetAllUserQuery extends Query<UserEntity[]> {
  constructor(public readonly filter: UserFilterDto) {
    super();
  }
}
