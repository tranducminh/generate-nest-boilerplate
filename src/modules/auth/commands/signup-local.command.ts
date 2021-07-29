import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthDto } from '@modules/auth/dtos/auth.dto';
import { CreateTokenCommand } from './create-token.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import { SignupLocalDto } from '@modules/auth/dtos/signup-local.dto';
import { CreateUserCommand } from '@modules/users/commands/create-user.command';

export class SignupLocalCommand extends Command<AuthDto> {
  constructor(public readonly data: SignupLocalDto) {
    super();
  }
}

@CommandHandler(SignupLocalCommand)
export class SignupLocalHandler
  implements ICommandHandler<SignupLocalCommand, AuthDto>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: SignupLocalCommand): Promise<AuthDto> {
    const { data } = command;

    const newUser = await this.commandBus.execute(new CreateUserCommand(data));

    const token = await this.commandBus.execute(
      new CreateTokenCommand(newUser)
    );

    return new AuthDto(newUser.toDto(), token);
  }
}
