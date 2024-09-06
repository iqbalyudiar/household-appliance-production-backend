import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema,
    },
  ])],
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
