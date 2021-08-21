import {
  Controller,
  Get,
  Body,
  Patch,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { IUsersController } from '../interfaces/users.controller.interface';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { JwtAuthGuard } from '@guards/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { UserStatusGuard } from '@guards/user-status.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionGuard, UserStatusGuard)
@ApiCookieAuth()
@ApiTags('Users')
export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiSingleDataResponse(UserDto)
  async findOne(
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<UserDto>> {
    const user = await this.usersService.findOne(authUser.id);

    return user.toResponse();
  }

  @Patch('me')
  @ApiEmptyDataResponse()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<null>> {
    await this.usersService.update(authUser.id, updateUserDto);

    return generateEmptyRes(HttpStatus.OK, `Update profile successfully`);
  }
}
