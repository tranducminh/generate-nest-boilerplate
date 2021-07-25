import { UserRepository } from '@modules/users/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserCommand } from '../impl/remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler
  implements ICommandHandler<RemoveUserCommand, void>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: RemoveUserCommand): Promise<void> {
    const { id } = command;

    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('User not existed');

    user.deletedAt = new Date();

    this.userRepository.save(user, { reload: false });
  }
}
