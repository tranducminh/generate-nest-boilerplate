import { ResponseDto } from '@common/dtos/response.dto';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';

export interface IUsersAdminController {
  create(data: CreateUserAdminDto): Promise<ResponseDto<UserAdminDto>>;

  findOne(id: number): Promise<ResponseDto<UserAdminDto>>;

  findAll(filter: UserFilterDto): Promise<ResponseDto<UserAdminDto[]>>;

  update(id: number, data: UpdateUserAdminDto): Promise<ResponseDto<null>>;

  remove(id: number): Promise<ResponseDto<null>>;
}
