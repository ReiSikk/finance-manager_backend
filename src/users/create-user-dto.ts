import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { Role } from '../auth/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
   password: string;

  }