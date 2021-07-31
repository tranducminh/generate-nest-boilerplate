import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { GetIatRecordQuery } from '@modules/users/queries/get-iat-record.query';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validate = await super.canActivate(context);

    if (!validate) throw new UnauthorizedException();

    const user: JwtClaimDto = context.getArgs()[0].user;

    const iats = await this.queryBus.execute(new GetIatRecordQuery(user.id));

    if (!iats.includes(user.iat)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
