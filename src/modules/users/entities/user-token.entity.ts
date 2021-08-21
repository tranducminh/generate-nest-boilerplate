import { DeviceDetectorResult } from 'device-detector-js';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserTokenDto } from '../dtos/user-token.dto';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_token' })
export class UserTokenEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  iat: number;

  @Column()
  exp: number;

  @Column('simple-json')
  userAgent: DeviceDetectorResult;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  toDto() {
    return new UserTokenDto(this);
  }
}
