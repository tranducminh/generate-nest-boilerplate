import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ActivateAccountCommand } from '../commands/activate-account.command';
import { LoginLocalCommand } from '../commands/login-local.command';
import { LogoutLocalCommand } from '../commands/logout-local.command';
import { RequestActivateAccountCommand } from '../commands/request-activate-account.command';
import { SignupLocalCommand } from '../commands/signup-local.command';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import { IAuthService } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async login(data: LoginLocalDto): Promise<AuthDto> {
    const command = new LoginLocalCommand(data);

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
}
