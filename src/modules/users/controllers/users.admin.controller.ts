import { Permission } from '@common/constants/permission.const';
import {
  ApiEmptyDataResponse,
  ApiMultipleDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { Permissions } from '@common/decorators/permissions.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import { UserStatusGuard } from '@guards/user-status.guard';
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
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserAdminDto } from '../dtos/create-user.admin.dto';
import { UpdateUserAdminDto } from '../dtos/update-user.admin.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserAdminDto } from '../dtos/user.admin.dto';
import { IUsersAdminController } from '../interfaces/users.admin.controller.interface';
import { UsersAdminService } from '../services/users.admin.service';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, PermissionGuard, UserStatusGuard)
@ApiCookieAuth()
@ApiTags('Admin')
export class UsersAdminController implements IUsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @Post()
  @Permissions(Permission.ADMIN, Permission.USER_CREATE)
  @ApiSingleDataResponse(UserAdminDto)
  async create(
    @Body() createUserDto: CreateUserAdminDto,
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<UserAdminDto>> {
    const user = await this.usersAdminService.create(
      createUserDto,
      authUser.id
    );

    return user.toResponse(HttpStatus.CREATED, 'Create user successfully');
  }

  @Get(':id')
  @Permissions(Permission.ADMIN, Permission.USER_READ)
  @ApiSingleDataResponse(UserAdminDto)
  async findOne(@Param('id') id: number): Promise<ResponseDto<UserAdminDto>> {
    const user = await this.usersAdminService.findOne(id);

    return user.toResponse();
  }

  @Get()
  @Permissions(Permission.ADMIN, Permission.USER_READ)
  @ApiMultipleDataResponse(UserAdminDto)
  async findAll(
    @Query() filter: UserFilterDto
  ): Promise<ResponseDto<UserAdminDto[]>> {
    const users = await this.usersAdminService.findAll(filter);

    return users.toResponse();
  }

  @Patch(':id')
  @Permissions(Permission.ADMIN, Permission.USER_UPDATE)
  @ApiEmptyDataResponse()
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserAdminDto,
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<null>> {
    await this.usersAdminService.update(id, updateUserDto, authUser.id);

    return generateEmptyRes(HttpStatus.OK, `Update user #${id} successfully`);
  }

  @Delete(':id')
  @Permissions(Permission.ADMIN, Permission.USER_DELETE)
  @ApiEmptyDataResponse()
  async remove(
    @Param('id') id: number,
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<null>> {
    await this.usersAdminService.remove(id, authUser.id);

    return generateEmptyRes(HttpStatus.OK, `Delete user #${id} successfully`);
  }
}
