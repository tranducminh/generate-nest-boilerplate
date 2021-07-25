import { BaseEntityDto } from '@base/dtos/base-entity.dto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T extends BaseEntityDto = BaseEntityDto> {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  createdById?: number;

  @Column({ nullable: true })
  updatedById?: number;

  @Column({ nullable: true })
  deletedById?: number;

  abstract dtoClass: new (entity: BaseEntity) => T;

  toDto(): T {
    return new this.dtoClass(this);
  }
}
