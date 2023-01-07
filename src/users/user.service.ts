import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './types/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userByUsername) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    const response = await this.userRepository.save(newUser);
    delete response.password;
    return response;
  }
}
