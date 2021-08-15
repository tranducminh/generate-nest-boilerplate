import { Permission } from '@common/constants/permission.const';
import { UserStatus } from '@common/constants/user-status.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateUserAdminDto extends UpdateUserDto {
  @ApiPropertyOptional()
  @IsEnum(Permission, { each: true })
  @IsOptional()
  readonly permissions?: Permission[];

  @ApiPropertyOptional()
  @IsEnum(UserStatus)
  @IsOptional()
  readonly status?: UserStatus;
}
