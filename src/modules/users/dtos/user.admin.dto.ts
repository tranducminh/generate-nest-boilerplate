import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { Permission } from '@common/constants/permission.const';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserAdminDto extends BaseEntityDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiProperty()
  permissions: Permission[];

  constructor(user: UserEntity) {
    super(user);

    this.email = user.email;
    this.name = user.name;
    this.permissions = user.permissions;
    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }
}
