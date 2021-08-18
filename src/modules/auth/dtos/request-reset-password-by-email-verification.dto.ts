import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestResetPasswordByEmailVerificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
