import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dto/createUser.dto';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  getUser() {
    return this.authService.send('get-user', {});
  }

  createUser(userData: RegisterDto) {
    return this.authService.send('create-user', userData);
  }
}
