import { ApiSingleDataResponse } from '@common/decorators/api-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import { IAuthController } from '../interfaces/auth.controller.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
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
}
