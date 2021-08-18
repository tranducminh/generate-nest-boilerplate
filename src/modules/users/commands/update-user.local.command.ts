import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { generateHash } from '@utils/index';
import { UpdateUserLocalDto } from '../dtos/update-user.local.dto';

export class UpdateUserLocalCommand extends Command<void> {
  constructor(
    public readonly id: number,
    public readonly data: UpdateUserLocalDto
  ) {
    super();
  }
}

@CommandHandler(UpdateUserLocalCommand)
export class UpdateUserLocalHandler
  implements ICommandHandler<UpdateUserLocalCommand, void>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: UpdateUserLocalCommand): Promise<void> {
    let { data } = command;

    const user = await this.userRepository.findOne(command.id);

    if (!user) throw new NotFoundException('User not existed');

    if (data.password) {
      data = {
        ...data,
        password: generateHash(data.password),
      };
    }

    this.userRepository.update(command.id, data);
  }
}
