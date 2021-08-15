import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserAdminCommand } from '../commands/create-user.admin.command';
import { RemoveUserAdminCommand } from '../commands/remove-user.admin.command';
import { UpdateUserAdminCommand } from '../commands/update-user.admin.command';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';
import { IUsersAdminService } from '../interfaces/users.admin.service.interface';
import { GetAllUserQuery } from '../queries/get-all-user.query';
import { GetUserQuery } from '../queries/get-user.query';

@Injectable()
export class UsersAdminService implements IUsersAdminService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(
    data: CreateUserAdminDto,
    createById: number
  ): Promise<UserAdminDto> {
    const command = new CreateUserAdminCommand(createById, data);

    const user = await this.commandBus.execute(command);

    return user.toAdminDto();
  }

  async findAll(
    filter: UserFilterDto
  ): Promise<MultipleEntityDto<UserAdminDto>> {
    const query = new GetAllUserQuery(filter);

    const users = await this.queryBus.execute(query);

    return users.toAdminDto();
  }

  async findOne(id: number): Promise<UserAdminDto> {
    const query = new GetUserQuery(id);

    const user = await this.queryBus.execute(query);

    return user.toAdminDto();
  }

  async update(
    id: number,
    data: UpdateUserAdminDto,
    updateById: number
  ): Promise<void> {
    const command = new UpdateUserAdminCommand(id, data, updateById);

    await this.commandBus.execute(command);
  }

  async remove(id: number, removeById: number): Promise<void> {
    const command = new RemoveUserAdminCommand(id, removeById);

    await this.commandBus.execute(command);
  }
}
