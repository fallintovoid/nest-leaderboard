import {
  Post,
  Body,
  Controller,
  Inject,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/guards/auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './types/createUser.dto';
import { UpdateUserDto } from './types/updateUser.dto';
import { UserService } from './user.service';
import { AdminGuard } from './utils/guards/admin.guard';

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

  @Put('admin/:username/set-properties')
  @UseGuards(AuthenticatedGuard, AdminGuard)
  async adminSetProperties(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.adminSetProperties(username, updateUserDto);
  }

  @Put('set-properties')
  @UseGuards(AuthenticatedGuard)
  async userSetProperties(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const currentUser = request.user as User;
    return await this.userService.userSetProperties(currentUser, updateUserDto);
  }

  @Get('get')
  @UseGuards(AuthenticatedGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':username/get')
  @UseGuards(AuthenticatedGuard)
  async getOneUserByUsername(
    @Param('username') username: string,
  ): Promise<User> {
    return this.userService.getOneUserByUsername(username);
  }
}
