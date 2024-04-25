import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Role } from './enums/role.enum'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    async signIn(user:any, password): Promise<any> {
      console.log("username", user.username);
      const userFromDb = await this.usersService.findOne(user.username);
      console.log("userFromDb", userFromDb); // this is null now
      const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password);
      
      if (userFromDb && isPasswordCorrect) {
          const payload = { username: userFromDb.username, id: userFromDb.id};
          return {
            access_token: this.jwtService.sign(payload),
          };
        } else {
          throw new UnauthorizedException({success: false, message: 'Invalid credentials' });
        }
      }

      async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
    
        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          //retun user without password
          return result;
        }
        return null;
      }

    async signUp(createUserDto): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hashedPassword;
        return this.usersService.create(createUserDto);
      }
      async upgrade(userId: number) {
        return this.usersService.upgrade(userId)
      }
    }