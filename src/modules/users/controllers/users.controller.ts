import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { IUsersController } from '../interfaces/users.controller.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { JwtAuthGuard } from '@guards/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth()
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
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<null>> {
    await this.usersService.update(id, updateUserDto);

    return generateEmptyRes(HttpStatus.OK, `Update user #${id} successfully`);
  }
}
