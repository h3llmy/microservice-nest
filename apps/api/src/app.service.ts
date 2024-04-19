import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  getUser() {
    return this.authService.send('get-user', {});
  }

  createUser(userData: any) {
    return this.authService.send('create-user', userData);
  }
}
