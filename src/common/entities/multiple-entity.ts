import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { MultipleEntityDto } from '@common/dtos/multiple-entity.dto';
import { PaginationDto } from '@common/dtos/pagination.dto';
import { BaseEntity } from '../../base/entities/base-entity';

export class MultipleEntity<
  Dto extends BaseEntityDto = BaseEntityDto,
  AdminDto extends BaseEntityDto = Dto
> {
  data: BaseEntity<Dto, AdminDto>[];

  pagination: PaginationDto;

  constructor(data: BaseEntity<Dto, AdminDto>[], pagination: PaginationDto) {
    this.data = data;
    this.pagination = pagination;
  }

  toDto(): MultipleEntityDto<Dto> {
    return new MultipleEntityDto(
      this.data.map((entity) => entity.toDto()),
      this.pagination
    );
  }

  toAdminDto(): MultipleEntityDto<AdminDto> {
    return new MultipleEntityDto(
      this.data.map((entity) => entity.toAdminDto()),
      this.pagination
    );
  }
}
