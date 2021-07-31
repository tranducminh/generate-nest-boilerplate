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

const AuthCommandHandlers = [
  CreateTokenHandler,
  LoginLocalHandler,
  SignupLocalHandler,
  LogoutLocalHandler,
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...AuthCommandHandlers],
})
export class AuthModule {}
