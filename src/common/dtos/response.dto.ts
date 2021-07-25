import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const SuccessStatus = [
  HttpStatus.OK,
  HttpStatus.CREATED,
  HttpStatus.ACCEPTED,
  HttpStatus.NO_CONTENT,
  HttpStatus.PARTIAL_CONTENT,
];

export class ResponseDto<D extends BaseEntityDto | BaseEntityDto[] | null> {
  data?: D;
  status?: HttpStatus;
  message?: string;

  constructor({
    data,
    status = HttpStatus.OK,
    message = SuccessStatus.includes(status) ? 'Successful' : 'Failed',
  }: {
    data?: D;
    status?: HttpStatus;
    message?: string;
  }) {
    if (!SuccessStatus.includes(status))
      throw new HttpException(message, status);

    if (data) {
      this.data = data;
    }
    this.status = status;
    this.message = message;
  }
}

export function generateEmptyRes(
  status?: HttpStatus,
  message?: string
): ResponseDto<null> {
  return new ResponseDto({ status, message });
}
