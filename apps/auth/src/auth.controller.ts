import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { getPagination } from './dto/getPagination.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Payload() query: getPagination) {
    return this.authService.getUsers(query.limit, query.page, query.search);
  }

  @EventPattern({ cmd: 'create-user' })
  async handleCreateUser(@Payload() userData: RegisterDto) {
    return this.authService.createUsers(userData);
  }
}
