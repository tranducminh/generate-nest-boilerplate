import { ApiProperty } from '@nestjs/swagger';

interface IPaginationDto {
  page: number;
  itemCount: number;
  pageCount: number;
}

export class PaginationDto implements IPaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  pageCount: number;

  constructor(pagination: IPaginationDto) {
    this.page = pagination.page;
    this.itemCount = pagination.itemCount;
    this.pageCount = pagination.pageCount;
  }
}
