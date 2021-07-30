import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { RemoveUserCommand } from '../commands/remove-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserDto } from '../dtos/user.dto';
import { IUsersService } from '../interfaces/users.service.interface';
import { GetAllUserQuery } from '../queries/get-all-user.query';
import { GetUserQuery } from '../queries/get-user.query';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    const command = new CreateUserCommand(data);

    const user = await this.commandBus.execute(command);

    return user.toDto();
  }

  async findAll(filter: UserFilterDto): Promise<MultipleEntityDto<UserDto>> {
    const query = new GetAllUserQuery(filter);

    const users = await this.queryBus.execute(query);

    return users.toDto();
  }

  async findOne(id: number): Promise<UserDto> {
    const query = new GetUserQuery(id);

    const user = await this.queryBus.execute(query);

    return user.toDto();
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    const command = new UpdateUserCommand(id, data);

    await this.commandBus.execute(command);
  }

  async remove(id: number): Promise<void> {
    const command = new RemoveUserCommand(id);

    await this.commandBus.execute(command);
  }
}
