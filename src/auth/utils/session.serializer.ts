import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('serialize', user);

    done(null, user);
  }
  async deserializeUser(payload: User, done: Function) {
    const user = await this.userService.findUserById(payload.id);
    console.log('deserialize', payload);
    user ? done(null, user) : done(null, null);
  }
}
