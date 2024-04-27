import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get-user')
  async getUser() {
    return this.authService.getUsers();
  }

  @EventPattern('create-user')
  async handleCreateUser(@Payload() userData: RegisterDto) {
    return this.authService.createUsers(userData);
  }
}
