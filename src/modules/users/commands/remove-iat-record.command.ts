import { RedisKey } from '@common/constants/redis-key.const';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';

export class RemoveIatRecordCommand extends Command<void> {
  constructor(public readonly userIds: number[]) {
    super();
  }
}

@CommandHandler(RemoveIatRecordCommand)
export class RemoveIatRecordHandler
  implements ICommandHandler<RemoveIatRecordCommand, void>
{
  constructor(private readonly _redisService: RedisService) {}

  async execute(command: RemoveIatRecordCommand): Promise<void> {
    if (!command.userIds.length) return;

    const keys = command.userIds.map((id) => `${RedisKey.IAT}_${id}`);

    await this._redisService.getClient().del(keys);
  }
}
