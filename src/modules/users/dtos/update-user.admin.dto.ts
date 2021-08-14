import { Permission } from '@common/constants/permission.const';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateUserAdminDto extends UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly permissions?: Permission[];
}
