import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends BaseEntityDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
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
