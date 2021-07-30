import { PaginationDto } from '@common/dtos/pagination.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDto } from '../../base/dtos/base-entity.dto';

export class MultipleEntityDto<T extends BaseEntityDto = BaseEntityDto> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  pagination: PaginationDto;

  constructor(data: T[], pagination: PaginationDto) {
    this.data = data;
    this.pagination = pagination;
  }

  toResponse(status?: HttpStatus, message?: string): ResponseDto<T[]> {
    return new ResponseDto({
      data: this.data,
      status,
      message,
      pagination: this.pagination,
    });
  }
}
