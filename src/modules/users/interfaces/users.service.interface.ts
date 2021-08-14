import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';

export interface IUsersService {
  findOne(id: number): Promise<UserDto>;

  update(id: number, data: UpdateUserDto): Promise<void>;
}
