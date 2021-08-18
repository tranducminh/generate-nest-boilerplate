import { UpdateUserLocalCommand } from '@modules/users/commands/update-user.local.command';
import { GetUserQuery } from '@modules/users/queries/get-user.query';
import {
  Command,
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs-architects/typed-cqrs';
import { ForbiddenException } from '@nestjs/common';
import { isMatchedHash } from '@utils/index';

export class ResetPasswordByCurrentPasswordCommand extends Command<void> {
  constructor(
    public readonly id: number,
    public readonly currentPassword: string,
    public readonly newPassword: string
  ) {
    super();
  }
}

@CommandHandler(ResetPasswordByCurrentPasswordCommand)
export class ResetPasswordByCurrentPasswordHandler
  implements ICommandHandler<ResetPasswordByCurrentPasswordCommand, void>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: ResetPasswordByCurrentPasswordCommand): Promise<void> {
    const { id, currentPassword, newPassword } = command;

    const user = await this.queryBus.execute(new GetUserQuery(id));

    if (!isMatchedHash(currentPassword, user.password))
      throw new ForbiddenException('Current password is incorrect');

    this.commandBus.execute(
      new UpdateUserLocalCommand(id, {
        password: newPassword,
      })
    );
  }
}
