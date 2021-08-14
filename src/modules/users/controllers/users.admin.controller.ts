import { Role, User } from '@common/constants/permission.const';
import {
  ApiEmptyDataResponse,
  ApiMultipleDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { Permissions } from '@common/decorators/permissions.decorator';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';
import { IUsersAdminController } from '../interfaces/users.admin.controller.interface';
import { UsersAdminService } from '../services/users.admin.service';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, PermissionGuard)
@Permissions(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Admin')
export class UsersAdminController implements IUsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @Post()
  @Permissions(User.CREATE)
  @ApiSingleDataResponse(UserAdminDto)
  async create(
    @Body() createUserDto: CreateUserAdminDto
  ): Promise<ResponseDto<UserAdminDto>> {
    const user = await this.usersAdminService.create(createUserDto);

    return user.toResponse(HttpStatus.CREATED, 'Create user successfully');
  }

  @Get(':id')
  @Permissions(User.READ)
  @ApiSingleDataResponse(UserAdminDto)
  async findOne(@Param('id') id: number): Promise<ResponseDto<UserAdminDto>> {
    const user = await this.usersAdminService.findOne(id);

    return user.toResponse();
  }

  @Get()
  @Permissions(User.READ)
  @ApiMultipleDataResponse(UserAdminDto)
  async findAll(
    @Query() filter: UserFilterDto
  ): Promise<ResponseDto<UserAdminDto[]>> {
    const users = await this.usersAdminService.findAll(filter);

    return users.toResponse();
  }

  @Patch(':id')
  @Permissions(User.UPDATE)
  @ApiEmptyDataResponse()
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserAdminDto
  ): Promise<ResponseDto<null>> {
    await this.usersAdminService.update(id, updateUserDto);

    return generateEmptyRes(HttpStatus.OK, `Update user #${id} successfully`);
  }

  @Delete(':id')
  @Permissions(User.DELETE)
  @ApiEmptyDataResponse()
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    await this.usersAdminService.remove(id);

    return generateEmptyRes(HttpStatus.OK, `Delete user #${id} successfully`);
  }
}
