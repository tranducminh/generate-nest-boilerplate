import { UserTokenDto } from '@modules/users/dtos/user-token.dto';
import { GetUserTokenByUserIdQuery } from '@modules/users/queries/get-user-token-by-user-id.query';
import { GetUserTokenQuery } from '@modules/users/queries/get-user-token.query';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LogoutLocalCommand } from '../commands/logout-local.command';
import { IAuthDeviceService } from '../interfaces/auth-device.service.interface';

@Injectable()
export class AuthDeviceService implements IAuthDeviceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async findAll(userId: number): Promise<UserTokenDto[]> {
    const query = new GetUserTokenByUserIdQuery(userId);

    const devices = await this.queryBus.execute(query);

    return devices.map((device) => device.toDto());
  }

  async findOne(iat: number, userId: number): Promise<UserTokenDto> {
    const query = new GetUserTokenQuery(userId, iat);

    const device = await this.queryBus.execute(query);

    return device.toDto();
  }

  async removeAll(userId: number): Promise<void> {
    const command = new LogoutLocalCommand({ id: userId });

    await this.commandBus.execute(command);
  }

  async removeOne(iat: number, userId: number): Promise<void> {
    const command = new LogoutLocalCommand({ id: userId, iat });

    await this.commandBus.execute(command);
  }
}
