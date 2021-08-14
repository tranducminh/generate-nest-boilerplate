import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';
import { AbstractBaseEntity } from '@base/entities/base-entity.abstract';

export abstract class BaseEntity<
  Dto extends AbstractBaseEntityDto = BaseEntityDto,
  AdminDto extends AbstractBaseEntityDto = Dto
> extends AbstractBaseEntity {
  abstract dtoClass: new (entity: AbstractBaseEntity) => Dto;
  toDto(): Dto {
    return new this.dtoClass(this);
  }

  abstract adminDtoClass: new (entity: AbstractBaseEntity) => AdminDto;
  toAdminDto(): AdminDto {
    return new this.adminDtoClass(this);
  }
}
