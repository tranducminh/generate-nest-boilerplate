import { Permission } from '@common/constants/permission.const';
import { UserEntity } from '@modules/users/entities/user.entity';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { generateHash, isRealEmail } from '@utils/index';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';

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
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserAdminCommand): Promise<UserEntity> {
    const { createById, data } = command;

    const existUser = await this.userRepository.findOne({ email: data.email });

    if (existUser) throw new BadRequestException('User already exists');

    if (!(await isRealEmail(data.email))) {
      throw new BadRequestException('Email address is not exist');
    }

    const createByUser = await this.userRepository.findOne(createById);

    if (
      !this.isAllowedCreatePermissions(
        data.permissions,
        createByUser?.permissions
      )
    ) {
      throw new ForbiddenException('Not allowed to create this permissions');
    }

    const newUser = this.userRepository.create({
      ...data,
      password: generateHash(data.password),
    });

    return this.userRepository.save(newUser);
  }

  isAllowedCreatePermissions(
    permissions: Permission[] = [],
    createByUserPermissions: Permission[] = []
  ): boolean {
    if (createByUserPermissions.includes(Permission.SUPER_ADMIN)) return true;

    if (
      permissions.includes(Permission.SUPER_ADMIN) ||
      permissions.includes(Permission.ADMIN)
    )
      return false;

    return true;
  }
}
