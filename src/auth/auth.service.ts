import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userRegistered = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (!!userRegistered) {
      throw new HttpException(
        {
          success: false,
          message: 'User already exists',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = await this.usersService.create(createUserDto);
    const result = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      message: 'Your register is success',
      success: true,
    };
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    const password = await bcrypt.compare(loginDto.password, user.password);
    if (!user || !password) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
          success: false,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email, roles: user.roles, id: user.id };
    const jwtSecret = this.configService.get('JWT_SECRET');
    const authToken = this.jwtService.sign(payload, { secret: jwtSecret });
    return {
      success: true,
      auth_token: authToken,
    };
  }
}
