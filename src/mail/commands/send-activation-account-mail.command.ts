import { AppConfig } from '@configs/app/app.config';
import { UserEntity } from '@modules/users/entities/user.entity';
import {
  Command,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';

export class SendActivationAccountMailCommand extends Command<void> {
  constructor(public readonly user: UserEntity) {
    super();
  }
}

@CommandHandler(SendActivationAccountMailCommand)
export class SendActivationAccountMailHandler
  implements ICommandHandler<SendActivationAccountMailCommand, void>
{
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig
  ) {}

  async execute(command: SendActivationAccountMailCommand): Promise<void> {
    const { user } = command;

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        jti: uuid.v4(),
      },
      {
        secret: this.appConfig.get('MAIL_ACTIVATION_SECRET_KEY'),
        expiresIn: this.appConfig.get('MAIL_ACTIVATION_EXPIRED_TIME'),
      }
    );

    const domain = this.appConfig.get('BACKEND_DOMAIN');

    this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to My App! Confirm your Email',
      template: './activation-account',
      context: {
        name: user.name,
        email: user.email,
        id: user.id,
        url: `${domain}/auth/activate-account?token=${token}`,
      },
    });
  }
}
