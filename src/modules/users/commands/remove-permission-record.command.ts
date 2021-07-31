import { RedisKey } from '@common/constants/redis-key.const';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';

export class RemovePermissionRecordCommand extends Command<void> {
  constructor(public readonly userIds: number[]) {
    super();
  }
}

@CommandHandler(RemovePermissionRecordCommand)
export class RemovePermissionRecordHandler
  implements ICommandHandler<RemovePermissionRecordCommand, void>
{
  constructor(private readonly redisService: RedisService) {}

  async execute(command: RemovePermissionRecordCommand): Promise<void> {
    if (command.userIds.length) return;

    const keys = command.userIds.map((id) => `${RedisKey.PERMISSION}_${id}`);

    await this.redisService.getClient().del(keys);
  }
}
