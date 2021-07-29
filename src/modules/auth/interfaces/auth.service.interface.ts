import { AuthDto } from '../dtos/auth.dto';
import { LoginLocalDto } from '../dtos/login-local.dto';
import { SignupLocalDto } from '../dtos/signup-local.dto';

export interface IAuthService {
  login(data: LoginLocalDto): Promise<AuthDto>;

  signup(data: SignupLocalDto): Promise<AuthDto>;
}
