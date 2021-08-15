import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { UserStatusGuard } from '@guards/user-status.guard';
import {
  Get,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  Controller,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { ResendActivationAccountDto } from '../dtos/resend-activation-account.dto';
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
  async signup(@Body() data: SignupLocalDto): Promise<ResponseDto<null>> {
    await this.authService.signup(data);

    return generateEmptyRes(HttpStatus.OK, `Activation email is sent`);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiEmptyDataResponse()
  async logout(@AuthUser() data: LogoutLocalDto): Promise<ResponseDto<null>> {
    await this.authService.logout(data);

    return generateEmptyRes(HttpStatus.OK, `Logout successfully`);
  }

  @Get('activate-account')
  @ApiEmptyDataResponse()
  async activateAccount(
    @Query('token') token: string
  ): Promise<ResponseDto<null>> {
    await this.authService.activateAccount(token);

    return generateEmptyRes(HttpStatus.OK, `Activate account successfully`);
  }

  @Post('activate-account')
  async requestActivateAccount(
    @Body() data: ResendActivationAccountDto
  ): Promise<ResponseDto<null>> {
    await this.authService.requestActivateAccount(data.email);

    return generateEmptyRes(
      HttpStatus.OK,
      `Send activation account mail successfully`
    );
  }
}
