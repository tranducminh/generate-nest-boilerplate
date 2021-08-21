import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from '@configs/app/app.config';
import { JwtClaimDto } from '../../../common/dtos/jwt-claim.dto';
import { COOKIE_AUTH_NAME } from '@common/constants/cookie.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies[COOKIE_AUTH_NAME],
      ]),
      secretOrKey: appConfig.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ id, iat, exp }: { id: number; iat: number; exp: number }) {
    return new JwtClaimDto(id, iat, exp);
  }
}
