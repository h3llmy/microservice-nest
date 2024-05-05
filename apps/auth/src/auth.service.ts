import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(limit = 10, page = 1, search?: string) {
    const skip = (page - 1) * limit;
    const query: any = {};
    if (search) {
      query.where = [
        { username: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { role: Like(`%${search}%`) },
      ];
    }

    const [list, totalData] = await Promise.all([
      this.userRepository.find({
        ...query,
        take: limit,
        skip: skip,
      }),
      this.userRepository.count(query),
    ]);

    const totalPages = Math.ceil(totalData / limit);

    return { currentPage: page, totalPages, totalData, list };
  }

  async createUsers(data: Partial<User>) {
    const checkUser = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (checkUser) {
      throw new RpcException({ status: 400, message: 'user already exist' });
    }

    const userData = this.userRepository.create(data);
    const newUser = await this.userRepository.save(userData);
    delete newUser.password;
    return newUser;
  }
}
