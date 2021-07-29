import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  iat: number;

  constructor(id: number, iat: number) {
    this.id = id;
    this.iat = iat;
  }
}
