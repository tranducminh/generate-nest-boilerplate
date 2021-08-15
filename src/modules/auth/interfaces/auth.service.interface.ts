import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { LogoutLocalDto } from '../dtos/logout-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';

export interface IAuthService {
  login(data: LoginLocalDto): Promise<AuthDto>;

  signup(data: SignupLocalDto): Promise<void>;

  logout(data: LogoutLocalDto): Promise<void>;

  activateAccount(token: string): Promise<void>;

  requestActivateAccount(email: string): Promise<void>;
}
