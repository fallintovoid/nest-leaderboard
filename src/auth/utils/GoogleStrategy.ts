import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      clientID:
        '523847693916-o3iusbu3hh8nbn8lrketgt1h1hqaia44.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      username: profile.displayName,
    });

    return user || null;
  }
}
