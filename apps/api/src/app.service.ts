import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dto/createUser.dto';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  getUser(page?: number, limit?: number, search?: string) {
    return this.authService.send({ cmd: 'get-user' }, { page, limit, search });
  }

  createUser(userData: RegisterDto) {
    return this.authService.send({ cmd: 'create-user' }, userData);
  }
}
