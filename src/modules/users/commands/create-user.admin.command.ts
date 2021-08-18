import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { isRealEmail } from '@utils/index';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { CheckModifyPermissionsPossibilityCommand } from './check-modify-permissons-possibility.command';

export class CreateUserAdminCommand extends Command<UserEntity> {
  constructor(
    public readonly createById: number,
    public readonly data: CreateUserAdminDto
  ) {
    super();
  }
}

@CommandHandler(CreateUserAdminCommand)
export class CreateUserAdminHandler
  implements ICommandHandler<CreateUserAdminCommand, UserEntity>
{
  constructor(
    private userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: CreateUserAdminCommand): Promise<UserEntity> {
    const { createById, data } = command;

    const existUser = await this.userRepository.findOne({ email: data.email });

    if (existUser) throw new BadRequestException('User already exists');

    if (!(await isRealEmail(data.email))) {
      throw new BadRequestException('Email address is not exist');
    }

    await this.commandBus.execute(
      new CheckModifyPermissionsPossibilityCommand(createById, data.permissions)
    );

    const newUser = this.userRepository.create({
      ...data,
      createdById: createById,
    });

    return this.userRepository.save(newUser);
  }
}
