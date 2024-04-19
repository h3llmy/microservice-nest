import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get-user')
  async getUser(@Payload() data: any) {
    return this.authService.getUsers();
  }

  @EventPattern('create-user')
  async handleCreateUser(@Payload() userData: any) {
    try {
      return await this.authService.createUsers(userData);
      console.log('User created successfully:', userData);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
}
