import { ApiProperty } from '@nestjs/swagger';

export class LogoutLocalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  iat?: number;
}
