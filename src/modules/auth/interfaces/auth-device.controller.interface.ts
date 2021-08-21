import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { UserTokenDto } from '@modules/users/dtos/user-token.dto';

export interface IAuthDeviceController {
  findAll(authUser: JwtClaimDto): Promise<ResponseDto<UserTokenDto[]>>;

  findOne(
    iat: number,
    authUser: JwtClaimDto
  ): Promise<ResponseDto<UserTokenDto>>;

  findCurrent(authUser: JwtClaimDto): Promise<ResponseDto<UserTokenDto>>;

  removeAll(authUser: JwtClaimDto): Promise<ResponseDto<null>>;

  removeOne(iat: number, authUser: JwtClaimDto): Promise<ResponseDto<null>>;
}
