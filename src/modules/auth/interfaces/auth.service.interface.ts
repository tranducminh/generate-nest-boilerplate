import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { ResetPasswordByCurrentPasswordDto } from '../dtos/reset-password-by-current_password.dto';
import { ResetPasswordByEmailVerificationDto } from '../dtos/reset-password-by-email-verification.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';

export interface IAuthService {
  login(data: LoginLocalDto, userAgent?: string): Promise<AuthDto>;

  signup(data: SignupLocalDto): Promise<void>;

  logout(data: LogoutLocalDto): Promise<void>;

  activateAccount(token: string): Promise<void>;

  requestActivateAccount(email: string): Promise<void>;

  requestResetPasswordByEmailVerification(email: string): Promise<void>;

  resetPasswordByEmailVerification(
    data: ResetPasswordByEmailVerificationDto
  ): Promise<void>;

  checkResetPasswordToken(token: string): Promise<string | null>;

  resetPasswordByCurrentPassword(
    id: number,
    data: ResetPasswordByCurrentPasswordDto
  ): Promise<void>;
}
