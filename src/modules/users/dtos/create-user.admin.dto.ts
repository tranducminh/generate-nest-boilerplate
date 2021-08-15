import { Permission } from '@common/constants/permission.const';
import { UserStatus } from '@common/constants/user-status.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserAdminDto extends CreateUserDto {
  @ApiPropertyOptional()
  @IsEnum(Permission, { each: true })
  @IsOptional()
  readonly permissions?: Permission[] = [Permission.USER, Permission.USER_READ];

  @ApiPropertyOptional()
  @IsEnum(UserStatus)
  @IsOptional()
  readonly status?: UserStatus = UserStatus.PENDING;
}
