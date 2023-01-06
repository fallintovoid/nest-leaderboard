import {
  Controller,
  UseGuards,
  Get,
  Req,
  HttpException,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';

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
  async handleRedirect() {
    return 'Redirect';
  }

  @Get('status')
  async user(@Req() request: Request) {
    if (request.user) {
      return 'auth';
    }
    throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
  }
}
