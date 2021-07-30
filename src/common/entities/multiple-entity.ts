import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { PaginationDto } from '@common/dtos/pagination.dto';
import { BaseEntity } from '../../base/entities/base-entity';

export class MultipleEntity<T extends BaseEntityDto = BaseEntityDto> {
  data: BaseEntity<T>[];

  pagination: PaginationDto;

  constructor(data: BaseEntity<T>[], pagination: PaginationDto) {
    this.data = data;
    this.pagination = pagination;
  }

  toDto(): MultipleEntityDto<T> {
    return new MultipleEntityDto(
      this.data.map((entity) => entity.toDto()),
      this.pagination
    );
  }
}
