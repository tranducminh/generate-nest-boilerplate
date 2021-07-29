import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_token' })
export class UserTokenEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  iat: number;

  @Column()
  exp: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
