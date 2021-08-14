import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { IUsersService } from '../interfaces/users.service.interface';
import { GetUserQuery } from '../queries/get-user.query';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async findOne(id: number): Promise<UserDto> {
    const query = new GetUserQuery(id);

    const user = await this.queryBus.execute(query);

    return user.toDto();
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    const command = new UpdateUserCommand(id, data);

    await this.commandBus.execute(command);
  }
}
