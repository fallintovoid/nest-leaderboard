import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/google.strategy';
import { LocaleStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer, LocaleStrategy],
})
export class AuthModule {}
