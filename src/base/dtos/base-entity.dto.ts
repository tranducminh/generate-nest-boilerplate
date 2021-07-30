import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';
import { AbstractBaseEntity } from '@base/entities/base-entity.abstract';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseEntityDto<
  T extends AbstractBaseEntity = AbstractBaseEntity
> extends AbstractBaseEntityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  constructor(entity: T) {
    super();

    this.id = entity.id;
    this.createdAt = entity.createdAt;
    if (entity.updatedAt) {
      this.updatedAt = entity.updatedAt;
    }
  }
}
