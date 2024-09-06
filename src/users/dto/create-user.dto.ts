import { IsEmail,IsEnum, IsString, MinLength } from 'class-validator';
export enum UserRole {
    STAFF = 'staff',
    CUSTOMER = 'customer',
}
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  roles: string; 
}
