import { ResponseDto } from '@common/dtos/response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserDto } from '../dtos/user.dto';

export interface IUsersController {
  create(data: CreateUserDto): Promise<ResponseDto<UserDto>>;

  findOne(id: number): Promise<ResponseDto<UserDto>>;

  findAll(filter: UserFilterDto): Promise<ResponseDto<UserDto[]>>;

  update(id: number, data: UpdateUserDto): Promise<ResponseDto<null>>;

  remove(id: number): Promise<ResponseDto<null>>;
}
