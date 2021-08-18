import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '@configs/app/app.config';
import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { UserStatus } from '@common/constants/user-status.constant';
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
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  async execute(command: ActivateAccountCommand): Promise<void> {
    const { token } = command;

    const { id } = this.jwtService.verify(token, {
      secret: this.appConfig.get('MAIL_ACTIVATION_SECRET_KEY'),
    });

    const user = await this.queryBus.execute(new GetUserQuery(id));

    if (user.status === UserStatus.ACTIVE)
      throw new BadRequestException('Account has been already activated');

    this.commandBus.execute(
      new UpdateUserLocalCommand(id, { status: UserStatus.ACTIVE })
    );
  }
}
