import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserEntity>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const { data } = command;

    const newUser = this.userRepository.create(data);

    return await this.userRepository.save(newUser);
  }
}
