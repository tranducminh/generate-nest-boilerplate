import { AppConfig } from '@configs/app/app.config';
import { UpdateUserLocalCommand } from '@modules/users/commands/update-user.local.command';
import {
  Command,
  CommandBus,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { JwtService } from '@nestjs/jwt';
import { CheckResetPasswordTokenCommand } from './check-reset-password-token.command';

export class ResetPasswordByEmailVerificationCommand extends Command<void> {
  constructor(
    public readonly token: string,
    public readonly newPassword: string
  ) {
    super();
  }
}

@CommandHandler(ResetPasswordByEmailVerificationCommand)
export class ResetPasswordByEmailVerificationHandler
  implements ICommandHandler<ResetPasswordByEmailVerificationCommand, void>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    command: ResetPasswordByEmailVerificationCommand
  ): Promise<void> {
    const { token, newPassword } = command;

    await this.commandBus.execute(new CheckResetPasswordTokenCommand(token));

    const { id } = this.jwtService.verify(token, {
      secret: this.appConfig.get('MAIL_RESET_PASSWORD_SECRET_KEY'),
    });

    this.commandBus.execute(
      new UpdateUserLocalCommand(id, {
        password: newPassword,
        resetPasswordMailSentAt: 0,
      })
    );
  }
}
