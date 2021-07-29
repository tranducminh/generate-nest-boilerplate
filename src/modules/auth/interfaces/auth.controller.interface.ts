import { ResponseDto } from '@common/dtos/response.dto';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';

export interface IAuthController {
  login(data: LoginLocalDto): Promise<ResponseDto<AuthDto>>;

  signup(data: SignupLocalDto): Promise<ResponseDto<AuthDto>>;
}
