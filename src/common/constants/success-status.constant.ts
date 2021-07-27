import { HttpStatus } from '@nestjs/common';

export const SuccessStatus = [
  HttpStatus.OK,
  HttpStatus.CREATED,
  HttpStatus.ACCEPTED,
  HttpStatus.NON_AUTHORITATIVE_INFORMATION,
  HttpStatus.NO_CONTENT,
  HttpStatus.RESET_CONTENT,
  HttpStatus.PARTIAL_CONTENT,
];
