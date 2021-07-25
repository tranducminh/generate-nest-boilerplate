import { UserRepository } from '@modules/users/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, void>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, data } = command;

    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('User not existed');

    this.userRepository.update(id, data);
  }
}
