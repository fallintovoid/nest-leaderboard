import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocaleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.localeValidateUser({
      email: '',
      password,
      username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
