import { Permission } from '@common/constants/permission.const';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserAdminDto extends CreateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly permissions?: Permission[];
}
