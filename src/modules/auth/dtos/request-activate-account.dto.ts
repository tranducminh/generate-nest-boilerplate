import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestActivateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
