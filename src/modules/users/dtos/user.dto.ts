import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends BaseEntityDto {
  email: string;
  name: string;
  avatar?: string;

  constructor(user: UserEntity) {
    super(user);

    this.email = user.email;
    this.name = user.name;
    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }
}
