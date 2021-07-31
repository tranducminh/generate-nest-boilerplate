import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from '@configs/app/app.config';
import { JwtClaimDto } from '../../../common/dtos/jwt-claim.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ id, iat, exp }: { id: number; iat: number; exp: number }) {
    return new JwtClaimDto(id, iat, exp);
  }
}
