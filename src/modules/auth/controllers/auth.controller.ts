import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { UserStatusGuard } from '@guards/user-status.guard';
import { Body, HttpStatus, Post, UseGuards, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import { IAuthController } from '../interfaces/auth.controller.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(UserStatusGuard)
  @ApiSingleDataResponse(AuthDto)
  async login(@Body() data: LoginLocalDto): Promise<ResponseDto<AuthDto>> {
    const auth = await this.authService.login(data);

    return auth.toResponse();
  }

  @Post('signup')
  @ApiSingleDataResponse(AuthDto)
  async signup(@Body() data: SignupLocalDto): Promise<ResponseDto<AuthDto>> {
    const auth = await this.authService.signup(data);

    return auth.toResponse();
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiEmptyDataResponse()
  async logout(@AuthUser() data: LogoutLocalDto): Promise<ResponseDto<null>> {
    await this.authService.logout(data);

    return generateEmptyRes(HttpStatus.OK, `Logout successfully`);
  }
}
