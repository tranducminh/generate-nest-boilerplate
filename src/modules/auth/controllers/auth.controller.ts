import {
  ApiEmptyDataResponse,
  ApiSingleDataResponse,
} from '@common/decorators/api-response.decorator';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { JwtAuthGuard } from '@guards/auth.guard';
import { UserStatusGuard } from '@guards/user-status.guard';
import {
  Req,
  Get,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  Controller,
  Query,
  Render,
  Patch,
  Res,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { RequestActivateAccountDto } from '../dtos/request-activate-account.dto';
import { RequestResetPasswordByEmailVerificationDto } from '../dtos/request-reset-password-by-email-verification.dto';
import { ResetPasswordByCurrentPasswordDto } from '../dtos/reset-password-by-current_password.dto';
import { ResetPasswordByEmailVerificationDto } from '../dtos/reset-password-by-email-verification.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';
import {
  IAuthController,
  ResetPwdFormParam,
} from '../interfaces/auth.controller.interface';
import { AuthService } from '../services/auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppConfig } from '@configs/app/app.config';
import { COOKIE_AUTH_NAME } from '@common/constants/cookie.const';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService, private appConfig: AppConfig) {}

  @Post('login')
  @UseGuards(UserStatusGuard)
  @ApiSingleDataResponse(AuthDto)
  async login(
    @Body() data: LoginLocalDto,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<ResponseDto<AuthDto>> {
    const userAgent = req.headers['user-agent'];

    const auth = await this.authService.login(data, userAgent);

    res.setCookie(COOKIE_AUTH_NAME, auth.token, {
      maxAge: this.appConfig.getNumber('COOKIE_MAX_AGE'),
      path: '/',
    });

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
  @ApiCookieAuth()
  @ApiEmptyDataResponse()
  async logout(
    @AuthUser() data: LogoutLocalDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<ResponseDto<null>> {
    await this.authService.logout(data);

    res.clearCookie(COOKIE_AUTH_NAME);

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

  @Post('activate-account/new')
  @ApiEmptyDataResponse()
  async requestActivateAccount(
    @Body() data: RequestActivateAccountDto
  ): Promise<ResponseDto<null>> {
    await this.authService.requestActivateAccount(data.email);

    return generateEmptyRes(
      HttpStatus.OK,
      `Send activation account mail successfully`
    );
  }

  @Post('reset-password/methods/email-verification/new')
  @ApiEmptyDataResponse()
  async requestResetPasswordByEmailVerification(
    @Body() data: RequestResetPasswordByEmailVerificationDto
  ): Promise<ResponseDto<null>> {
    await this.authService.requestResetPasswordByEmailVerification(data.email);

    return generateEmptyRes(
      HttpStatus.OK,
      `Send reset password email successfully`
    );
  }

  @Get('reset-password/methods/email-verification/form')
  @Render('reset-password-form.hbs')
  async getResetPasswordForm(
    @Query('token') token: string
  ): Promise<ResetPwdFormParam> {
    const error = await this.authService.checkResetPasswordToken(token);

    return { token, error };
  }

  @Patch('reset-password/methods/email-verification')
  @ApiEmptyDataResponse()
  async resetPasswordByEmailVerification(
    @Body() data: ResetPasswordByEmailVerificationDto
  ): Promise<ResponseDto<null>> {
    await this.authService.resetPasswordByEmailVerification(data);

    return generateEmptyRes(HttpStatus.OK, `Reset password successfully`);
  }

  @Patch('reset-password/methods/current-password')
  @UseGuards(JwtAuthGuard)
  @ApiEmptyDataResponse()
  async resetPasswordByCurrentPassword(
    @AuthUser() authUser: JwtClaimDto,
    @Body() data: ResetPasswordByCurrentPasswordDto
  ): Promise<ResponseDto<null>> {
    await this.authService.resetPasswordByCurrentPassword(authUser.id, data);

    return generateEmptyRes(HttpStatus.OK, `Reset password successfully`);
  }

  @Patch('reset-password/methods/google-authenticator')
  resetPasswordByGoogleAuthenticator() {
    return 'Incoming';
  }
}
