import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '@configs/app/app.config';
import { Command } from '@nestjs-architects/typed-cqrs';
import { GetUserQuery } from '@modules/users/queries/get-user.query';
import { BadRequestException } from '@nestjs/common';

export class CheckResetPasswordTokenCommand extends Command<void> {
  constructor(public readonly token: string) {
    super();
  }
}

@CommandHandler(CheckResetPasswordTokenCommand)
export class CheckResetPasswordTokenHandler
  implements ICommandHandler<CheckResetPasswordTokenCommand, void>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CheckResetPasswordTokenCommand): Promise<void> {
    const { token } = command;

    const { id, iat } = this.jwtService.verify(token, {
      secret: this.appConfig.get('MAIL_RESET_PASSWORD_SECRET_KEY'),
    });

    const user = await this.queryBus.execute(new GetUserQuery(id));

    if (user.resetPasswordMailSentAt !== iat)
      throw new BadRequestException('Token is invalid');
  }
}
