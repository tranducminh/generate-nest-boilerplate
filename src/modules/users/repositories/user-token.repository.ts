import { EntityRepository, Repository } from 'typeorm';
import { UserTokenEntity } from '../entities/user-token.entity';

@EntityRepository(UserTokenEntity)
export class UserTokenRepository extends Repository<UserTokenEntity> {}
