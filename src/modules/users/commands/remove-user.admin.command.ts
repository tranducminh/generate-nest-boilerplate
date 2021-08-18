import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckModifyPermissionsPossibilityCommand } from './check-modify-permissons-possibility.command';
import { RemoveIatRecordCommand } from './remove-iat-record.command';
import { RemovePermissionRecordCommand } from './remove-permission-record.command';
import { RemoveUserStatusRecordCommand } from './remove-user-status-record.command';
import { RemoveUserTokenCommand } from './remove-user-token.command';

export class RemoveUserAdminCommand extends Command<void> {
  constructor(public readonly id: number, public readonly removeById: number) {
    super();
  }
}

@CommandHandler(RemoveUserAdminCommand)
export class RemoveUserAdminHandler
  implements ICommandHandler<RemoveUserAdminCommand, void>
{
  constructor(
    private userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: RemoveUserAdminCommand): Promise<void> {
    const { id, removeById } = command;

    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('User not existed');

    await this.commandBus.execute(
      new CheckModifyPermissionsPossibilityCommand(removeById, user.permissions)
    );

    user.deletedAt = new Date();

    user.deletedById = removeById;

    this.userRepository.save(user, { reload: false });

    await this.commandBus.execute(new RemoveUserTokenCommand({ userId: id }));

    await this.commandBus.execute(new RemoveIatRecordCommand([id]));

    await this.commandBus.execute(new RemovePermissionRecordCommand([id]));

    await this.commandBus.execute(new RemoveUserStatusRecordCommand([id]));
  }
}
