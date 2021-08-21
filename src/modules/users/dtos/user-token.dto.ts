import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceDetectorResult } from 'device-detector-js';
import { UserTokenEntity } from '../entities/user-token.entity';

export class UserTokenDto extends AbstractBaseEntityDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  userAgent: DeviceDetectorResult;

  constructor(userToken: UserTokenEntity) {
    super();

    this.userId = userToken.userId;
    this.iat = userToken.iat;
    this.userAgent = userToken.userAgent;
  }
}
