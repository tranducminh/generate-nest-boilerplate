import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';

export interface IUsersService {
  create(data: CreateUserDto): Promise<UserDto>;

  findAll(filterConditions): Promise<UserDto[]>;

  findOne(id: number): Promise<UserDto>;

  update(id: number, data: UpdateUserDto): Promise<void>;

  remove(id: number): Promise<void>;
}
