import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/types/createUser.dto';
import { compare } from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepostory: Repository<User>,
    @Inject(UserService) private readonly userService: UserService,
  ) {}
  async googleValidateUser(createUserDto: CreateUserDto): Promise<User> {
    const userByEmail = await this.userRepostory.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userByEmail) return userByEmail;

    const newUser = await this.userRepostory.create(createUserDto);

    const response = await this.userRepostory.save(newUser);
    delete response.password;
    return response;
  }

  async localeValidateUser(createUserDto: CreateUserDto) {
    const userByUsername = await this.userRepostory.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    const isCorrectPassword = compare(
      createUserDto.password,
      userByUsername.password,
    );

    if (!userByUsername) {
      throw new HttpException(
        'Username or password not correct',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (userByUsername && isCorrectPassword) {
      delete userByUsername.password;

      return userByUsername;
    }

    return null;
  }
}
