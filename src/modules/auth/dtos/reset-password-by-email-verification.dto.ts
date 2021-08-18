import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordByEmailVerificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
