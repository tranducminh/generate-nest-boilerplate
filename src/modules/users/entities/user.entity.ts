import { BaseEntity } from '@base/entities/base-entity';
import { Permission } from '@common/constants/permission.const';
import { UserStatus } from '@common/constants/user-status.constant';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { UserAdminDto } from '../dtos/user.admin.dto';
import { UserDto } from '../dtos/user.dto';
import { UserTokenEntity } from './user-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity<UserDto, UserAdminDto> {
  dtoClass = UserDto;
  adminDtoClass = UserAdminDto;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'simple-array' })
  permissions: Permission[];

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @OneToMany(() => UserTokenEntity, (ut) => ut.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  userTokens: UserTokenEntity[];
}
