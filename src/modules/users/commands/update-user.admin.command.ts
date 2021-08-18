import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { CheckModifyPermissionsPossibilityCommand } from './check-modify-permissons-possibility.command';
import { RemovePermissionRecordCommand } from './remove-permission-record.command';
import { RemoveUserStatusRecordCommand } from './remove-user-status-record.command';

export class UpdateUserAdminCommand extends Command<void> {
  constructor(
    public readonly id: number,
    public readonly data: UpdateUserAdminDto,
    public readonly updateById: number
  ) {
    super();
  }
}

@CommandHandler(UpdateUserAdminCommand)
export class UpdateUserAdminHandler
  implements ICommandHandler<UpdateUserAdminCommand, void>
{
  constructor(
    private userRepository: UserRepository,
    private commandBus: CommandBus
  ) {}

  async execute(command: UpdateUserAdminCommand): Promise<void> {
    const { id, data, updateById } = command;

    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('User not existed');

    if (data.permissions) {
      await this.commandBus.execute(
        new CheckModifyPermissionsPossibilityCommand(
          updateById,
          data.permissions
        )
      );

      await this.commandBus.execute(
        new RemovePermissionRecordCommand([user.id])
      );
    }

    if (data.status) {
      await this.commandBus.execute(
        new RemoveUserStatusRecordCommand([user.id])
      );
    }

    this.userRepository.update(id, { ...data, updatedById: updateById });
  }
}
