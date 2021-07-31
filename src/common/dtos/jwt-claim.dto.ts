import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;

  constructor(id: number, iat: number, exp: number) {
    this.id = id;
    this.iat = iat;
    this.exp = exp;
  }
}
