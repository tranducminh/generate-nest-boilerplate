import { BaseEntity } from '@base/entities/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class BaseEntityDto extends BaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  constructor(entity: BaseEntity) {
    super();

    this.id = entity.id;
    this.createdAt = entity.createdAt;
    if (entity.updatedAt) {
      this.updatedAt = entity.updatedAt;
    }
  }
}

// export type StrictType<T, TExpected> = T extends TExpected
//   ? Exclude<keyof T, keyof TExpected> extends never
//     ? T
//     : TExpected
//   : never;
