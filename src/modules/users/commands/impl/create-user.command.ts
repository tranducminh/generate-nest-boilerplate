import { CreateUserDto } from '@modules/users/dtos/create-user.dto';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Command } from '@nestjs-architects/typed-cqrs';

export class CreateUserCommand extends Command<UserEntity> {
  constructor(public readonly data: CreateUserDto) {
    super();
  }
}
