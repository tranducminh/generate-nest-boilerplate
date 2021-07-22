import { BaseEntity } from '@base/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Entity('users')
export class UserEntity extends BaseEntity<UserDto> {
  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  dtoClass = UserDto;
}
