import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';
import { AbstractBaseEntity } from '@base/entities/base-entity.abstract';

export abstract class BaseEntity<
  T extends AbstractBaseEntityDto = BaseEntityDto
> extends AbstractBaseEntity {
  abstract dtoClass: new (entity: AbstractBaseEntity) => T;

  toDto(): T {
    return new this.dtoClass(this);
  }
}
