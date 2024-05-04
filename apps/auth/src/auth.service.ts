import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async createUsers(data: Partial<User>) {
    const checkUser = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (checkUser) {
      throw new RpcException({ status: 400, message: 'user already exist' });
    }
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
