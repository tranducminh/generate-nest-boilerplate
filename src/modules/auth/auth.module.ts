import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MainConfigModule } from '@configs/config.module';
import { AppConfig } from '@configs/app/app.config';
import { CreateTokenHandler } from './commands/create-token.command';
import { LoginLocalHandler } from './commands/login-local.command';
import { SignupLocalHandler } from './commands/signup-local.command';
import { PassportModule } from '@nestjs/passport';
import { LogoutLocalHandler } from './commands/logout-local.command';
import { ActivateAccountHandler } from './commands/activate-account.command';
import { RequestActivateAccountHandler } from './commands/request-activate-account.command';
import { RequestResetPasswordByEmailVerificationHandler } from './commands/request-reset-password-by-email-verification.command';
import { CheckResetPasswordTokenHandler } from './commands/check-reset-password-token.command';
import { ResetPasswordByEmailVerificationHandler } from './commands/reset-password-by-email-verification.command';
import { ResetPasswordByCurrentPasswordHandler } from './commands/reset-password-by-current_password.command';
import { AuthDeviceController } from './controllers/auth-device.controller';
import { AuthDeviceService } from './services/auth-device.service';

const AuthCommandHandlers = [
  CreateTokenHandler,
  LoginLocalHandler,
  SignupLocalHandler,
  LogoutLocalHandler,
  ActivateAccountHandler,
  RequestActivateAccountHandler,
  RequestResetPasswordByEmailVerificationHandler,
  ResetPasswordByEmailVerificationHandler,
  ResetPasswordByCurrentPasswordHandler,
  CheckResetPasswordTokenHandler,
];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [MainConfigModule],
      useFactory: (appConfig: AppConfig) => {
        return {
          secret: appConfig.get('JWT_SECRET_KEY'),
          signOptions: { expiresIn: appConfig.get('JWT_EXPIRED_TIME') },
        };
      },
      inject: [AppConfig],
    }),
  ],
  controllers: [AuthController, AuthDeviceController],
  providers: [
    AuthService,
    AuthDeviceService,
    JwtStrategy,
    ...AuthCommandHandlers,
  ],
})
export class AuthModule {}
