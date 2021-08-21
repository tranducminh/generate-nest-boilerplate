import { COOKIE_AUTH_NAME } from '@common/constants/cookie.const';
import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { UserTokenDto } from '@modules/users/dtos/user-token.dto';
import {
  Delete,
  Get,
  UseGuards,
  Controller,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { IAuthDeviceController } from '../interfaces/auth-device.controller.interface';
import { AuthDeviceService } from '../services/auth-device.service';

@ApiTags('Auth')
@Controller('auth/devices')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class AuthDeviceController implements IAuthDeviceController {
  constructor(private readonly authDeviceService: AuthDeviceService) {}

  @Get()
  @ApiSingleDataResponse(UserTokenDto)
  @ApiOperation({ summary: 'Get all login device' })
  async findAll(
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<UserTokenDto[]>> {
    const devices = await this.authDeviceService.findAll(authUser.id);

    return new ResponseDto({ data: devices });
  }

  @Get(':iat')
  @ApiSingleDataResponse(UserTokenDto)
  async findOne(
    @Query('iat') iat: number,
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<UserTokenDto>> {
    const device = await this.authDeviceService.findOne(iat, authUser.id);

    return device.toResponse();
  }

  @Get('current')
  @ApiSingleDataResponse(UserTokenDto)
  @ApiOperation({ summary: 'Get your device' })
  async findCurrent(
    @AuthUser() authUser: JwtClaimDto
  ): Promise<ResponseDto<UserTokenDto>> {
    const device = await this.authDeviceService.findOne(
      authUser.iat,
      authUser.id
    );

    return device.toResponse();
  }

  @Delete()
  @ApiEmptyDataResponse()
  @ApiOperation({ summary: 'Logout all device' })
  async removeAll(
    @AuthUser() authUser: JwtClaimDto,
    @Res() res: FastifyReply
  ): Promise<ResponseDto<null>> {
    await this.authDeviceService.removeAll(authUser.id);

    res.clearCookie(COOKIE_AUTH_NAME);

    return generateEmptyRes(HttpStatus.OK, `Logout successfully`);
  }

  @Delete(':iat')
  @ApiEmptyDataResponse()
  async removeOne(
    @Query('iat') iat: number,
    @AuthUser() authUser: JwtClaimDto,
    @Res() res: FastifyReply
  ): Promise<ResponseDto<null>> {
    await this.authDeviceService.removeOne(iat, authUser.id);

    res.clearCookie(COOKIE_AUTH_NAME);

    return generateEmptyRes(HttpStatus.OK, `Logout successfully`);
  }
}
