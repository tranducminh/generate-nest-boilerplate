import { RedisKey } from '@common/constants/redis-key.const';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisService } from 'nestjs-redis';

interface IRecord {
  userId: number;
  values: number[];
}

export class CreateIatRecordCommand extends Command<void> {
  constructor(public readonly records: IRecord[]) {
    super();
  }
}

@CommandHandler(CreateIatRecordCommand)
export class CreateIatRecordHandler
  implements ICommandHandler<CreateIatRecordCommand, void>
{
  constructor(private readonly redisService: RedisService) {}

  async execute(command: CreateIatRecordCommand): Promise<void> {
    if (!command.records.length) return;

    await Promise.all(
      command.records.map(async (record) => {
        await this.redisService
          .getClient()
          .set(`${RedisKey.IAT}_${record.userId}`, record.values.join('|'));
      })
    );
  }
}
