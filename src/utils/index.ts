import { SuccessStatus } from '@common/constants/success-status.constant';
import { HttpStatus } from '@nestjs/common';

export function isSuccessHttpStatus(status: HttpStatus): boolean {
  return SuccessStatus.includes(status);
}
