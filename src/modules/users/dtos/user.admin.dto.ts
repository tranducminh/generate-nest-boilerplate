import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { Permission } from '@common/constants/permission.const';
import { UserStatus } from '@common/constants/user-status.constant';
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

  @ApiProperty()
  status: UserStatus;

  constructor(user: UserEntity) {
    super(user);

    this.email = user.email;
    this.name = user.name;
    this.permissions = user.permissions;
    this.status = user.status;
    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }
}
