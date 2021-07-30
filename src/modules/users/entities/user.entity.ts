import { BaseEntity } from '@base/entities/base-entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { UserTokenEntity } from './user-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity<UserDto> {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => UserTokenEntity, (ut) => ut.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  userTokens: UserTokenEntity[];

  dtoClass = UserDto;
}
