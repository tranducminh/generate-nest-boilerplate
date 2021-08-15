import { UserTokenRepository } from '@modules/users/repositories/user-token.repository';
import {
  Command,
  CommandHandler,
  ICommandHandler,
} from '@nestjs-architects/typed-cqrs';
import { In } from 'typeorm';

interface IRemoveUserToken {
  userId: number;
  iats?: number[];
}

export class RemoveUserTokenCommand extends Command<void> {
  constructor(public readonly removeUserToken: IRemoveUserToken) {
    super();
  }
}

@CommandHandler(RemoveUserTokenCommand)
export class RemoveUserTokenHandler
  implements ICommandHandler<RemoveUserTokenCommand, void>
{
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async execute(command: RemoveUserTokenCommand): Promise<void> {
    const { userId, iats } = command.removeUserToken;

    if (iats?.length) {
      await this.userTokenRepository.delete({ userId, iat: In(iats) });
    } else {
      await this.userTokenRepository.delete({ userId });
    }
  }
}
