import { Permission } from '@common/constants/permission.const';
import { UserStatus } from '@common/constants/user-status.constant';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserLocalDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @IsEnum(Permission, { each: true })
  @IsOptional()
  readonly permissions?: Permission[];

  @IsEnum(UserStatus)
  @IsOptional()
  readonly status?: UserStatus;
}
