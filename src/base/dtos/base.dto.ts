import { BaseEntity } from '@base/entities/base.entity';

export class BaseDto {
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
}
