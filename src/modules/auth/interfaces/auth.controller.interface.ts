import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { RequestActivateAccountDto } from '../dtos/request-activate-account.dto';
import { RequestResetPasswordByEmailVerificationDto } from '../dtos/request-reset-password-by-email-verification.dto';
import { ResetPasswordByCurrentPasswordDto } from '../dtos/reset-password-by-current_password.dto';
import { ResetPasswordByEmailVerificationDto } from '../dtos/reset-password-by-email-verification.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import { FastifyReply, FastifyRequest } from 'fastify';

export interface IAuthController {
  login(
    data: LoginLocalDto,
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<ResponseDto<AuthDto>>;

  signup(data: SignupLocalDto): Promise<ResponseDto<null>>;

  logout(data: LogoutLocalDto, res: FastifyReply): Promise<ResponseDto<null>>;

  activateAccount(token: string): Promise<ResponseDto<null>>;

  requestActivateAccount(
    data: RequestActivateAccountDto
  ): Promise<ResponseDto<null>>;

  requestResetPasswordByEmailVerification(
    data: RequestResetPasswordByEmailVerificationDto
  ): Promise<ResponseDto<null>>;

  resetPasswordByEmailVerification(
    data: ResetPasswordByEmailVerificationDto
  ): Promise<ResponseDto<null>>;

  getResetPasswordForm(token: string): Promise<ResetPwdFormParam>;

  resetPasswordByCurrentPassword(
    authUser: JwtClaimDto,
    data: ResetPasswordByCurrentPasswordDto
  ): Promise<ResponseDto<null>>;
}

export type ResetPwdFormParam = {
  token: string;
  error: string | null;
};
