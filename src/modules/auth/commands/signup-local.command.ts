import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Command } from '@nestjs-architects/typed-cqrs';
import { SignupLocalDto } from '@modules/auth/dtos/signup-local.dto';
import { CreateUserCommand } from '@modules/users/commands/create-user.command';
import { SendActivationAccountMailCommand } from 'mail/commands/send-activation-account-mail.command';

export class SignupLocalCommand extends Command<void> {
  constructor(public readonly data: SignupLocalDto) {
    super();
  }
}

@CommandHandler(SignupLocalCommand)
export class SignupLocalHandler
  implements ICommandHandler<SignupLocalCommand, void>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: SignupLocalCommand): Promise<void> {
    const { data } = command;

    const newUser = await this.commandBus.execute(new CreateUserCommand(data));

    this.commandBus.execute(new SendActivationAccountMailCommand(newUser));
  }
}
