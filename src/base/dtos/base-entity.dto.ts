import { BaseEntity } from '@base/entities/base.entity';
import { ResponseDto } from '@common/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export class BaseEntityDto {
  id: number;

  createdAt: Date;

  updatedAt?: Date;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    if (entity.updatedAt) {
      this.updatedAt = entity.updatedAt;
    }
  }

  toResponse(status?: HttpStatus, message?: string) {
    return new ResponseDto({ data: this, status, message });
  }
}

// export type StrictType<T, TExpected> = T extends TExpected
//   ? Exclude<keyof T, keyof TExpected> extends never
//     ? T
//     : TExpected
//   : never;
