import { UpdateUserDto } from '@modules/users/dtos/update-user.dto';
import { Command } from '@nestjs-architects/typed-cqrs';

export class UpdateUserCommand extends Command<void> {
  constructor(public readonly id: number, public readonly data: UpdateUserDto) {
    super();
  }
}
