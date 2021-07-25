import { BaseEntity } from '@base/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { UserDto } from '../dtos/user.dto';

@Entity('users')
export class UserEntity extends BaseEntity<UserDto> {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  dtoClass = UserDto;
}
