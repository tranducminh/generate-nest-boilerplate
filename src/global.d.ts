import { BaseDto } from '@base/dtos/base.dto';
import { BaseEntity } from '@base/entities/base.entity';
import * as _ from 'lodash';

declare global {
  interface Array<T> {
    toDtos<B extends BaseDto>(this: Array<BaseEntity<B>>): B[];
  }

  type Optional<T> = T | null | undefined;
}

Array.prototype.toDtos = function <B extends BaseDto>(): B[] {
  return <B[]>_(this)
    .map((item) => item.toDto())
    .compact()
    .value();
};
