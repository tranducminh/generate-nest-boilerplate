import { Permission } from '@common/constants/permission.const';
import { PERMISSIONS_KEY } from '@common/decorators/permissions.decorator';
import { JwtClaimDto } from '@common/dtos/jwt-claim.dto';
import { GetPermissionRecordQuery } from '@modules/users/queries/get-permission-record.query';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly queryBus: QueryBus
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) return true;

    const user: JwtClaimDto = context.getArgs()[0].user;

    const permissions = await this.queryBus.execute(
      new GetPermissionRecordQuery(user.id)
    );

    if (permissions.includes(Permission.SUPER_ADMIN)) return true;

    return requiredPermissions.every((requiredPermission) =>
      permissions.includes(requiredPermission)
    );
  }
}
