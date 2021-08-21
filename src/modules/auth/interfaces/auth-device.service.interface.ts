import { UserTokenDto } from '@modules/users/dtos/user-token.dto';

export interface IAuthDeviceService {
  findAll(userId: number): Promise<UserTokenDto[]>;

  findOne(iat: number, userId: number): Promise<UserTokenDto>;

  removeAll(userId: number): Promise<void>;

  removeOne(iat: number, userId: number): Promise<void>;
}
