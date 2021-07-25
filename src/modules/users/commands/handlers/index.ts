import { CreateUserHandler } from './create-user.handler';
import { RemoveUserHandler } from './remove-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export const UsersCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler,
];
