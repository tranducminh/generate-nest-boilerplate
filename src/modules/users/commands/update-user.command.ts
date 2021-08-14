import { UpdateUserDto } from '@modules/users/dtos/update-user.dto';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly id: number,
    public readonly data: UpdateUserDto | UpdateUserAdminDto
  ) {
    super();
  }
}

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
