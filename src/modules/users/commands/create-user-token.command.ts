import { UserTokenRepository } from '@modules/users/repositories/user-token.repository';
import {
  Command,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { DeviceDetectorResult } from 'device-detector-js';

interface ICreateUserToken {
  userId: number;
  iat: number;
  exp: number;
  userAgent: DeviceDetectorResult;
}

export class CreateUserTokenCommand extends Command<void> {
  constructor(public readonly createUserToken: ICreateUserToken) {
    super();
  }
}

@CommandHandler(CreateUserTokenCommand)
export class CreateUserTokenHandler
  implements ICommandHandler<CreateUserTokenCommand, void>
{
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async execute(command: CreateUserTokenCommand): Promise<void> {
    const { createUserToken } = command;

    const newUserToken = this.userTokenRepository.create(createUserToken);

    await this.userTokenRepository.save(newUserToken, { reload: false });
  }
}
