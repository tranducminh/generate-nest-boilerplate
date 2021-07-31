import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { CreateUserHandler } from './commands/create-user.command';
import { UpdateUserHandler } from './commands/update-user.command';
import { RemoveUserHandler } from './commands/remove-user.command';
import { GetALlUserHandler } from './queries/get-all-user.query';
import { GetUserHandler } from './queries/get-user.query';
import { GetUserByEmailHandler } from './queries/get-user-by-email.query';
import { GetIatRecordHandler } from './queries/get-iat-record.query';
import { CreateUserTokenHandler } from './commands/create-user-token.command';
import { RemoveUserTokenHandler } from './commands/remove-user-token.command';
import { RemoveIatRecordHandler } from './commands/remove-iat-record.command';
import { UserTokenRepository } from './repositories/user-token.repository';
import { GetPermissionRecordHandler } from './queries/get-permission-record.query';
import { RemovePermissionRecordHandler } from './commands/remove-permission-record.command';

const UsersCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler,
  CreateUserTokenHandler,
  RemoveUserTokenHandler,
  RemoveIatRecordHandler,
  RemovePermissionRecordHandler,
];

const UsersQueryHandlers = [
  GetUserHandler,
  GetALlUserHandler,
  GetUserByEmailHandler,
  GetIatRecordHandler,
  GetPermissionRecordHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository, UserTokenRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...UsersCommandHandlers, ...UsersQueryHandlers],
})
export class UsersModule {}
