import { Command } from '@nestjs-architects/typed-cqrs';

export class RemoveUserCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}
