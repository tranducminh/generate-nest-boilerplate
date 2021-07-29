import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { CreateUserHandler } from './commands/create-user.command';
import { UpdateUserHandler } from './commands/update-user.command';
import { RemoveUserHandler } from './commands/remove-user.command';
import { GetUserHandler } from './queries/get-user.query';
import { GetALlUserHandler } from './queries/get-all-user.query';
import { GetUserByEmailHandler } from './queries/get-user-by-email.query';

const UsersCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler,
];

const UsersQueryHandlers = [
  GetUserHandler,
  GetALlUserHandler,
  GetUserByEmailHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, ...UsersCommandHandlers, ...UsersQueryHandlers],
})
export class UsersModule {}
