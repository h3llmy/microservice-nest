import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/createUser.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('search') search: string,
  ) {
    return this.appService.getUser(page, limit, search);
  }

  @Post()
  createUser(@Body() userData: RegisterDto) {
    return this.appService.createUser(userData);
  }
}
