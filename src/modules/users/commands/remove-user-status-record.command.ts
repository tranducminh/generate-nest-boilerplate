import { RedisKey } from '@common/constants/redis-key.const';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';

export class RemoveUserStatusRecordCommand extends Command<void> {
  constructor(public readonly userIds: number[]) {
    super();
  }
}

@CommandHandler(RemoveUserStatusRecordCommand)
export class RemoveUserStatusRecordHandler
  implements ICommandHandler<RemoveUserStatusRecordCommand, void>
{
  constructor(private readonly redisService: RedisService) {}

  async execute(command: RemoveUserStatusRecordCommand): Promise<void> {
    if (!command.userIds.length) return;

    const keys = command.userIds.map((id) => `${RedisKey.USER_STATUS}_${id}`);

    await this.redisService.getClient().del(keys);
  }
}
