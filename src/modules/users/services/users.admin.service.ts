import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { RemoveUserCommand } from '../commands/remove-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
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

  async create(data: CreateUserAdminDto): Promise<UserAdminDto> {
    const command = new CreateUserCommand(data);

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

  async update(id: number, data: UpdateUserAdminDto): Promise<void> {
    const command = new UpdateUserCommand(id, data);

    await this.commandBus.execute(command);
  }

  async remove(id: number): Promise<void> {
    const command = new RemoveUserCommand(id);

    await this.commandBus.execute(command);
  }
}
