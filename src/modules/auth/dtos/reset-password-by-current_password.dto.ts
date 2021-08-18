import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordByCurrentPasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
