import { GetUserByEmailQuery } from '@modules/users/queries/get-user-by-email.query';
import {
  Command,
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs-architects/typed-cqrs';
import { SendResetPasswordMailCommand } from 'mail/commands/send-reset-password-mail.command';

export class RequestResetPasswordByEmailVerificationCommand extends Command<void> {
  constructor(public readonly email: string) {
    super();
  }
}

@CommandHandler(RequestResetPasswordByEmailVerificationCommand)
export class RequestResetPasswordByEmailVerificationHandler
  implements
    ICommandHandler<RequestResetPasswordByEmailVerificationCommand, void>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    command: RequestResetPasswordByEmailVerificationCommand
  ): Promise<void> {
    const { email } = command;

    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));

    this.commandBus.execute(new SendResetPasswordMailCommand(user));
  }
}
