import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';

export interface IUsersAdminService {
  create(data: CreateUserAdminDto, createById: number): Promise<UserAdminDto>;

  findAll(filter: UserFilterDto): Promise<MultipleEntityDto<UserAdminDto>>;

  findOne(id: number): Promise<UserAdminDto>;

  update(
    id: number,
    data: UpdateUserAdminDto,
    updateById: number
  ): Promise<void>;

  remove(id: number, removeById: number): Promise<void>;
}
