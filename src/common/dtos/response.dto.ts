import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';
import { PaginationDto } from '@common/dtos/pagination.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { isSuccessHttpStatus } from '@utils/index';

export class ResponseDto<
  D extends AbstractBaseEntityDto | AbstractBaseEntityDto[] | null
> {
  @ApiPropertyOptional()
  data?: D;

  @ApiPropertyOptional()
  status?: HttpStatus;

  @ApiPropertyOptional()
  message?: string;

  @ApiPropertyOptional({ type: PaginationDto })
  pagination?: PaginationDto;

  constructor({
    data,
    status = HttpStatus.OK,
    message = isSuccessHttpStatus(status) ? 'Successful' : 'Failed',
    pagination,
  }: {
    data?: D;
    status?: HttpStatus;
    message?: string;
    pagination?: PaginationDto;
  }) {
    if (!isSuccessHttpStatus(status)) throw new HttpException(message, status);

    if (data) this.data = data;
    if (pagination) this.pagination = pagination;

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
