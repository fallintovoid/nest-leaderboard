import {
  Post,
  Body,
  Controller,
  Inject,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/auth.guard';
import { CreateUserDto } from './types/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('signup')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.register({
      email: '',
      username: createUserDto.username,
      password: createUserDto.password,
    });
    return newUser;
  }

  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  async protected(@Req() request: Request) {
    return request.user;
  }
}
