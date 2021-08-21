import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { CreateUserHandler } from './commands/create-user.command';
import { UpdateUserHandler } from './commands/update-user.command';
import { RemoveUserAdminHandler } from './commands/remove-user.admin.command';
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
import { UsersAdminController } from './controllers/users.admin.controller';
import { UsersAdminService } from './services/users.admin.service';
import { GetUserStatusRecordHandler } from './queries/get-user-status-record.query';
import { RemoveUserStatusRecordHandler } from './commands/remove-user-status-record.command';
import { UpdateUserAdminHandler } from './commands/update-user.admin.command';
import { CreateUserAdminHandler } from './commands/create-user.admin.command';
import { CheckModifyPermissionsPossibilityHandler } from './commands/check-modify-permissons-possibility.command';
import { UpdateUserLocalHandler } from './commands/update-user.local.command';
import { GetUserTokenHandler } from './queries/get-user-token.query';
import { GetUserTokenByUserIdHandler } from './queries/get-user-token-by-user-id.query';

const UsersCommandHandlers = [
  CreateUserHandler,
  CreateUserAdminHandler,
  UpdateUserHandler,
  UpdateUserAdminHandler,
  UpdateUserLocalHandler,
  RemoveUserAdminHandler,
  CreateUserTokenHandler,
  RemoveUserTokenHandler,
  RemoveIatRecordHandler,
  RemovePermissionRecordHandler,
  RemoveUserStatusRecordHandler,
  CheckModifyPermissionsPossibilityHandler,
];

const UsersQueryHandlers = [
  GetUserHandler,
  GetALlUserHandler,
  GetUserByEmailHandler,
  GetIatRecordHandler,
  GetPermissionRecordHandler,
  GetUserStatusRecordHandler,
  GetUserTokenHandler,
  GetUserTokenByUserIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository, UserTokenRepository]),
  ],
  controllers: [UsersController, UsersAdminController],
  providers: [
    UsersService,
    UsersAdminService,
    ...UsersCommandHandlers,
    ...UsersQueryHandlers,
  ],
})
export class UsersModule {}
