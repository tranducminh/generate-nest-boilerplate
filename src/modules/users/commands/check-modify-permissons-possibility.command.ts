import { Permission } from '@common/constants/permission.const';
import {
  Command,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

export class CheckModifyPermissionsPossibilityCommand extends Command<void> {
  constructor(
    public readonly modifiedUserId: number,
    public readonly modifiedPermissions: Permission[] = []
  ) {
    super();
  }
}

@CommandHandler(CheckModifyPermissionsPossibilityCommand)
export class CheckModifyPermissionsPossibilityHandler
  implements ICommandHandler<CheckModifyPermissionsPossibilityCommand, void>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: CheckModifyPermissionsPossibilityCommand
  ): Promise<void> {
    const { modifiedPermissions, modifiedUserId } = command;

    const user = await this.userRepository.findOne(modifiedUserId);

    if (!user) throw new NotFoundException('User not found');

    const userPermissions = user.permissions;

    if (userPermissions.includes(Permission.SUPER_ADMIN)) return;

    if (
      modifiedPermissions.includes(Permission.SUPER_ADMIN) ||
      modifiedPermissions.includes(Permission.ADMIN)
    )
      throw new ForbiddenException('Not allowed to modify this permissions');
  }
}
