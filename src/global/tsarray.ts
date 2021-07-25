import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import { BaseEntity } from '@base/entities/base.entity';
import { ResponseDto } from '@common/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

declare global {
  interface Array<T> {
    toDtos<B extends BaseEntityDto>(this: Array<BaseEntity<B>>): B[];
    toResponse<B extends BaseEntityDto>(
      this: Array<B>,
      status?: HttpStatus,
      message?: string
    ): ResponseDto<B[]>;
  }
}

Array.prototype.toDtos = function <B extends BaseEntityDto>(
  this: Array<BaseEntity<B>>
): B[] {
  return this.map((entity) => entity.toDto());
};

Array.prototype.toResponse = function <B extends BaseEntityDto>(
  this: Array<B>,
  status?: HttpStatus,
  message?: string
): ResponseDto<B[]> {
  return new ResponseDto({ data: this, status, message });
};
