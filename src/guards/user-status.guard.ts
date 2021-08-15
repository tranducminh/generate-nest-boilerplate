import { UserStatus } from '@common/constants/user-status.constant';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { GetUserByEmailQuery } from '@modules/users/queries/get-user-by-email.query';
import { GetUserStatusRecordQuery } from '@modules/users/queries/get-user-status-record.query';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UserStatusGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let status: string;

    const user: JwtClaimDto = context.getArgs()[0].user;

    if (!user) {
      const request = context.switchToHttp().getRequest();
      const { email } = request.body;
      const userEntity = await this.queryBus.execute(
        new GetUserByEmailQuery(email)
      );
      status = userEntity.status;
    } else {
      status = await this.queryBus.execute(
        new GetUserStatusRecordQuery(user.id)
      );
    }

    switch (status) {
      case UserStatus.ACTIVE:
        return true;

      case UserStatus.PENDING:
        throw new ForbiddenException('Account is not active');

      case UserStatus.BLOCKED:
        throw new ForbiddenException('Account is blocked');

      default:
        return false;
    }
  }
}
