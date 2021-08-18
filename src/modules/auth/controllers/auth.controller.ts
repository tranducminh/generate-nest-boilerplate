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
  Get,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  Controller,
  Query,
  Render,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
