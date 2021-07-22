import { BaseDto } from '@base/dtos/base.dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends BaseDto {
  name: string;

  avatar?: string;

  constructor(user: UserEntity) {
    super(user);
    this.name = user.name;
    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }
}
