import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Command } from '@nestjs-architects/typed-cqrs';
import { RemoveIatRecordCommand } from '@modules/users/commands/remove-iat-record.command';
import { RemovePermissionRecordCommand } from '@modules/users/commands/remove-permission-record.command';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { RemoveUserTokenCommand } from '@modules/users/commands/remove-user-token.command';
import { RemoveUserStatusRecordCommand } from '@modules/users/commands/remove-user-status-record.command';

export class LogoutLocalCommand extends Command<void> {
  constructor(public readonly data: LogoutLocalDto) {
    super();
  }
}

@CommandHandler(LogoutLocalCommand)
export class LogoutLocalHandler
  implements ICommandHandler<LogoutLocalCommand, void>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: LogoutLocalCommand): Promise<void> {
    const { id, iat } = command.data;

    if (iat) {
      await this.commandBus.execute(
        new RemoveUserTokenCommand({ userId: id, iats: [iat] })
      );
    } else {
      await this.commandBus.execute(new RemoveUserTokenCommand({ userId: id }));
    }

    await this.commandBus.execute(new RemoveIatRecordCommand([id]));

    await this.commandBus.execute(new RemovePermissionRecordCommand([id]));

    await this.commandBus.execute(new RemoveUserStatusRecordCommand([id]));
  }
}
