import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDetails } from './types/UserDetails';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepostory: Repository<User>,
  ) {}
  async validateUser(userDetails: UserDetails): Promise<User> {
    const user = await this.userRepostory.findOne({
      where: {
        email: userDetails.email,
      },
    });

    if (user) return user;

    const newUser = await this.userRepostory.create(userDetails);
    newUser.password = '';

    const response = await this.userRepostory.save(newUser);
    delete response.password;
    console.log(response);

    return response;
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepostory.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}
