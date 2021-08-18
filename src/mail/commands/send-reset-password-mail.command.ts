import { AppConfig } from '@configs/app/app.config';
import { UpdateUserLocalCommand } from '@modules/users/commands/update-user.local.command';
import { UserEntity } from '@modules/users/entities/user.entity';
import {
  Command,
  CommandBus,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';

export class SendResetPasswordMailCommand extends Command<void> {
  constructor(public readonly user: UserEntity) {
    super();
  }
}

@CommandHandler(SendResetPasswordMailCommand)
export class SendResetPasswordMailHandler
  implements ICommandHandler<SendResetPasswordMailCommand, void>
{
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: SendResetPasswordMailCommand): Promise<void> {
    const { user } = command;

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        jti: uuid.v4(),
      },
      {
        secret: this.appConfig.get('MAIL_RESET_PASSWORD_SECRET_KEY'),
        expiresIn: this.appConfig.get('MAIL_RESET_PASSWORD_EXPIRED_TIME'),
      }
    );

    const domain = this.appConfig.get('BACKEND_DOMAIN');

    const { iat } = await this.jwtService.verify(token, {
      secret: this.appConfig.get('MAIL_RESET_PASSWORD_SECRET_KEY'),
    });

    this.commandBus.execute(
      new UpdateUserLocalCommand(user.id, { resetPasswordMailSentAt: iat })
    );

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Reset password',
      template: './reset-password',
      context: {
        name: user.name,
        url: `${domain}/auth/reset-password/methods/email-verification/form?token=${token}`,
      },
    });
  }
}
