import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-user' })
  getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const message = context.getMessage()

    console.log(channel);
    console.log(message);
    channel.ack(message);
    
    return {user: "aselole"}
  }
}
