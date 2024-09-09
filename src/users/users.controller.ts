import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('me')
  async register(@Headers('authorization') auth: string) {
    return this.usersService.getMyProfile(auth);
  }
}
