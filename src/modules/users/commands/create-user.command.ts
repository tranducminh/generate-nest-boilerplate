import { Role, User } from '@common/constants/permission.const';
import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { generateHash } from '@utils/index';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand extends Command<UserEntity> {
  constructor(public readonly data: CreateUserDto | CreateUserAdminDto) {
    super();
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserEntity>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const { data } = command;

    const existUser = await this.userRepository.findOne({ email: data.email });

    if (existUser) throw new BadRequestException('User already exists');

    const newUser = this.userRepository.create({
      ...data,
      password: generateHash(data.password),
      permissions: [Role.USER, User.READ],
    });

    return this.userRepository.save(newUser);
  }
}
