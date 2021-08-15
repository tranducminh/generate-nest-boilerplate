import { Permission } from '@common/constants/permission.const';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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

    const removeByUser = await this.userRepository.findOne(removeById);

    if (
      !this.isAllowedRemoveUser(user.permissions, removeByUser?.permissions)
    ) {
      throw new ForbiddenException('Not allowed to remove this user');
    }

    user.deletedAt = new Date();

    this.userRepository.save(user, { reload: false });

    await this.commandBus.execute(new RemoveUserTokenCommand({ userId: id }));

    await this.commandBus.execute(new RemoveIatRecordCommand([id]));

    await this.commandBus.execute(new RemovePermissionRecordCommand([id]));

    await this.commandBus.execute(new RemoveUserStatusRecordCommand([id]));
  }

  isAllowedRemoveUser(
    permissions: Permission[] = [],
    removeByUserPermissions: Permission[] = []
  ): boolean {
    if (removeByUserPermissions.includes(Permission.SUPER_ADMIN)) return true;

    if (
      permissions.includes(Permission.SUPER_ADMIN) ||
      permissions.includes(Permission.ADMIN)
    )
      return false;

    return true;
  }
}
