import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';

export interface IUsersController {
  findOne(authUser: JwtClaimDto): Promise<ResponseDto<UserDto>>;

  update(
    data: UpdateUserDto,
    authUser: JwtClaimDto
  ): Promise<ResponseDto<null>>;
}
