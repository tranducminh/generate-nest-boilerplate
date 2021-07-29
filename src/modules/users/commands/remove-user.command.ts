import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class RemoveUserCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}

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
