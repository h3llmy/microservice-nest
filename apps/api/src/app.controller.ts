import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/createUser.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser() {
    return this.appService.getUser();
  }

  @Post()
  createUser(@Body() userData: RegisterDto) {
    return this.appService.createUser(userData);
  }
}
