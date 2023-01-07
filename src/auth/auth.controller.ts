import {
  Controller,
  UseGuards,
  Get,
  Req,
  Redirect,
  UnauthorizedException,
  Post,
  Body,
} from '@nestjs/common';
import { AuthenticatedGuard } from './utils/auth.guard';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/googleAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './utils/localAuth.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return 'google auth';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('http://localhost:3001/api/auth/status', 301)
  async handleRedirect(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async user(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Req() request: Request) {
    request.session.destroy(() => ({ msg: 'Session Destroyed' }));
    return { msg: 'Session Destroyed' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return request.user;
  }
}
