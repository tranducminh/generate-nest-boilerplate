import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendActivationAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
