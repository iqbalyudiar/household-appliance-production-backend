import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interface/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return;
    }
    return user;
  }

  async getMyProfile(auth: string) {
    const token = auth ? auth.replace('Bearer ', '') : null;

    if (!token) {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized user',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokenDecode = this.jwtService.decode(token);
    const user = await this.userModel
      .findOne({ email: tokenDecode.email })
      .exec();
    const result = {
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    return result;
  }
}
