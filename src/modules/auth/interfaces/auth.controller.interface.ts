import { ResponseDto } from '@common/dtos/response.dto';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { ResendActivationAccountDto } from '../dtos/resend-activation-account.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';

export interface IAuthController {
  login(data: LoginLocalDto): Promise<ResponseDto<AuthDto>>;

  signup(data: SignupLocalDto): Promise<ResponseDto<null>>;

  logout(data: LogoutLocalDto): Promise<ResponseDto<null>>;

  activateAccount(token: string): Promise<ResponseDto<null>>;

  requestActivateAccount(
    data: ResendActivationAccountDto
  ): Promise<ResponseDto<null>>;
}
