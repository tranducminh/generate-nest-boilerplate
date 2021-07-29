import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { AppConfig } from '@configs/app/app.config';
import { Command } from '@nestjs-architects/typed-cqrs';
import { UserEntity } from '@modules/users/entities/user.entity';

export class CreateTokenCommand extends Command<string> {
  constructor(public readonly user: UserEntity) {
    super();
  }
}

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler
  implements ICommandHandler<CreateTokenCommand, string>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig
  ) {}

  async execute(command: CreateTokenCommand): Promise<string> {
    const { user } = command;

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        jti: uuid.v4(),
      },
      {
        secret: this.appConfig.get('JWT_SECRET_KEY'),
        expiresIn: this.appConfig.get('JWT_EXPIRED_TIME'),
      }
    );

    return accessToken;
  }
}
