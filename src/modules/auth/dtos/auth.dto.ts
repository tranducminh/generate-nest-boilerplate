import { BaseDto } from '@base/dtos/base.dto';
import { UserDto } from '@modules/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto extends BaseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty()
  token: string;

  constructor(user: UserDto, token: string) {
    super();

    this.user = user;
    this.token = token;
  }
}
