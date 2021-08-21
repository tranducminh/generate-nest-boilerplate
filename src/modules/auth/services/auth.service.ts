import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ActivateAccountCommand } from '../commands/activate-account.command';
import { CheckResetPasswordTokenCommand } from '../commands/check-reset-password-token.command';
import { LoginLocalCommand } from '../commands/login-local.command';
import { LogoutLocalCommand } from '../commands/logout-local.command';
import { RequestActivateAccountCommand } from '../commands/request-activate-account.command';
import { RequestResetPasswordByEmailVerificationCommand } from '../commands/request-reset-password-by-email-verification.command';
import { ResetPasswordByCurrentPasswordCommand } from '../commands/reset-password-by-current_password.command';
import { ResetPasswordByEmailVerificationCommand } from '../commands/reset-password-by-email-verification.command';
import { SignupLocalCommand } from '../commands/signup-local.command';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { ResetPasswordByCurrentPasswordDto } from '../dtos/reset-password-by-current_password.dto';
import { ResetPasswordByEmailVerificationDto } from '../dtos/reset-password-by-email-verification.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import { IAuthService } from '../interfaces/auth.service.interface';
import DeviceDetector = require('device-detector-js');

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async login(data: LoginLocalDto, userAgent?: string): Promise<AuthDto> {
    const deviceDetector = new DeviceDetector();

    const command = new LoginLocalCommand(
      data,
      deviceDetector.parse(userAgent || '')
    );

    return this.commandBus.execute(command);
  }

  async signup(data: SignupLocalDto): Promise<void> {
    const command = new SignupLocalCommand(data);

    await this.commandBus.execute(command);
  }

  async logout(data: LogoutLocalDto): Promise<void> {
    const command = new LogoutLocalCommand(data);

    await this.commandBus.execute(command);
  }

  async activateAccount(token: string): Promise<void> {
    const command = new ActivateAccountCommand(token);

    await this.commandBus.execute(command);
  }

  async requestActivateAccount(email: string): Promise<void> {
    const command = new RequestActivateAccountCommand(email);

    await this.commandBus.execute(command);
  }

  async requestResetPasswordByEmailVerification(email: string): Promise<void> {
    const command = new RequestResetPasswordByEmailVerificationCommand(email);

    await this.commandBus.execute(command);
  }

  async resetPasswordByEmailVerification(
    data: ResetPasswordByEmailVerificationDto
  ): Promise<void> {
    const command = new ResetPasswordByEmailVerificationCommand(
      data.token,
      data.newPassword
    );

    await this.commandBus.execute(command);
  }

  async checkResetPasswordToken(token: string): Promise<string | null> {
    try {
      const command = new CheckResetPasswordTokenCommand(token);

      await this.commandBus.execute(command);

      return null;
    } catch (error) {
      return error.message;
    }
  }

  async resetPasswordByCurrentPassword(
    id: number,
    data: ResetPasswordByCurrentPasswordDto
  ): Promise<void> {
    const command = new ResetPasswordByCurrentPasswordCommand(
      id,
      data.currentPassword,
      data.newPassword
    );

    await this.commandBus.execute(command);
  }
}
