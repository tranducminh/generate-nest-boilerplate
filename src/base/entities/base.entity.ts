import { BaseDto } from '@base/dtos/base.dto';
import { UtilsService } from '@utils/index';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T extends BaseDto = BaseDto> {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  setId(id: number) {
    this.id = id;
    return this;
  }

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
    return UtilsService.toDto(this.dtoClass, this);
  }
}
