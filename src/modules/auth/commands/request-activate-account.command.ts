import { UserStatus } from '@common/constants/user-status.constant';
import { GetUserByEmailQuery } from '@modules/users/queries/get-user-by-email.query';
import {
  Command,
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { SendActivationAccountMailCommand } from 'mail/commands/send-activation-account-mail.command';

export class RequestActivateAccountCommand extends Command<void> {
  constructor(public readonly email: string) {
    super();
  }
}

@CommandHandler(RequestActivateAccountCommand)
export class RequestActivateAccountHandler
  implements ICommandHandler<RequestActivateAccountCommand, void>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: RequestActivateAccountCommand): Promise<void> {
    const { email } = command;

    const getUserQuery = new GetUserByEmailQuery(email);

    const user = await this.queryBus.execute(getUserQuery);

    if (user.status === UserStatus.PENDING) {
      this.commandBus.execute(new SendActivationAccountMailCommand(user));
      return;
    }

    if (user.status === UserStatus.BLOCKED)
      throw new BadRequestException('Account has been blocked');

    if (user.status === UserStatus.ACTIVE)
      throw new BadRequestException('Account has been already activated');
  }
}
