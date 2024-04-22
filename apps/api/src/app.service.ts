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
    try {
      const user = this.authService.send('create-user', userData);
      return user;
    } catch (error) {
      return "aselole"
    }
  }
}
