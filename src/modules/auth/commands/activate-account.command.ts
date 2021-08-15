import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '@configs/app/app.config';
import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserStatus } from '@common/constants/user-status.constant';
import { ErrorMessage } from '@common/constants/error-message.const';
import { GetUserQuery } from '@modules/users/queries/get-user.query';
import { UpdateUserLocalCommand } from '@modules/users/commands/update-user.local.command';

export class ActivateAccountCommand extends Command<void> {
  constructor(public readonly token: string) {
    super();
  }
}

@CommandHandler(ActivateAccountCommand)
export class ActivateAccountHandler
  implements ICommandHandler<ActivateAccountCommand, void>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
    private commandBus: CommandBus
  ) {}

  async execute(command: ActivateAccountCommand): Promise<void> {
    try {
      const { token } = command;

      const { id } = this.jwtService.verify(token, {
        secret: this.appConfig.get('MAIL_SECRET_KEY'),
      });

      const user = await this.commandBus.execute(new GetUserQuery(id));

      if (!user) throw new NotFoundException('User not found');

      if (user.status === UserStatus.ACTIVE)
        throw new BadRequestException('Account has been already activated');

      this.commandBus.execute(
        new UpdateUserLocalCommand(id, { status: UserStatus.ACTIVE })
      );
    } catch (error) {
      if (error.message === ErrorMessage.JWT_EXPIRED)
        throw new BadRequestException('Token is invalid');

      throw error;
    }
  }
}
